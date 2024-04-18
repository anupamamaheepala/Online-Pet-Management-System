const express = require("express");

//import AllOrders from './../frontend/src/pages/AllOrders';


const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const dbconfig = require("./config/dbconfig");
app.use(express.json());
app.use('/uploads', express.static('uploads'));



// Importing route handlers for various endpoints

const adsRoute = require("./routes/adverisementRoute");
const customerRoute = require("./routes/registerRoute");
const payerinfoRoute = require("./routes/paymentRoute");
const trainingRoutes = require("./routes/training.routes");
const staffRoute = require("./routes/staffRoute");
const staffLeaveRoute = require("./routes/staffLeaveRoute");
const cardpayRoute = require("./routes/cardpayRoute");
const makeAppointmentRoute = require('./routes/MakeAppointmentRoute');
const banktransRoute = require("./routes/banktransRoute");
const feedbacks = require('./routes/feedbackroute');
const feedbackinquiry = require('./routes/feedbackinquiryRoute');
const orderRoute = require("./routes/orderRoute");
const productRoutes = require('./routes/products');
const uploadRoute =require("./routes/uploadRoute");
const salaryRoute =require("./routes/salaryRoute");
const productsRouter = require('./routes/products');
const stepRoutes = require('./routes/stepRoute');

const petRoute = require("./routes/petRoute"); 



//const appointmentRoutes = require("./routes/MakeAppointmentRoute");
//const staffRoute = require("./routes/staffRoute");
//const staffLeaveRoute = require("./routes/staffLeaveRoute");
//const cardpayRoute = require("./routes/cardpayRoute");
//const makeAppointmentRoute = require ("./routes/MakeAppointmentRoute");

const banktransadminRoute = require('./routes/banktransadminRoute');




app.use(cors());
app.use(bodyParser.json());

// Mounting routes for various endpoints
app.use("/confirmedads", adsRoute);
app.use("/uploads" ,uploadRoute);
app.use("/ads", adsRoute);
app.use("/customer", customerRoute);
app.use("/payerinfo", payerinfoRoute);
app.use("/training", trainingRoutes);
app.use("/staff", staffRoute);
app.use("/cardpay", cardpayRoute)
app.use("/staffLeave", staffLeaveRoute);
app.use("/banktrans", banktransRoute);
app.use("/feedback", feedbacks);
app.use("/feedbackinquiry", feedbackinquiry);
app.use('/appointment', makeAppointmentRoute);
app.use("/orders", orderRoute);
app.use('/products', productRoutes);

app.use("/step",stepRoutes );

app.use('/pets', petRoute);



app.use('/salary', salaryRoute);
//app.use('/banktransadmin', banktransadminRoute);


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

  

