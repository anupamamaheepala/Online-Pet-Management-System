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

<<<<<<< HEAD
const trainingRoute = require("./routes/trainingRoutes");
=======
>>>>>>> 107e76e766496eaca828fe0c4ab9fe20a22358d2

const trainingRoutes = require("./routes/trainingRoutes");


<<<<<<< HEAD
=======


>>>>>>> 107e76e766496eaca828fe0c4ab9fe20a22358d2
const staffRoute = require("./routes/staffRoute");
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

<<<<<<< HEAD
app.use("/training", trainingRoute);

app.use("/training", trainingRoutes);
=======

app.use("/training", trainingRoutes);


app.use("/staff", staffRoute);
app.use("/cardpay", cardpayRoute)
>>>>>>> 107e76e766496eaca828fe0c4ab9fe20a22358d2

app.use("/staff", staffRoute);


<<<<<<< HEAD

app.use("/staff", staffRoute);


=======

>>>>>>> 107e76e766496eaca828fe0c4ab9fe20a22358d2
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
