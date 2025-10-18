const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateSalesRules = [

  body("branch")
    .optional()
    .isString()
    .withMessage("Branch must be a string")
    .trim(),

  body("city")
    .optional()
    .isString()
    .withMessage("City must be a string")
    .trim(),

  body("cogs")
    .optional()
    .isFloat()
    .withMessage("COGS must be an amount"),

  body("customerType")
    .optional()
    .isString()
    .withMessage("Customer Type must be a string")
    .trim(),

  body("date")
    .optional()
    .isDate({ format: 'MM/DD/YYYY', strictMode: false })
    .withMessage("Date must be a valid date"),

  body("gender")
    .optional()
    .isString()
    .withMessage("Gender must be a string")
    .trim(),

  body("grossIncome")
    .optional()
    .isFloat()
    .withMessage("Gross Income must be an amount"),

  body("grossMarginPercentage")
    .optional()
    .isFloat()
    .withMessage("Gross Margin Percentage must be an amount"),

  body("invoiceId")
    .optional()
    .matches(/^\d{3}-\d{2}-\d{4}$/)
    .withMessage("Invoice ID must be in the format XXX-XX-XXXX"),

  body("payment")
    .optional()
    .isString()
    .withMessage("Payment must be a string")
    .trim(),

  body("productLine")
    .optional()
    .isString()
    .withMessage("Product Line must be a string")
    .trim(),

  body("quantity")
    .optional()
    .isInt()
    .withMessage("Quantity must be an integer"),

  body("rating")
    .optional()
    .isFloat()
    .withMessage("Rating must be a valid float"),

  body("tax")
    .optional()
    .isFloat()
    .withMessage("Tax must be an amount"),

  body("time")
    .optional()
    .isTime()
    .withMessage("Time must be a valid time"),

  body("total")
    .optional()
    .isFloat()
    .withMessage("Total must be an amount"),

  body("unitPrice")
    .optional()
    .isFloat()
    .withMessage("Unit Price must be an amount"),

  checkValidation,
];

module.exports = updateSalesRules;
