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



const trainingRoutes = require("./routes/trainingRoutes");

<<<<<<< HEAD
=======

>>>>>>> f9eaa4a4da6967e199568ff342cbd50357f94c45
const staffRoute = require("./routes/staffRoute");
const staffLeaveRoute = require("./routes/staffLeaveRoute");
const cardpayRoute = require("./routes/paymentRoute")
//middleware
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });


app.use(cors());
app.use(bodyParser.json());
//app.use('/api/register', registerRoute);

app.use("/ads", adsRoute);

app.use("/customer", customerRoute);
app.use("/payerinfo", payerinfoRoute);



app.use("/training", trainingRoutes);


app.use("/staff", staffRoute);
app.use("/cardpay", cardpayRoute)

app.use("/staffLeave", staffLeaveRoute);



app.use("/staff", staffRoute);




app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});

const port = process.env.PORT || 9000;
console.log(process.env.MONGO_URL);

/*app.use(req, res, next),() => {
  console.log(req.path, req.method)
  next()
}*/
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb Connection success!");
});

//const paymentrouter = require("./routes/paymentRoute.js")
//app.use("/paymentRoute",paymentrouter)
  
app.listen(port, () => {
  console.log(`Server started on port ${port},`);
});
