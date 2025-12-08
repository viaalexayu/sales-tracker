const { Router } = require("express");
const createSalesRules = require("./middlewares/create-sales-rules");
const updateSalesRules = require("./middlewares/update-sales-rules");

const SalesModel = require("./sales-model");

const salesRoute = Router();

// Retrieve all sales from the database.
// Store managers can see their sales by making a query.
salesRoute.get("/sales", async (req, res) => {
    const { seller } = req.query;
    const filter = seller ? { seller } : {};
    try {
        const sales = await SalesModel.find(filter);
        res.send(sales);
    } catch (error) {
        res.status(404).send(`404! ${req.method} ${error}.`);
    }
});

// Retrieve a single sale by ID from the URL parameters.
//690837cf7859e8e35f755fc1
salesRoute.get("/sales/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const sale = await SalesModel.findById(id);
        if (sale) res.send(sale);
        else res.status(404).send(`404! ${req.method} ${id} not found.`);
    } catch (error) {
        res.status(404).send(`404! ${req.method} ${error}.`);
    }
});

//Create a new sale using data from the request body.
// {
//     "_id": "690837cf4567e8e35f755f13",
//     "date": "2024-02-03",
//     "seller": "O",
//     "buyer": "Via Alexa Yu",
//     "number": 123456,
//     "price11kgRefill": 735.75,
//     "price2_7kgRefill": 0,
//     "price11kgCylinder": 2200,
//     "price2_7kgCylinder": 0,
//     "qty11kgKRefill": 0,
//     "qty11kgKCylinder": 0,
//     "qty11kgPRefill": 1,
//     "qty11kgPCylinder": 0,
//     "qty2_7kgRefill": 0,
//     "qty2_7kgCylinder": 0,
//     "totalPrice": 735.75
// }
salesRoute.post("/sales", createSalesRules, async (req, res) => {
    try {
        const sale = await SalesModel.create(req.body)
        res.send(sale)
    } catch (error) {
        res.status(500).send(`500! ${req.method} ${error}.`);
    }
});

//Update a sale's fields.
salesRoute.put("/sales/:id", updateSalesRules, async (req, res) => {
    const id = req.params.id;
    try {
        const sale = await SalesModel.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (sale) {
            res.send(sale);
        } else {
            res.status(404).send(`404! ${req.method} ${id} not found.`);
        }
    } catch (error) {
        res.status(500).send(`500! ${req.method} ${error}.`);
    }
});

//Delete the sale.
salesRoute.delete("/sales/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const sale = await SalesModel.findById(id);
        if (sale) {
            await SalesModel.deleteOne({ _id: id })
            res.send(sale);
        } else {
            res.status(404).send(`404! ${req.method} ${id} not found.`);
        }
    } catch (error) {
        res.status(500).send(`500! ${req.method} ${error}.`);
    }
});

// Operations manager can see a summary of sales per store.
salesRoute.get("/summary", async (req, res) => {
    try {
        const allSales = await SalesModel.find();
        let T1 = 0;
        let T2 = 0;
        let T3 = 0;
        let O = 0;
        let W = 0;
        let others = 0;

        for (let entry of allSales) {
            if (entry.seller === "T1") {
                T1 += entry.totalPrice;
            }
            else if (entry.seller === "T2") {
                T2 += entry.totalPrice;
            }
            else if (entry.seller === "T3") {
                T3 += entry.totalPrice;
            }
            else if (entry.seller === "O") {
                O += entry.totalPrice;
            }
            else if (entry.seller === "W") {
                W += entry.totalPrice;
            }
            else {
                if (!isNaN(entry.totalPrice)) {
                    others += entry.totalPrice;
                }
            }
        }

        res.send(
            "<p><i>Welcome, Admin!</i></br></br><b>T1 Store:</b> ₱" + T1 +
            "<br/><b>T2 Store:</b> ₱" + T2 + "<br/><b>T3 Store:</b> ₱" + T3 +
            "<br/><b>O Store:</b> ₱" + O + "<br/><b>W Store:</b> ₱" + W +
            "<br/><b>Others:</b> ₱" + others + "</p>");
    } catch (error) {
        res.status(404).send(`404! ${req.method} ${error}.`);
    }
});

module.exports = { salesRoute };
