const createError = require("http-errors");
const ComplaintSubmission = require("../models/ComplaintSubmissionModel");
const { successResponse } = require("./ResponseController");

const getColorCode = (status) => {
  const colorCodes = {
    Submitted: "#ffffff",
    Processing: "#fef9c3",
    "Customer Reply": "#dbeafe",
    Completed: "#dcfce7",
  };
  return colorCodes[status] || "#ffffff"; // Default to white if status is invalid
};

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

    const status = "Submitted"; // Initial status
    const colorCode = getColorCode(status);

    // Create a new ComplaintSubmission document
    const newComplaint = new ComplaintSubmission({
      name,
      email,
      phone,
      branch,
      date,
      complain,
      status,
      colorCode,
    });
    await newComplaint.save();

    successResponse(res, {
      statusCode: 201,
      message: "Complaint saved successfully",
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
    const validStatuses = [
      "Submitted",
      "Processing",
      "Customer Reply",
      "Completed",
    ];
    if (!validStatuses.includes(status)) {
      return next(createError(400, "Invalid status value"));
    }

    const colorCode = getColorCode(status);

    const updatedComplaint = await ComplaintSubmission.findByIdAndUpdate(
      id,
      { status, colorCode },
      { new: true }
    );

    if (!updatedComplaint) {
      return next(createError(404, "Complaint not found"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Complaint status updated successfully",
      payload: { updatedComplaint },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getComplaints, createComplaint, updateComplaintStatus };
