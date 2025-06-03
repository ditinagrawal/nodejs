const fs = require("fs");

// fs.writeFile("hello.txt", "Hello World", (err) => {});

fs.writeFileSync("hello.txt", "Hello World \n");

const data = fs.readFileSync("hello.txt", "utf8");
console.log(data);

fs.readFile("hello.txt", "utf8", (err, data) => {
  console.log(data);
});

fs.appendFile("hello.txt", "File Appended Async \n", (err) => {});

fs.appendFileSync("hello.txt", "File Appended Sync \n");

// fs.unlinkSync("hello.txt");

// console.log(fs.statSync("hello.txt"));

// fs.mkdirSync("hello");

// fs.rmdirSync("hello");
