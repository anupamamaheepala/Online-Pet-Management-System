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

exports.getStep = async (req, res) =>{
    try{
        const step = await Steps.find();
        res.json(step);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Server error"})
    }
};
exports.getStepId = async (req, res) => {
    try {
        // Fetch the step from the database by ID
        const step = await Steps.findById(req.params.id);
        if (!step) {
            return res.status(404).json({ message: 'step not found' });
        }
        res.json(step);
    } catch (error) {
        console.error('Error fetching step details:', error); // Log the error message
        res.status(500).json({ message: 'Internal Server Error' }); // Send a generic error message
    }
};

exports.editstep =  async (req, res) => {
    try {
        // Fetch the step from the database by ID
        const step = await Steps.findById(req.params.id);
        if (!step) {
            return res.status(404).json({ message: 'step not found' });
        }

        // Update the step fields based on the request body
        step.itemName = req.body.step;
        step.category = req.body.name;
        step.price = req.body.description;
        step.quantity = req.body.title;
        step.quantity = req.body.contact;

        // Check if a new image is uploaded
        if (req.file) {
            step.filePath = req.file.path;
        }

        // Save the updated step to the database
        const updatedstep = await step.save();
        res.json(updatedstep);
    } catch (error) {
        console.error('Error updating step:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
