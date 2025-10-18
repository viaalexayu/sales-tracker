const { Router } = require("express");
const createSalesRules = require("./middlewares/create-sales-rules");
const updateSalesRules = require("./middlewares/update-sales-rules");

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

//Create a new sale using data from the request body.
// {
// "_id": "123456789",
// "invoiceId": "123-45-6789",
// "branch": "Z",
// "city": "Toronto",
// "customerType": "Member",
// "gender": "Female",
// "productLine": "Food",
// "unitPrice": "100.00",
// "quantity": "2",
// "tax": "10.0",
// "total": "210.0",
// "time": "10:30",
// "payment": "Ewallet",
// "cogs": "100.0",
// "grossMarginPercentage": "25",
// "grossIncome": "75",
// "rating": "10"
// }
salesRoute.post("/sales", createSalesRules, async (req, res) => {
    try {
        const sale = await SalesModel.create(req.body)
        res.send(sale)
    } catch(error) {
        res.status(500).send(`500! ${req.method} ${error}.`);
    }
});

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
