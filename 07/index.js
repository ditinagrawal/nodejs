const express = require("express");
const mongoose = require("mongoose");
const app = express();

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
const User = mongoose.model("User", userSchema);

app.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// just for testing, use POST request to create a user
app.get("/create", async (req, res) => {
  const name = req.query.name;
  const age = req.query.age;
  const user = await User.create({ name, age });
  res.send(user);
});

mongoose.connect("mongodb://127.0.0.1:27017/nodejs").then(() => {
  console.log("Connected to MongoDB");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
