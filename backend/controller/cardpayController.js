// // const CardPayment = require("../models/cardpayModel");
// // const PayerInfo = require("../models/paymentModel");

// // // // Controller function for handling card payment-related operations
// // // const cardPaymentController = {
// // //   // Method for processing card payment
// // //   processCardPayment: async (req, res) => {
// // //     try {
// // //       const { nameOnCard, cardNumber, cvv, expireDate } = req.body;

// // //       if (!nameOnCard || !cardNumber || !cvv || !expireDate) {
// // //         return res.status(400).json({ message: "All fields are required!" });
// // //       }

// // //       // Mask the first 14 digits of the card number with asterisks (*) and keep the last 4 digits
// // //       const maskedCardNumber = maskCardNumber(cardNumber);

// // //       // Mask the CVV with asterisks (*)
// // //       const maskedCvv = cvv.replace(/\d/g, '*');

// // //       const cardPayment = new CardPayment({
// // //         nameOnCard,
// // //         cardNumber: maskedCardNumber, // Store the masked card number
// // //         cvv: maskedCvv, // Store the masked CVV
// // //         expireDate,
// // //       });   

// // //       await cardPayment.save();
// // //       res.status(200).json({ message: "Card payment processed successfully" });
// // //     } catch (error) {
// // //       console.error(error);
// // //       res.status(500).json({ message: "Server Error" });
// // //     }
// // //   },
// // // };

// // // // Function to mask the card number
// // // const maskCardNumber = (cardNumber) => {
// // //   // Extract the first 14 digits and mask them with asterisks (*) 
// // //   const maskedPart = cardNumber.substring(0, 14).replace(/\d/g, '*');
// // //   // Concatenate the masked part with the last 4 digits
// // //   const last4Digits = cardNumber.substring(14);
// // //   return maskedPart + last4Digits;
// // // };
// // const cardPaymentController = {
// //   processCardPayment: async (req, res) => {
// //       try {
// //           const { payerId, nameOnCard, cardNumber, cvv, expireDate } = req.body;

// //           if (!payerId || !nameOnCard || !cardNumber || !cvv || !expireDate) {
// //               return res.status(400).json({ message: "All fields are required!" });
// //           }

// //           const payer = await PayerInfo.findById(payerId);

// //           if (!payer) {
// //               return res.status(404).json({ message: "Payer not found" });
// //           }

// //           const cardPayment = new CardPayment({
// //               payer: payer._id,
// //               nameOnCard,
// //               cardNumber,
// //               cvv,
// //               expireDate,
// //           });

// //           await cardPayment.save();
// //           res.status(200).json({ message: "Card payment processed successfully" });
// //       } catch (error) {
// //           console.error(error);
// //           res.status(500).json({ message: "Server Error" });
// //       }
// //   }
// // };

// // module.exports = cardPaymentController;
// // cardpayController.js
// // const CardPayment = require("../models/cardpayModel");
// // const PayerInfo = require("../models/paymentModel");

// // const cardPaymentController = {
// //   processCardPayment: async (req, res) => {
// //       try {
// //           const { payerId, nameOnCard, cardNumber, cvv, expireDate } = req.body;

// //           if (!payerId || !nameOnCard || !cardNumber || !cvv || !expireDate) {
// //               return res.status(400).json({ message: "All fields are required!" });
// //           }

// //           const payer = await PayerInfo.findById(payerId);

// //           if (!payer) {
// //               return res.status(404).json({ message: "Payer not found" });
// //           }

// //           const cardPayment = new CardPayment({
// //               payer: payer._id,
// //               nameOnCard,
// //               cardNumber,
// //               cvv,
// //               expireDate,
// //           });

// //           await cardPayment.save();
// //           res.status(200).json({ message: "Card payment processed successfully" });
// //       } catch (error) {
// //           console.error(error);
// //           res.status(500).json({ message: "Server Error" });
// //       }
// //   },
// //   // getAllCardPayments: async (req, res) => {
// //   //   try {
// //   //       const cardPayments = await CardPayment.find().populate('payer', '-_id name email'); // Populate payer fields except _id
// //   //       res.status(200).json(cardPayments);
// //   //   } catch (error) {
// //   //       console.error(error);
// //   //       res.status(500).json({ message: "Server Error" });
// //   //   }
// //   // }
// // //   getAllCardPayments: async (req, res) => {
// // //     try {
// // //         const cardPayments = await CardPayment.find().populate('payer');
// // //         res.status(200).json(cardPayments);
// // //     } catch (error) {
// // //         console.error(error);
// // //         res.status(500).json({ message: "Server Error" });
// // //     }
// // // }
// // // getAllCardPaymentsWithPayerInfo: async (req, res) => {
// // //   try {
// // //       // Fetch all card payments
// // //       const cardPayments = await CardPayment.find().populate('payer'); // Populate payer field

// // //       // Fetch payer information for each card payment
// // //       const populatedCardPayments = await Promise.all(cardPayments.map(async (cardPayment) => {
// // //         // Assuming payer field is a reference to PayerInfo model
// // //         const payer = await PayerInfo.findById(cardPayment.payer);
// // //         return {
// // //           cardPayment,
// // //           payer
// // //         };
// // //       }));

// // //       res.status(200).json(populatedCardPayments);
// // //   } catch (error) {
// // //       console.error(error);
// // //       res.status(500).json({ message: "Server Error" });
// // //   }
// // // }
// // getAllCardPaymentsWithPayerInfo: async (req, res) => {
// //   try {
// //     // Fetch all card payments with payer information
// //     const cardPayments = await CardPayment.find().populate('payer'); // Populate payer field

// //     // Map each card payment to include payer information
// //     const populatedCardPayments = cardPayments.map(cardPayment => ({
// //       payerName: cardPayment.payer.name,
// //       payerEmail: cardPayment.payer.email,
// //       cardNumber: cardPayment.cardNumber,
// //       cvv: cardPayment.cvv,
// //       expireDate: cardPayment.expireDate
// //     }));

// //     res.status(200).json(populatedCardPayments);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // }

// // };
  



// // module.exports = cardPaymentController;
// const CardPayment = require("../models/cardpayModel");
// const PayerInfo = require("../models/paymentModel");

// const cardPaymentController = {
//   processCardPayment: async (req, res) => {
//       try {
//           const { payerId, nameOnCard, cardNumber, cvv, expireDate } = req.body;

//           if (!payerId || !nameOnCard || !cardNumber || !cvv || !expireDate) {
//               return res.status(400).json({ message: "All fields are required!" });
//           }

//           const payer = await PayerInfo.findById(payerId);

//           if (!payer) {
//               return res.status(404).json({ message: "Payer not found" });
//           }

//           const cardPayment = new CardPayment({
//               payer: payer._id,
//               nameOnCard,
//               cardNumber,
//               cvv,
//               expireDate,
//           });

//           await cardPayment.save();
//           res.status(200).json({ message: "Card payment processed successfully" });
//       } catch (error) {
//           console.error(error);
//           res.status(500).json({ message: "Server Error" });
//       }
//   },

//   getAllCardPaymentsWithPayerInfo: async (req, res) => {
//     try {
//       const cardPayments = await CardPayment.find().populate('payer'); // Fetch all card payments with payer information

//       const formattedCardPayments = cardPayments.map(cardPayment => {
//         // Extract payer information
//         const { name, email } = cardPayment.payer;

//         // Construct formatted card payment object
//         const formattedPayment = {
//           payerName: name,
//           payerEmail: email,
//           cardNumber: cardPayment.cardNumber,
//           cvv: cardPayment.cvv,
//           expireDate: cardPayment.expireDate
//         };

//         return formattedPayment;
//       });

//       res.status(200).json(formattedCardPayments); // Send formatted card payments as JSON response
//     } catch (error) {
//       console.error('Error fetching card payments:', error);
//       res.status(500).json({ message: 'Server Error' }); // Handle server error
//     }
//   }
// };

// module.exports = cardPaymentController;
const CardPayment = require("../models/cardpayModel");
const PayerInfo = require("../models/paymentModel");

exports.processCardPayment = async (req, res) => {
    try {
        const { payerId, nameOnCard, cardNumber, cvv, expireDate } = req.body;

        if (!payerId || !nameOnCard || !cardNumber || !cvv || !expireDate) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const payer = await PayerInfo.findById(payerId);

        if (!payer) {
            return res.status(404).json({ message: "Payer not found" });
        }

        const cardPayment = new CardPayment({
            payer: payer._id,
            nameOnCard,
            cardNumber,
            cvv,
            expireDate,
        });

        await cardPayment.save();
        res.status(200).json({ message: "Card payment processed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// exports.getAllCardPaymentsWithPayerInfo = async (req, res) => {
//     try {
//         const cardPayments = await CardPayment.find().populate('payer');

//         const formattedCardPayments = cardPayments.map(cardPayment => {
//             const { name, email } = cardPayment.payer;
//             return {
//                 payerName: name,
//                 payerEmail: email,
//                 cardNumber: cardPayment.cardNumber,
//                 cvv: cardPayment.cvv,
//                 expireDate: cardPayment.expireDate
//             };
//         });

//         res.status(200).json(formattedCardPayments);
//     } catch (error) {
//         console.error('Error fetching card payments:', error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

exports.getAllCardPaymentsWithPayerInfo = async (req, res) => {
    try {
        const cardPayments = await CardPayment.find().populate('payer');

        const formattedCardPayments = cardPayments.map(cardPayment => {
            if (cardPayment.payer) {
                const { name, email } = cardPayment.payer;
                return {
                    payerName: name,
                    payerEmail: email,
                    cardNumber: cardPayment.cardNumber,
                    cvv: cardPayment.cvv,
                    expireDate: cardPayment.expireDate
                };
            } else {
                // If payer information is not available, handle it accordingly
                return {
                    payerName: 'Unknown',
                    payerEmail: 'Unknown',
                    cardNumber: cardPayment.cardNumber,
                    cvv: cardPayment.cvv,
                    expireDate: cardPayment.expireDate
                };
            }
        });

        res.status(200).json(formattedCardPayments);
    } catch (error) {
        console.error('Error fetching card payments:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

