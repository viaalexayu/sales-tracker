const mongoose = require("mongoose");

const PricesSchema = new mongoose.Schema({
    date: Date,
    price11kgCylinder: Number,
    price11kgRefill: Number,
    price2_7kgCylinder: Number,
    price2_7kgRefill: Number,
});

const PricesModel = new mongoose.model("Prices", PricesSchema, "Prices");

module.exports = PricesModel;
