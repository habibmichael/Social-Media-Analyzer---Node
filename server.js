import express from 'express';
import config from './config';
import bodyParser from 'body-parser';

const server = express();

//Serve static files using express
server.use(express.static('static'));

//force middleware to use body-parser
server.use(bodyParser());

server.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});

server.post('/',(req,res)=>{
    debugger;
    const keyword = req.body.keyword;
    res.sendFile(__dirname+'/public/charts.html');

})


server.listen(config.port,config.host,()=>{
    console.log(`Listening on port ${config.port}`);
});