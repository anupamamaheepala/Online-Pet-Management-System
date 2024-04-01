const express = require("express");
const router = express.Router();
const payerinfoSchema = require("../models/paymentModel");

router.post("/pay", async (req, res) => {
    console.log("OK");
    const {
        name,
        email,
        phonenumber,
        address,
    } = req.body;

    try{
        if(
            !name ||
            !email ||
            !phonenumber ||
            !address
        ) {
            return res.status(400).json({message: "All fields are required!"});
        }

        const income = payerinfoSchema({
            name,
            email,
            phonenumber,
            address,
        });
        
        await income.save();
        res.status(200).json({ message: "Add added" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
        
});

module.exports = router;