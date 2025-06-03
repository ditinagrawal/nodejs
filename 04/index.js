const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const log = `${Date.now()} - IP Address: ${
    req.socket.remoteAddress
  }\t - Method: ${req.method}\t - URL: ${req.url}\n`;

  fs.appendFile("logs.txt", log, (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.end("Hello from the server");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
