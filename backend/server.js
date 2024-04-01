const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors'); 
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();
const dbconfig = require("./config/dbconfig");
app.use(express.json());
//const registerRoute = require('./routes/registerRoute');


app.use(cors()); 
app.use(bodyParser.json());
//app.use('/api/register', registerRoute);

const port = process.env.PORT || 9000;
console.log(process.env.MONGO_URL)

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongodb Connection success!");
})

app.listen(port, () => {
  console.log(`Server started on port ${port},`);
});


