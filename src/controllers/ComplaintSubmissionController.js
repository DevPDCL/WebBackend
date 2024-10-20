const createError = require("http-errors");
const ComplaintSubmission = require("../models/ComplaintSubmissionModel");
const { successResponse } = require("./ResponseController");

const getComplaints = async (req, res, next) => {
  try {
    const allComplaints = await ComplaintSubmission.find();

    successResponse(res, {
      statusCode: 200,
      message: "Complaints retrieved successfully",
      payload: { allComplaints },
    });
  } catch (error) {
    next(error);
  }
};

const createComplaint = async (req, res, next) => {
  try {
    const { name, email, phone, branch, date, complain } = req.body;

    // Create a new ComplaintSubmission document
    const newComplaint = new ComplaintSubmission({ name, email, phone, branch, date, complain });
    await newComplaint.save();

    successResponse(res, {
      statusCode: 201,
      message: 'Complaint saved successfully',
      payload: { newComplaint },
    });
  } catch (error) {
    next(error);
  }
};

const updateComplaintStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

        // Validate the status
        const validStatuses = ['Submitted', 'Processing', 'Customer Reply', 'Completed'];
        if (!validStatuses.includes(status)) {
          return next(createError(400, 'Invalid status value'));
        }

    const updatedComplaint = await ComplaintSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return next(createError(404, 'Complaint not found'));
    }

    successResponse(res, {
      statusCode: 200,
      message: 'Complaint status updated successfully',
      payload: { updatedComplaint },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getComplaints, createComplaint, updateComplaintStatus };