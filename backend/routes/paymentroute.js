const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const payerinfoSchema = require("../models/paymentModel");
const cardpaySchema = require("../models/paymentModel");

//payer information
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


//card payment
router.post("/cpay", async (req, res) => {
    console.log("OK");
    const {
        nameOnCard,
        cardNumber,
        cvv,
        expireDate,
    } = req.body;

    try{
        if(
            !nameOnCard ||
            !cardNumber ||
            !cvv ||
            !expireDate
        ) {
            return res.status(400).json({message: "All fields are required!"});
        }

        const income = cardpaySchema({
            nameOnCard,
            cardNumber,
            cvv,
            expireDate,
        });
        
        await income.save();
        res.status(200).json({ message: "Add added" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
        
});

module.exports = router;