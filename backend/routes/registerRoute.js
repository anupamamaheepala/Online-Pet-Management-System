// routes/registerRoute.js

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const customerSchema = require("../models/registerModel");

// const express = require('express');
// const router = express.Router();
// const registerController = require("../controller/registerController");
// const customerSchema = require('../models/registerModel');
// const bcrypt = require('bcrypt');
// const Customer = require('../models/registerModel');
const express = require('express');
const router = express.Router();
const registerController = require("../controller/registerController");
const customerSchema = require('../models/registerModel');
const bcrypt = require('bcrypt');





// Register a new customer
router.post("/register", registerController.registerCustomer);

// Get all customers
router.get("/", registerController.getAllCustomers);

// Get customer by ID
router.get("/:id", registerController.getCustomerById);

// Update customer by ID
router.put("/:id", registerController.updateCustomer);

// Delete a customer by ID
router.delete("/:id", registerController.deleteCustomerById);

// Sign-in endpoint
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await customerSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If the credentials are valid, return a success message
    res.status(200).json({ message: 'Sign-in successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;



// //add a single income
// router.post("/register", async (req, res) => {
//   //destructuring request body into its components
//   console.log("okkkkk");
//   const {
//     username,
//     email,
//     contactNumber,
//     address,
//     password,
//     confirmPassword,
//   } = req.body;

//   //validations
//   try {
//     if (
//       !username ||
//       !email ||
//       !contactNumber ||
//       !address ||
//       !password ||
//       !confirmPassword
      
//     ) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }
//      // Check if password and confirm password match
//      if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Password and confirm password should be the same" });
//     }
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds

    

//     const income = customerSchema({
//       username,
//       email,
//       contactNumber,
//       address,
//       password: hashedPassword,
      
//     });

    
//     //saving data into the database
//     await income.save();
//     res.status(200).json({ message: "register customer" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Get all registrations
// router.route("/").get((req,res)=>{
    
//   customerSchema.find().then((customer)=>{
//       res.json(customer)
//   }) .catch((err)=>{
//       console.log(err);
//   })

// })

// // Delete a customer by ID
// router.delete("/:id", async (req, res) => {
//   try {
//       await customerSchema.findByIdAndDelete(req.params.id);
//       res.status(200).json({ message: "Customer deleted successfully" });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Failed to delete customer" });
//   }
// });

// // Get a customer by ID
// router.get("/:id", async (req, res) => {
//   try {
//       const customer = await customerSchema.findById(req.params.id);
//       if (!customer) {
//           return res.status(404).json({ message: "Customer not found" });
//       }
//       res.status(200).json(customer);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Failed to fetch customer details" });
//   }
// });

// // Update a customer by ID
// router.put("/:id", async (req, res) => {
//   try {
//       await customerSchema.findByIdAndUpdate(req.params.id, req.body);
//       res.status(200).json({ message: "Customer updated successfully" });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Failed to update customer" });
//   }
// });









/*// Get all registrations
router.get('/add', async (req, res) => {
  try {
    const registrations = await Register.find();
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific registration
router.get('/:id', getRegister, (req, res) => {
  res.json(res.register);
});
*/

/* // Update a registration
router.patch('/:id', getRegister, async (req, res) => {
  if (req.body.username != null) {
    res.register.username = req.body.username;
  }
  if (req.body.email != null) {
    res.register.email = req.body.email;
  }
  if (req.body.contactNumber != null) {
    res.register.contactNumber = req.body.contactNumber;
  }
  if (req.body.address != null) {
    res.register.address = req.body.address;
  }
  if (req.body.password != null) {
    res.register.password = req.body.password;
  }
  try {
    const updatedRegister = await res.register.save();
    res.json(updatedRegister);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}); */

/*// Delete a registration
router.delete('/:id', getRegister, async (req, res) => {
  try {
    await res.register.remove();
    res.json({ message: 'Deleted Registration' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); */
/*
// Middleware to get registration by ID
async function getRegister(req, res, next) {
  try {
    const register = await Register.findById(req.params.id);
    if (register == null) {
      return res.status(404).json({ message: 'Cannot find registration' });
    }
    res.register = register;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
*/

