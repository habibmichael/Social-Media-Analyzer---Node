import express from 'express';
import config from './config';
import bodyParser from 'body-parser';
import axios from 'axios';
import morgan from 'morgan'

var path = require('path');
var language = require('@google-cloud/language');
var Twitter = require('twitter');
var clientData = {
    keyword: '',
    tweets: 0,
    pos: 0,
    neg: 0,
    scores: []

}

const server = express();
var serv = server.listen(8080, () => {
    console.log(`Listening on port 8090`);
});
var io = require('socket.io').listen(serv);


var languageClient = language({
    projectId: 'sentiment-analysis-162816',
    keyFilename: path.join(__dirname, 'Sentiment-Analysis-004bba09c96d.json')
});

var client = new Twitter({
    consumer_key: config.CONSUMER_KEY,
    consumer_secret: config.CONSUMER_SECRET,
    access_token_key: config.ACCESS_TOKEN,
    access_token_secret: config.ACCESS_SECRET

});

//Serve static files using express
server.use(express.static('static'));
server.use(express.static('node_modules/bootstrap/dist'));
server.use(express.static('node_modules/font-awesome'))

//middleware to log requests
server.use(morgan('tiny'));
//force middleware to use body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.get('/service/sma', (req, res) => {
    console.log("Hello from service");
    let data = getSentiment(req.query.keyword,(response)=>{
        res.status(200).send(response);

    });
});


server.post('/charts.ejs', (req, res) => {

    clientData.keyword = req.body.keyword;

    res.render('charts', {
        keyword: clientData.keyword
    });

});

function getSentiment(keyword,cb) {
    console.log("Gathering Sentiment");
    var seconds = 0;
    var interval = setInterval(function () {
        seconds += 1;
    }, 1000);

    client.stream('statuses/filter', {
        track: keyword,
        filter_level: 'low'
    }, function (stream) {
        stream.on('data', function (event) {
            clientData.tweets += 1;
            languageClient.detectSentiment(event.text, (err, sentiment) => {
                if (sentiment) {
                    if (sentiment.score > 0) {
                        clientData.pos += 1;
                    } else if (sentiment.score < 0) {
                        clientData.neg += 1
                    }
                    var total = clientData.pos + clientData.neg;
                    var posPercent = (clientData.pos) / total;
                    var negPercent = (clientData.neg) / total;
                    clientData.scores.push({
                        positive: posPercent,
                        negative: negPercent
                    });
                }
            });

            if (seconds >= 10 || clientData.tweets >= 400) {
                console.log("Stream ended");
                stream.destroy();
                console.log("Destroyed Stream");
                return cb(clientData.scores[clientData.scores.length-1]);
            } else {}
        });
 
 
    });
}


// io.sockets.on('connection',(socket)=>{
//     socket.emit('hello',{hello:"Sup Socket"});
//     socket.on('ready',function(data){
//         var that = this;
//         var seconds = 0;
//         var fetch = true;

//         if(clientData.keyword.length!=0 ){

//             var interval =  setInterval(function(){
//             if(seconds>=10 || clientData.tweets>=100){
//                 clearInterval(interval);
//             }else{
//             seconds+=1;
//             // console.log(JSON.stringify(clientData));
//             // console.log("Emitting");
//             // console.log(seconds); 
//             }

//             },1000);
//         //TODO store data in array and then populate chart on the client side.



//                 client.stream('statuses/filter',{track:'trump',filter_level:'low'},function(stream){
//                     stream.on('data',function(event){
//                         clientData.tweets+=1; 
//                         languageClient.detectSentiment(event.text,(err,sentiment)=>{
//                         if(sentiment){
//                             if(sentiment.score>0){
//                                 clientData.pos+=1;
//                             }else if(sentiment.score<0){
//                                 clientData.neg+=1
//                             }
//                             var total = clientData.pos+clientData.neg;
//                             var posPercent = (clientData.pos)/total;
//                             var negPercent = (clientData.neg)/total;
//                             clientData.scores.push({
//                                 positive:posPercent,
//                                 negative:negPercent
//                             });
//                         }
//                     });

//                         if(seconds>=30 || clientData.tweets>=400){
//                             that.emit('sentiment',clientData);
//                             stream.destroy();
//                     }else{

//                     }
//                     });

//                     stream.on('error',function(error){
//                         throw error;
//                     });
//                 });
//         }


//     });
// });