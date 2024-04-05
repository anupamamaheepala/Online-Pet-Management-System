const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const dbconfig = require("./config/dbconfig");
app.use(express.json());

// Importing route handlers for various endpoints

const adsRoute = require("./routes/adverisementRoute");
const customerRoute = require("./routes/registerRoute");
const payerinfoRoute = require("./routes/paymentRoute");
const trainingRoutes = require("./routes/training.routes");
const staffRoute = require("./routes/staffRoute");
const staffLeaveRoute = require("./routes/staffLeaveRoute");
const cardpayRoute = require("./routes/cardpayRoute");
const productRoute = require ("./routes/Productroutes");
const appointmentRoutes = require("./routes/MakeAppointmentRoute");
const banktransRoute = require("./routes/banktransRoute");
const feedbacks = require('./routes/feedbackroute');
const orderRoute = require("./routes/orderRoute");
//const appointmentRoutes = require("./routes/MakeAppointmentRoute");
//const staffRoute = require("./routes/staffRoute");
//const staffLeaveRoute = require("./routes/staffLeaveRoute");
//const cardpayRoute = require("./routes/cardpayRoute");
//const makeAppointmentRoute = require ("./routes/MakeAppointmentRoute");

app.use(cors());
app.use(bodyParser.json());

// Mounting routes for various endpoints

app.use("/ads", adsRoute);
app.use("/customer", customerRoute);
app.use("/payerinfo", payerinfoRoute);
app.use("/training", trainingRoutes);
app.use("/staff", staffRoute);
app.use("/cardpay", cardpayRoute)
app.use("/staffLeave", staffLeaveRoute);
app.use("/product", productRoute);
app.use("/banktrans", banktransRoute);
app.use("/feedback", feedbacks);
app.use("/appointment", appointmentRoutes);
app.use("/order", orderRoute);



// Route to handle requests to the root URL
app.get("/", (req, res) => {
// Respond with a JSON object containing a welcome message
  res.json({ mssg: "Welcome to the app" });
});

// Set the port for the server. If not defined, use 9000.
const port = process.env.PORT || 9000;

// Log the MongoDB URL from environment variables.
console.log(process.env.MONGO_URL);

// Start the server listening on the determined port.
app.listen(port, () => {
// Log a message indicating the server has started, including the port number.
  console.log(`Server started on port ${port},`);
});

  

