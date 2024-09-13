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
    const { name, email, phone, complain } = req.body;

    // Create a new ComplaintSubmission document
    const newComplaint = new ComplaintSubmission({ name, email, phone, complain });
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

module.exports = { getComplaints, createComplaint };