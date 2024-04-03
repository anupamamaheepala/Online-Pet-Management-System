const express = require("express");
const router = express.Router();
const AdsSchema = require("../models/advertisementModel");

//add a single income
router.post("/add", async (req, res) => {
  //destructuring request body into its components
  console.log("okkkk");
  const {
    ownerName,
    email,
    title,
    Breed,
    purpose,
    description,
    price,
    contact,
  } = req.body;

  //validations
  try {
    if (
      !ownerName ||
      !email ||
      !title ||
      !Breed ||
      !purpose ||
      !description ||
      !price ||
      !contact
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const income = AdsSchema({
      ownerName,
      email,
      title,
      Breed,
      purpose,
      description,
      price,
      contact,
    });

    //saving data into the database
    await income.save();
    res.status(200).json({ message: "Add added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


router.route("/").get((req,res)=>{
    
  AdsSchema.find().then((ads)=>{
      res.json(ads)
  }) .catch((err)=>{
      console.log(err);
  })

})


router.route("/_id").delete(async (req,res)=>{
  let userId = req.params.id;

  await AdsSchema.findByIdAndDelete(userId).then(()=>{
      res.status(200).send({status:"User deleted"});
      console.log(userId);
  }) .catch((err) =>{
      console.log(err.message);
      res.status(500).send({status: "Error with delete user ", error: err.message});
  })
})





module.exports = router;

























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
