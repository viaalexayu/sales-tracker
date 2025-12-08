const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
    date: Date,
    seller: String,
    buyer: String,
    number: Number,
    price11kgRefill: Number,
    price2_7kgCylinder: Number,
    price2_7kgRefill: Number,
    price11kgCylinder: Number,
    qty11kgKCylinder: Number,
    qty11kgKRefill: Number,
    qty11kgPCylinder: Number,
    qty11kgPRefill: Number,
    qty2_7kgCylinder: Number,
    qty2_7kgRefill: Number,
    totalPrice: Number,
});

const SalesModel = new mongoose.model("Sales", SalesSchema, "Sales");

module.exports = SalesModel;
