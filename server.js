const express = require("express");
const hostname = "127.0.0.1";
const port = 3000;

const app = express();

app.get("/", (req, res, next) => {
    res.send("Hello I am Via!!");
});

//Get all invoice
app.get("/invoice", async (req, res, next) => {
    const branch = req.query.branch;
});

//Get an invoice
app.get("/invoice/:id", async (req, res, next) => {
});

//Add new invoice
app.post("/invoice", async (req, res, next) => {
});

//Update an invoice
app.put("/invoice/:id", async (req, res, next) => {
});

//Delete an invoice
app.delete("/invoice/:id", async (req, res, next) => {
});

//Get summary
app.get("/summary", async (req, res, next) => {
    const branch = req.query.branch;
});

//Start server
const http = require("http");

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});