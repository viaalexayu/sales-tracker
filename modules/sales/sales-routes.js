const { Router } = require("express");
// const createCustomerRules = require("./middlewares/create-customers-rules");
// const updateCustomerRules = require("./middlewares/update-customers-rules");

const SalesModel = require("./sales-model");

const salesRoute = Router();

// Retrieve all sales from the database.
salesRoute.get("/sales", async (req, res) => {
    const allSales = await SalesModel.find();
    if(!allSales) res.send([]);
    else res.send(allSales);
});

// Retrieve a single sale by ID from the URL parameters.
//68efddeef2b9480469c21d81
salesRoute.get("/sales/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const sale = await SalesModel.findById(id);
        if(sale) res.send(sale);
        else res.status(404).send(`404! ${req.method} ${id} not found.`);
    } catch(error) {
        res.status(404).send(`404! ${req.method} ${error}.`);
    }
});

// //Create a new customer using data from the request body.
// salesRoute.post("/sales", createCustomerRules, async (req, res) => {
//     try {
//         const customer = await CustomerModel.create(req.body)
//         res.send(customer)
//     } catch(error) {
//         res.status(500).send(`500! ${req.method} ${error}.`);
//     }
// });

// //Update the customer’s fields.
// salesRoute.put("/customers/:id", updateCustomerRules, async (req, res) => {
//     const id = req.params.id;
//     try {
//         const customer = await CustomerModel.findById(id);
//         if(customer) {            
//             await CustomerModel.updateOne(
//                 { _id: id },
//                 { $set: req.body },
//                 { new: true }
//                 )
//             res.send(customer);
//         } else {
//             res.status(404).send(`404! ${req.method} ${id} not found.`);
//         }
//     } catch(error) {
//         res.status(500).send(`500! ${req.method} ${error}.`);
//     }
// });

// //Delete the customer.
// sales.delete("/customers/:id", async (req, res) => {
//     const id = req.params.id;
//     try {
//         const customer = await CustomerModel.findById(id);
//         if(customer) {            
//             await CustomerModel.deleteOne({ _id: id })
//             res.send(customer);
//         } else {
//             res.status(404).send(`404! ${req.method} ${id} not found.`);
//         }
//     } catch(error) {
//         res.status(500).send(`500! ${req.method} ${error}.`);
//     }
// });

module.exports = { salesRoute };
