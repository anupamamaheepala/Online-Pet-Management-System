const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const dbconfig = require("./config/dbconfig");
app.use(express.json());


//const registerRoute = require('./routes/registerRoute');
//const userRoute = require("./routes/userRoute");

const adsRoute = require("./routes/adverisementRoute");
const customerRoute = require("./routes/registerRoute");
const payerinfoRoute = require("./routes/paymentRoute");
const trainingRoutes = require("./routes/training.routes");

const staffRoute = require("./routes/staffRoute");
const staffLeaveRoute = require("./routes/staffLeaveRoute");
const cardpayRoute = require("./routes/cardpayRoute");
const makeAppointmentRoute = require ("./routes/MakeAppointmentRoute");
const banktransRoute = require("./routes/banktransRoute");


//middleware
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });
 

app.use(cors());
app.use(bodyParser.json());




//app.use('/api/register', registerRoute);

app.use("/ads", adsRoute);
app.use('/api', makeAppointmentRoute);
app.use("/customer", customerRoute);
app.use("/payerinfo", payerinfoRoute);
app.use("/training", trainingRoutes);
app.use("/staff", staffRoute);
app.use("/cardpay", cardpayRoute);
app.use("/staffLeave", staffLeaveRoute);
app.use("/banktrans", banktransRoute);


app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});

const port = process.env.PORT || 9000;
console.log(process.env.MONGO_URL);

/*app.use(req, res, next),() => {
  console.log(req.path, req.method)
  next()
}*/


//const paymentrouter = require("./routes/paymentRoute.js")
//app.use("/paymentRoute",paymentrouter)
  
app.listen(port, () => {
  console.log(`Server started on port ${port},`);
});
