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
// Controller to handle approving a staff leave
exports.approveLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;

    // Update the leave status to 'approved' in the database
    const updatedLeave = await StaffLeave.findByIdAndUpdate(leaveId, { approved: true }, { new: true });

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
