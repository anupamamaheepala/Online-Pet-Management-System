const express = require("express");
const cors = require('cors'); 
const app = express();
require('dotenv').config();
const dbconfig = require("./config/dbconfig");
app.use(express.json());


app.use(cors()); 

//app.use('/api/user', userRoute);

const port = process.env.PORT || 9000;

console.log(process.env.MONGO_URL)

app.listen(port, () => {
  console.log(`Server started on port ${port},`);
});


