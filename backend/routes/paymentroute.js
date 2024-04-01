const router = require("express").Router();
let paymentRoute = require("../models/paymentModel");

router.route("/add").post((req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;

    const newpayer = new paymentModel({
        name,
        email,
        phonenumber,
        address
    })

    newStudent.save().then(() =>{
        res.json("payer information added")
    }).catch((err) => {
        console.log(err);
    })

})