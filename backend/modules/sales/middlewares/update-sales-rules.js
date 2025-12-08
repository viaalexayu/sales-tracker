const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateSalesRules = [

  body("date")
    .optional()
    .isDate()
    .withMessage("Date must be a valid date"),

  body("seller")
    .optional()
    .isString()
    .withMessage("Seller must be a string")
    .trim(),

  body("buyer")
    .optional()
    .isString()
    .withMessage("Buyer must be a string")
    .trim(),

  body("number")
    .optional()
    .isInt()
    .withMessage("Number must be an integer"),

  body("price11kgRefill")
    .optional()
    .isFloat()
    .withMessage("Price must be an amount"),

  body("price2_7kgCylinder")
    .optional()
    .isFloat()
    .withMessage("Price must be an amount"),

  body("price2_7kgRefill")
    .optional()
    .isFloat()
    .withMessage("Price must be an amount"),

  body("price11kgCylinder")
    .optional()
    .isFloat()
    .withMessage("Price must be an amount"),

  body("qty11kgKCylinder")
    .optional()
    .isInt()
    .withMessage("Quantity must be an integer in kg"),

  body("qty11kgKRefill")
    .optional()
    .isInt()
    .withMessage("Quantity must be an integer in kg"),

  body("qty11kgPCylinder")
    .optional()
    .isInt()
    .withMessage("Quantity must be an integer in kg"),

  body("qty11kgPRefill")
    .optional()
    .isInt()
    .withMessage("Quantity must be an integer in kg"),

  body("qty2_7kgCylinder")
    .optional()
    .isInt()
    .withMessage("Quantity must be an integer in kg"),

  body("qty2_7kgRefill")
    .optional()
    .isInt()
    .withMessage("Quantity must be an integer in kg"),

  body("totalPrice")
    .optional()
    .isFloat()
    .withMessage("Total must be an amount"),

  checkValidation,
];

module.exports = updateSalesRules;
