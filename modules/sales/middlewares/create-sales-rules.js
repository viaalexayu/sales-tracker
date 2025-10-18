const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createCustomerRules = [

  body("branch")
    .notEmpty()
    .withMessage("Branch is required")
    .isString()
    .withMessage("Branch must be a string")
    .trim(),

  body("city")
    .notEmpty()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a string")
    .trim(),

  body("cogs")
    .notEmpty()
    .withMessage("COGS is required")
    .isFloat()
    .withMessage("COGS must be an amount"),

  body("customerType")
    .notEmpty()
    .withMessage("Customer Type is required")
    .isString()
    .withMessage("Customer Type must be a string")
    .trim(),

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isDate()
    .withMessage("Date must be a valid date"),

body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isString()
    .withMessage("Gender must be a string")
    .trim(),

body("grossIncome")
  .notEmpty()
  .withMessage("Gross Income is required")
  .isFloat()
  .withMessage("Gross Income must be an amount"),

  body("grossMarginPercentage")
    .notEmpty()
    .withMessage("Gross Margin Percentage is required")
    .isFloat()
    .withMessage("Gross Margin Percentage must be an amount"),

  body("invoiceId")
    .notEmpty()
    .withMessage("Invoice ID is required")
    .isFloat()
    .withMessage("Invoice ID must be an amount"),

  body("payment")
    .notEmpty()
    .withMessage("Payment is required")
    .isFloat()
    .withMessage("Payment must be an amount"),

  body("productLine")
    .notEmpty()
    .withMessage("Product Line is required")
    .isString()
    .withMessage("Product Line must be a string")
    .trim(),

body("quantity")
  .notEmpty()
  .withMessage("Quantity is required")
  .isInt()
  .withMessage("Quantity must be an integer"),

  body("rating")
    .optional()
    .isFloat()
    .withMessage("Rating must be a valid float"),

body("tax")
  .notEmpty()
  .withMessage("Tax is required")
  .isFloat()
  .withMessage("Tax must be an amount"),

  body("time")
    .notEmpty()
    .withMessage("Time is required")
    .isTime()
    .withMessage("Time must be a valid time"),

body("total")
  .notEmpty()
  .withMessage("Total is required")
  .isFloat()
  .withMessage("Total must be an amount"),

  body("unitPrice: Number")
    .notEmpty()
    .withMessage("Unit Price is required")
    .isFloat()
    .withMessage("Unit Price must be an amount"),

  checkValidation,
];

module.exports = createCustomerRules;
