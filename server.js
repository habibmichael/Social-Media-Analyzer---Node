import express from 'express';
import config from './config';
import bodyParser from 'body-parser';
import axios from 'axios';
import morgan from 'morgan'
import https from 'https';

const server = express();

//Serve static files using express
server.use(express.static('static'));
server.use(express.static('node_modules/bootstrap/dist'));
server.use(express.static('node_modules/font-awesome'))

//middleware to log requests
server.use(morgan('tiny'));

//force middleware to use body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended:true
}));

server.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});
 
let host =  '7yy7fqe0fl.execute-api.us-east-1.amazonaws.com';
let port = 443;
var options = {
    host:host,
    path:'/KeywordStage/keyword',
    port:port,
    headers:{
        'Content-Type':'application/json'
    },
    method:'POST'
};



server.post('/charts.html',(req,res)=>{
    axios.request({
        method:'post',
        baseURL:config.baseURL,
        url:config.url,
        headers:config.headers,
        data:{
            keyword:req.body.keyword
        }
    }).then((res)=>{
        console.log(res.data);

    }).catch((e)=>{
        console.log(e);
    });
    const keyword = req.body.keyword;
    res.sendFile(__dirname+'/public/charts.html');

});


server.listen(config.port,config.host,()=>{
    console.log(`Listening on port ${config.port}`);
});