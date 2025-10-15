require('dotenv').config();

const express = require("express");
const { salesRoute } = require("./sales-routes");
const connectDB = require("./connect-db");

const port = 3000;
const hostname = "localhost";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(connectDB)
server.use(salesRoute);

server.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send("Oops! Internal server error!");
});

server.use((req, res, next) => {
  res.status(404).send(`404! ${req.method} ${req.path} Not Found.`);
});

server.listen(port, hostname, (error) => {
  if (error) console.log(error.message);
  else console.log(`Server running on http://${hostname}:${port}`);
});
