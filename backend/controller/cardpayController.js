const CardPayment = require("../models/cardpayModel");
const PayerInfo = require("../models/paymentModel");

const maskCardNumber = (cardNumber) => {
    // Extract the first 12 digits and mask them with asterisks (*) 
    const maskedPart = cardNumber.substring(0, 14).replace(/\d/g, '*');
    // Concatenate the masked part with the last 4 digits
    const last4Digits = cardNumber.substring(14);
    return maskedPart + ' ' + last4Digits;
};

const maskCVV = (cvv) => {
    // Mask the entire CVV with asterisks (*)
    return '*'.repeat(cvv.length);
};

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

        // Mask the card number using the maskCardNumber function
        const maskedCardNumber = maskCardNumber(cardNumber);

        // Mask the CVV using the maskCVV function
        const maskedCvv = maskCVV(cvv);

        const cardPayment = new CardPayment({
            payer: payer._id,
            nameOnCard,
            cardNumber: maskedCardNumber,
            cvv: maskedCvv,
            expireDate,
        });

        await cardPayment.save();
        res.status(200).json({ message: "Card payment processed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getAllCardPaymentsWithPayerInfo = async (req, res) => {
    try {
        const cardPayments = await CardPayment.find().populate('payer');

        const formattedCardPayments = cardPayments.map(cardPayment => {
            if (cardPayment.payer) {
                const { name, email, phonenumber, purpose, amount } = cardPayment.payer;
                return {
                    payerName: name,
                    payerEmail: email,
                    payerPhoneNumber: phonenumber,
                    purpose,
                    amount,
                    cardNumber: cardPayment.cardNumber,
                    
                };
            } else {
                // If payer information is not available, handle it accordingly
                return {
                    payerName: 'Unknown',
                    payerEmail: 'Unknown',
                    payerPhoneNumber: 'Unknown',
                    purpose: 'Unknown',
                    amount: 'Unknown',
                    cardNumber: cardPayment.cardNumber,
                    
                };
            }
        });

        res.status(200).json(formattedCardPayments);
    } catch (error) {
        console.error('Error fetching card payments:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// // Controller function to fetch payer's information along with card number
// exports.getCardpayReport = async (req, res) => {
//     try {
//       const cardPayments = await CardPayment.find().populate('payer');
  
//       const formattedData = cardPayments.map(cardPayment => {
//         const payer = cardPayment.payer;
//         if (payer) {
//           return {
//             name: payer.name,
//             email: payer.email,
//             phonenumber: payer.phonenumber,
//             address: payer.address,
//             purpose: payer.purpose,
//             amount: payer.amount,
//             cardNumber: cardPayment.cardNumber
//           };
//         } else {
//           return {
//             name: 'Unknown',
//             email: 'Unknown',
//             phonenumber: 'Unknown',
//             address: 'Unknown',
//             purpose: 'Unknown',
//             amount: 'Unknown',
//             cardNumber: cardPayment.cardNumber
//           };
//         }
//       });
  
//       res.status(200).json(formattedData);
//     } catch (error) {
//       console.error('Error fetching card payments:', error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   };

// exports.getCardPaymentById = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const cardPayment = await CardPayment.findById(id).populate('payer');
  
//       if (!cardPayment) {
//         return res.status(404).json({ message: 'Card payment not found' });
//       }
  
//       const { payer, cardNumber } = cardPayment;
//       const { name, email, phonenumber, address, purpose, amount } = payer;
  
//       const cardPaymentData = {
//         payerName: name,
//         payerEmail: email,
//         payerPhoneNumber: phonenumber,
//         payerAddress: address,
//         purpose,
//         amount,
//         cardNumber,
//       };
  
//       res.status(200).json(cardPaymentData);
//     } catch (error) {
//       console.error('Error fetching card payment data:', error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   };

exports.getCardPaymentById = async (req, res) => {
    try {
      const { id } = req.params;
      const cardPayment = await CardPayment.findById(id).populate('payer');
  
      if (!cardPayment) {
        return res.status(404).json({ message: 'Card payment not found' });
      }
  
      const { payer, cardNumber } = cardPayment;
      const { name, email, phonenumber, address, purpose, amount } = payer;
  
      const cardPaymentData = {
        payerName: name,
        payerEmail: email,
        payerPhoneNumber: phonenumber,
        payerAddress: address,
        purpose,
        amount,
        cardNumber,
      };
  
      res.status(200).json(cardPaymentData);
    } catch (error) {
      console.error('Error fetching card payment data:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };