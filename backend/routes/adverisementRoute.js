const { default: AddAdvertisement } = require('../../frontend/src/pages/AddAdvertisement');
const { ownerName, email, title, Breed, purpose, description, price, contact} = require('../controller/advertisementController');

const router = require('express').Router();



router.post('/addAds', AddAdvertisement)
      // .get('/get-incomes', getIncomes)
      // .get('/get-income/:id', getIncome)
      // .put('/update-income/:id', updateIncome)
      // .delete('/delete-income/:id', deleteIncome)
      // .post('/add-expense', addExpense)
      // .get('/get-expenses', getExpenses)
      // .get('/get-expense/:id', getExpense)
      // .put('/update-expense/:id', updateExpense)
      // .delete('/delete-expense/:id', deleteExpense)
      // .post('/export')
module.exports = router


























// // advertisementRoute.js

// const express = require('express');
// const router = express.Router();
// const Advertisement = require('../models/advertisementModel');

// // Route to add a new advertisement
// dd('hit');
// router.post('/add', async (req, res) => {
//   try {
//     const { ownerName, email, title, Breed, purpose, description, price, contact  } = req.body;
//     const newAdvertisement = new Advertisement({
//       ownerName,
//       email,
//       title,
//       Breed,
//       purpose,
//       description,
//       price,
//       contact
//     });

//     await newAdvertisement.save();
//     res.status(201).json({ message: 'Advertisement added successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;
