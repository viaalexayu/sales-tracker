const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createSalesRules = [

  body("date")
    .notEmpty()
    .isDate()
    .withMessage("Date must be a valid date"),

  body("seller")
    .notEmpty()
    .withMessage("Seller is required")
    .isString()
    .withMessage("Seller must be a string")
    .trim(),

  body("buyer")
    .notEmpty()
    .withMessage("Buyer is required")
    .isString()
    .withMessage("Buyer must be a string")
    .trim(),

  body("number")
    .notEmpty()
    .withMessage("Number is required")
    .isInt()
    .withMessage("Number must be an integer"),

  body("price11kgRefill")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat()
    .withMessage("Price must be an amount"),

  body("price2_7kgCylinder")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat()
    .withMessage("Price must be an amount"),

  body("price2_7kgRefill")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat()
    .withMessage("Price must be an amount"),

  body("price11kgCylinder")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat()
    .withMessage("Price must be an amount"),

  body("qty11kgKCylinder")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt()
    .withMessage("Quantity must be an integer in kg"),

  body("qty11kgKRefill")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt()
    .withMessage("Quantity must be an integer in kg"),

  body("qty11kgPCylinder")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt()
    .withMessage("Quantity must be an integer in kg"),

  body("qty11kgPRefill")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt()
    .withMessage("Quantity must be an integer in kg"),

  body("qty2_7kgCylinder")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt()
    .withMessage("Quantity must be an integer in kg"),

  body("qty2_7kgRefill")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt()
    .withMessage("Quantity must be an integer in kg"),

  body("totalPrice")
    .notEmpty()
    .withMessage("Total is required")
    .isFloat()
    .withMessage("Total must be an amount"),

  checkValidation,
];

module.exports = createSalesRules;
