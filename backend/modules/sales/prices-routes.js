const { Router } = require("express");

const PricesModel = require("./prices-model");

const pricesRoute = Router();

// Retrieve all prices from the database.
// Store managers can see their prices by making a query.
pricesRoute.get("/prices", async (req, res) => {
    const { seller } = req.query;
    const filter = seller ? { seller } : {};
    try {
        const prices = await PricesModel.find(filter);
        res.send(prices);
    } catch (error) {
        res.status(404).send(`404! ${req.method} ${error}.`);
    }
});

module.exports = { pricesRoute };
