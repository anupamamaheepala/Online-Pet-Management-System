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

app.use(cors());
app.use(bodyParser.json());







app.use("/ads", adsRoute);
app.use("/customer", customerRoute);
app.use("/payerinfo", payerinfoRoute);

app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});

const port = process.env.PORT || 9000;
console.log(process.env.MONGO_URL);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb Connection success!");
});
  
app.listen(port, () => {
  console.log(`Server started on port ${port},`);
});
