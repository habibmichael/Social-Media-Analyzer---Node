const env = process.env;

export default {
  port: env.PORT || 3000,
  host: env.HOST || '0.0.0.0',
  https_port:443,
  baseURL:'https://7yy7fqe0fl.execute-api.us-east-1.amazonaws.com',
  url:'/KeywordStage/keyword',
  headers:{
    'Content-Type':'application/json'
  }
 
};