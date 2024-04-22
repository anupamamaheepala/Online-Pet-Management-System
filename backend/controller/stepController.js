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



exports.editstep = async (req, res) => {
    try {
        // Update the step fields based on the request body
        const updatedStep = {
            step: req.body.step, // Use 'step' instead of 'itemName'
            name: req.body.name, // Use 'name' instead of 'category'
            title: req.body.title, // Use 'title' instead of 'quantity'
            description: req.body.description, // Use 'description' instead of 'price'
            contact: req.body.contact // Keep 'contact' as it is
        };

        const step = await Steps.findByIdAndUpdate(
            req.params.id,
            updatedStep,
            { new: true }
        );

        if (!step) {
            return res.status(404).json({ message: 'Step not found' });
        }

        // Check if a new image is uploaded
        if (req.file) {
            step.filePath = req.file.path;
        }

        // Save the updated step to the database
        await step.save();

        res.json(step);
    } catch (error) {
        console.error('Error updating step:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.deletesteps = async (req, res) => {
    try {
        const step = await Steps.findByIdAndDelete(req.params.id);
        if (!step) {
            return res.status(404).json({ message: 'Step not found' });
        }
        res.json({ message: 'Step deleted successfully' });
    } catch (error) {
        console.error('Error deleting step:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
