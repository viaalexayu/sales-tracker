const express = require("express");
const hostname = "127.0.0.1";
const port = 3000;

const app = express();

app.get("/", (req, res, next) => {
    res.send("Hello I am Via!!");
});

const http = require("http");

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});