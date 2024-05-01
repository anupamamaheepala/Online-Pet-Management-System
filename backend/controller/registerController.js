const bcrypt = require('bcrypt');
const Customer = require("../models/registerModel");
const passwordValidator = require('password-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
      const customerId = req.params.customerId;
      const fileName = `${customerId}_${Date.now()}_${file.originalname}`;
      cb(null, fileName); // Create a unique file name for each uploaded file
  }
});

const upload = multer({ storage });



// Schema for password validation
const schema = new passwordValidator();
schema
  .is().min(8) // Minimum length 8 characters
  .is().max(100) // Maximum length 100 characters
  .has().uppercase() // Must have at least one uppercase letter
  .has().lowercase() // Must have at least one lowercase letter
  .has().digits() // Must have at least one digit
  .has().symbols(); // Must have at least one special character

  // Validate contact numbers
const validateContactNumbers = (contactNumbers) => {
  for (const contact of contactNumbers) {
      if (!/^\d{10}$/.test(contact)) {
          return false;
      }
  }
  return true;
};

// Register a new customer
exports.registerCustomer = async (req, res) => {
  const { username, email, contactNumbers, address, password, confirmPassword,profilePhoto } = req.body;
  

  // Validate password
  if (!schema.validate(password)) {
    return res.status(400).json({ message: "Password does not meet the requirements." });
  }

  // Validate contact numbers
  if (!validateContactNumbers(contactNumbers)) {
    return res.status(400).json({ message: "Contact numbers must be exactly 10 digits long and contain only numbers." });
}

  // Check if the email already exists in the database
  try {
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already exists. Please use a different email." });
    }

    // Validations
    if (!username || !email || !contactNumbers || !address || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password and confirm password should be the same" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds

    const customer = new Customer({
      username,
      email,
      contactNumbers,
      address,
      password: hashedPassword,
      profilePhoto,
    });

    // Saving data into the database
    await customer.save();
    res.status(200).json({ message: "Customer registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch customer details" });
  }
};


exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Construct the full URL for the profile photo
    if (customer.profilePhoto) {
      customer.profilePhoto = `${req.protocol}://${req.get('host')}/${customer.profilePhoto}`;
    }

    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch customer details" });
  }
};


// Update customer details
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // New customer data
    

    // Update the customer in the database
    await Customer.findByIdAndUpdate(id, updates);

    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update customer" });
  }
};

// Delete a customer by ID
exports.deleteCustomerById = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete customer" });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If the credentials are valid, return user data
    res.status(200).json({ message: 'Sign-in successful', user: { _id: user._id, username: user.username, profilePhoto: user.profilePhoto } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



exports.resetPassword = async (req, res) => {
  const { customerId } = req.params;
  const { existingPassword, newPassword } = req.body;

  try {
    // Fetch the customer from the database
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Compare the existing password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(existingPassword, customer.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect existing password' });
    }

    // Hash the new password before updating
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the customer's password in the database with the hashed new password
    customer.password = hashedNewPassword;
    await customer.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




//function to upload profile photo
exports.uploadProfilePhoto = [upload.single('profilePhoto'), async (req, res) => {
  try {
      const { customerId } = req.params;
      const profilePhotoPath = req.file.path.replace(/\\/g, '/'); // Normalize the file path

      // Update the customer's profile photo URL
      const updatedCustomer = await Customer.findByIdAndUpdate(
          customerId,
          { profilePhoto: profilePhotoPath },
          { new: true } // Return the updated document
      );

      if (!updatedCustomer) {
          return res.status(404).json({ message: 'Customer not found' });
      }

      // Create the full URL for the profile photo
      const profilePhotoURL = `${req.protocol}://${req.get('host')}/${profilePhotoPath}`;
      
      // Send the new profile photo URL in the response
      res.status(200).json({ profilePhoto: profilePhotoURL });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
}];



// Function to delete profile photo
exports.deleteProfilePhoto = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Fetch the customer from the database
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Get the profile photo path
    const profilePhotoPath = customer.profilePhoto;

    // If there is a profile photo, delete it from the file system
    if (profilePhotoPath) {
      const filePath = path.join(__dirname, '..', profilePhotoPath);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting profile photo:', err);
        }
      });
    }

    // Update the customer's profile photo to an empty string
    customer.profilePhoto = '';
    await customer.save();

    res.status(200).json({ message: 'Profile photo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check if email exists
exports.checkEmailExists = async (req, res) => {
  try {
    const { email } = req.params;
    const existingCustomer = await Customer.findOne({ email });
    res.status(200).json(existingCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//check if contact number already exist
exports.checkContactNumberExists = async (req, res) => {
  try {
    const { contactNumber } = req.params;
    const existingCustomer = await Customer.findOne({ contactNumbers: contactNumber });
    res.status(200).json(existingCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
};

// Map to store OTPs for each email
const otpMap = new Map();

// Function to send OTP to email
exports.generateAndSendOTP = async (req, res) => {
  const { email } = req.body;

  // Generate OTP
  const otp = generateOTP();

  // Store OTP in the map
  otpMap.set(email, otp);

  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL, // Gmail email address
      pass: process.env.PASSWORD, // app-specific password
    },
  });

  // Email content
  const mailOptions = {
    from: 'petzonemanagement@gmail.com', // Sender address
    to: email, // Recipient address
    subject: 'Password Reset OTP', // Email subject
    text: `Your OTP for password reset is: ${otp}`, // Email body
  };

  // Send OTP to the email address
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};


// Function to verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Retrieve the stored OTP for the given email
    const storedOTP = otpMap.get(email);

    // Check if the provided OTP matches the stored OTP
    if (storedOTP && otp === storedOTP.toString()) { // Convert otp to string for comparison
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      // Invalid OTP
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// exports.changePassword = async (req, res) => {
//   const { email, newPassword } = req.body;

//   try {
//     // Find the user by email
//     const user = await Customer.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password in the database
//     user.password = hashedPassword;
//     await user.save();

//     return res.status(200).json({ message: 'Password changed successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };
// exports.changePassword = async (req, res) => {
//   const { email, newPassword, confirmPassword } = req.body;

//   try {
//     // Find the user by email
//     const user = await Customer.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if newPassword and confirmPassword match
//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ message: 'New password and confirm password should be the same' });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password in the database
//     user.password = hashedPassword;
//     await user.save();

//     return res.status(200).json({ message: 'Password changed successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };
exports.changePassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    // Find the user by email
    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password should be the same' });
    }

    // Validate the new password against the schema
    if (!schema.validate(newPassword)) {
      return res.status(400).json({ message: 'Password does not meet the requirements' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};