const Steps = require("../models/stepModel");

exports.addStep = async (req, res) => {
    try {
        const { 
            step,
            name,
            title, 
            description,
            contact, 
        } = req.body;

        let filePath = null;
        if(req.file){
            filePath = req.file.path;
        }
        const newStep = new Steps({
            step,
            name,
            title,
            description,
            filePath,
            contact,
            // Assuming you're using multer for file uploads
        });
        await newStep.save();
        res.status(201).json({ message: 'Step added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
/*
exports.getStep = async (req, res) =>{
    try{
        const step = await Steps.find();
        res.json(step);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Server error"})
    }
};
*/