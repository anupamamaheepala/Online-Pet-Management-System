const AddsSchema = require("../models/advertisementModel")


//add a single income
exports.formData = async (req, res) => {
    //destructuring request body into its components
    const {ownerName, email, title, Breed, purpose, description, price, contact} = req.body
   
    //storing all of these values from the request body into the income variable
    const income = AddsSchema({
        ownerName, 
        email, 
        title, 
        Breed, 
        purpose, 
        description, 
        price, 
        contact
    })

    
    //validations 
    try {
        
        if(!ownerName || !email || !title || !Breed || !purpose || !description || !price || !contact){
            return res.status(400).json({message: 'All fields are required!'})
        }
        
        //saving data into the database
        await income.save()
        res.status(200).json({message: 'Add added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    
}
// //get all incomes
// exports.getIncomes = async (req, res) => {
//     try {
//         //finding all incomes, showing the last income entered first
//         const incomes = await IncomeSchema.find().sort({createdAt: -1})
//         res.status(200).json(incomes)
//     } catch (error) {
//         res.status(500).json({message:'Server Error'})
//     }

// }

// //get a single income
// exports.getIncome = async(req, res) => {
//     try {
//         //finding a single income
//         const {id} = req.params;
//         const income = await IncomeSchema.findById(id);
//         res.status(200).json(income);

//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// }
// //update income
// exports.updateIncome = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const income = await IncomeSchema.findByIdAndUpdate(id, req.body);
//         //if income cannot be found
//         if(!income){
//             return res.status(404).json({message: Income with ID ${id} cannot be found})
//         }
//         const updatedIncome = await IncomeSchema.findById(id);
//         res.status(200).json(updatedIncome);
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// }

// //delete a single income
// exports.deleteIncome = async (req, res) => {
//     //storing object id from the req parameters
//     const {id} = req.params;
    
//     //finding and deleting said item from database
//     IncomeSchema.findByIdAndDelete(id).then((income) => {
//         res.status(200).json({message: 'Income has been deleted'})
//     })
//     .catch((err) => {
//         res.status(500).json({message: 'Server Error'})
//     })

// }