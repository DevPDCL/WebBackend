const express = require('express');
const { getComplaints, createComplaint, updateComplaintStatus } = require('../controllers/ComplaintSubmissionController');
const complaintRouter = express.Router();

complaintRouter.get("/", getComplaints);
complaintRouter.post("/", createComplaint);
complaintRouter.patch("/:id/status", updateComplaintStatus);

module.exports = complaintRouter;