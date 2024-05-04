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

        // Check if the expiration date is valid
        const currentDate = new Date();
        const [month, year] = expireDate.split('/').map(part => parseInt(part, 10));
        const cardExpirationDate = new Date(2000 + year, month - 1); // Adjust the year to 4 digits and month to 0-based index

        if (cardExpirationDate < currentDate) {
            return res.status(400).json({ message: "The card has already expired" });
        }

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


exports.getPayerDetails = async (req, res) => {
    try {
        const payerId = req.params.id;
        const payer = await PayerInfo.findById(payerId);
        res.status(200).json(payer);
    } catch (error) {
        console.error('Error fetching payer details:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getCardPaymentByPayerId = async (req, res) => {
    try {
      const { id } = req.params;
      const cardPayment = await CardPayment.findOne({ payer: id });
  
      if (!cardPayment) {
        return res.status(404).json({ message: 'Card payment not found' });
      }
  
      res.status(200).json(cardPayment);
    } catch (error) {
      console.error('Error fetching card payment data:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
