const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;

async function connectDB(req, res, next) {
    try {
        await mongoose.connect(dbUrl, { dbName: "gas_sales" });
        console.log("Database is connected!");
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send("Cannot connect to database.");
    }
}

module.exports = connectDB;