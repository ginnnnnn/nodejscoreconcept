const http = require("http");
const routes = require("./routes");
// function rqListener(req, res){}

//req must contain data needs to send,res must contian path
// http.createServer(rqListener)
//means when you recive req do rqListener

// http.createServer((req, res) => {
//   console.log(req);
// }); return a server
// console.log(req.url, req.method, req.headers);

console.log(routes.someText);
const server = http.createServer(routes.handler);

server.listen(3000);
