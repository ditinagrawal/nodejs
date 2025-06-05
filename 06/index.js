const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("IP address:", req.ip);
  next();
});

app.use((req, res, next) => {
  console.log("Request URL:", req.url);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
