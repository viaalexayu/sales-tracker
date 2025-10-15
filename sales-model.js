const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  branch: String,
  city: String,
  cogs: Number,
  customerType: String,
  date: Date,
  gender: String,
  grossIncome: Number,
  grossMarginPercentage: Number,
  invoiceId: String,
  payment: Number,
  productLine: String,
  quantity: Number,
  rating: Number,
  tax: Number,
  time: String,
  total: Number,
  unitPrice: Number,
});

const SalesModel = new mongoose.model("Sales", SalesSchema, "Sales");

module.exports = SalesModel;
