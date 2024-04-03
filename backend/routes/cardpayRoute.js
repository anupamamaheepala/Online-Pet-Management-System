// const express = require("express");
// const router = express.Router();
// // const multer = require('multer');
// // const path = require('path');
// const cardpaySchema = require("../models/paymentModel");

// //card payment
// router.post("/cpay", async (req, res) => {
//     console.log("OK");
//     const {
//         nameOnCard,
//         cardNumber,
//         cvv,
//         expireDate,
//     } = req.body;

//     try{
//         if(
//             !nameOnCard ||
//             !cardNumber ||
//             !cvv ||
//             !expireDate
//         ) {
//             return res.status(400).json({message: "All fields are required!"});
//         }

//         const income = cardpaySchema({
//             nameOnCard,
//             cardNumber,
//             cvv,
//             expireDate,
//         });
        
//         await income.save();
//         res.status(200).json({ message: "Add added" });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
        
// });

// routes/cardPaymentRoute.js

const express = require("express");
const router = express.Router();
const cardpayController = require("../controller/cardpayController");

// Route for processing card payment
router.post("/cpay", cardpayController.processCardPayment);

module.exports = router;
