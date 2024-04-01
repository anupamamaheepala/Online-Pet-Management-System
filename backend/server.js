const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors'); 
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();
const dbconfig = require("./config/dbconfig");
app.use(express.json());
//const userRoute = require("./routes/userRoute"); 

app.use(cors()); 
app.use(bodyParser.json());
//app.use('/api/user', userRoute);

const port = process.env.PORT || 9000;
console.log(process.env.MONGO_URL)

/*app.use(req, res, next),() => {
  console.log(req.path, req.method)
  next()
}*/
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongodb Connection success!");
})

//const paymentrouter = require("./routes/paymentRoute.js")
//app.use("/paymentRoute",paymentrouter)
  
app.listen(port, () => {
  console.log(`Server started on port ${port},`);
});


