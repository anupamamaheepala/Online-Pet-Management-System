const StaffLeave = require('../models/staffLeaveModel');

// Controller to handle adding a new staff leave entry
exports.addLeave = async (req, res) => {
  try {
    const { staffId, StleaveFromDate, StleaveToDate, StleaveType, streason } = req.body;

    const newLeave = new StaffLeave({
      staffId,
      StleaveFromDate,
      StleaveToDate,
      StleaveType,
      streason
    });

    await newLeave.save();
    res.status(201).json({ message: 'Staff leave added successfully', data: newLeave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller to handle getting all staff leave entries
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await StaffLeave.find();
    res.status(200).json(leaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller to handle approving a staff leave
exports.approveLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;

    // Update the leave status to 'approved' in the database
    await StaffLeave.findByIdAndUpdate(leaveId, { status: 'approved' });

    // Get the leave details
    const leave = await StaffLeave.findById(leaveId);

    // Send notification to the staff member (you can implement this part using email or any other notification mechanism)

    res.status(200).json({ message: 'Leave approved successfully', data: leave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.approveLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;

    // Update the leave status to 'approved' in the database
    const updatedLeave = await StaffLeave.findByIdAndUpdate(leaveId, { approved: true, status: 'Approved' }, { new: true });

    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json({ message: 'Leave approved successfully', data: updatedLeave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.disapproveLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { reason } = req.body;

    // Update the leave status to 'disapproved' in the database and store the reason
    const updatedLeave = await StaffLeave.findByIdAndUpdate(
      leaveId,
      { approved: false, status: 'Disapproved', disapprovalReason: reason },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json({ message: 'Leave disapproved successfully', data: updatedLeave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller to handle deleting a staff leave
exports.deleteLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;

    // Find the leave by ID and delete it
    const deletedLeave = await StaffLeave.findByIdAndDelete(leaveId);

    if (!deletedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json({ message: 'Leave deleted successfully', data: deletedLeave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Fetch leave details by ID
exports.getLeaveDetails = async (req, res) => {
  try {
    const leaveId = req.params.leaveId;
    const leaveDetails = await StaffLeave.findById(leaveId);
    res.status(200).json(leaveDetails);
  } catch (error) {
    console.error('Error fetching leave details:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller to handle fetching applied leaves for a specific staff member
exports.getAppliedLeaves = async (req, res) => {
  try {
    const { staffId } = req.params;
    const appliedLeaves = await StaffLeave.find({ staffId });
    res.status(200).json(appliedLeaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};