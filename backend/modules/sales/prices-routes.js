const { Router } = require("express");

const PricesModel = require("./prices-model");

const pricesRoute = Router();

// Retrieve all prices from the database.
pricesRoute.get("/", async (req, res) => {
    try {
        const prices = await PricesModel.find();
        res.send(prices);
    } catch (error) {
        res.status(404).send(`404! ${req.method} ${error}.`);
    }
});

// Retrieve current price from the database.
pricesRoute.get("/:date", async (req, res) => {
    const date = new Date(req.params.date);
    try {
        const price = await PricesModel.findOne({
            date: { $lte: date }
        }).sort({ date: -1 });

        if (price) res.send(price);
        else res.status(404).send(`404! ${req.method} price not found.`);
    } catch (error) {
        res.status(500).send(`404! ${req.method} ${error}.`);
    }
});

module.exports = { pricesRoute };
