import express from 'express';
import config from './config';

const server = express();

server.listen(config.port,config.host,()=>{
    console.log(`Listening on port ${this.port}`);
});