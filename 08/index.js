const express = require("express");
const app = express();
const { connect } = require("./connect");
const urlRoutes = require("./routes/url");

app.use(express.json());
app.use(urlRoutes);

connect("mongodb://localhost:27017/url-shortener").then(() => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
