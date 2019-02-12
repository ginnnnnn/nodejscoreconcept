const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>send message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input name="message" type="text"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    const dataListener = chunk => {
      console.log(chunk);
      body.push(chunk);
    };
    req.on("data", dataListener);
    //listen 'on' data event  req.on(event='data',listener=(chunk)=>{}) collecting reqs
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      }); //create a file
    });
    //Buffer is the bus stop waiting ,
    //   fs.writeHead(302,{}) //meta file
  }
  res.setHeader("Content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>This is my first node project</title></head>");
  res.write("<body>");
  res.write("<h1>Hello Node</h1>");
  res.write("<p>try this out</p>");
  res.write("</body>");
  res.write("</html>");
  res.end();
  // process.exit();
};

// module.exports = {
//   handler: requestHandler,
//   sometext: "whooha"
// };

module.exports.handler = requestHandler;
module.exports.someText = "whooha";
