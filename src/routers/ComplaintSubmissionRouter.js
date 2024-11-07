const express = require('express');
const { getComplaints, createComplaint, updateComplaintStatus, searchUsers } = require('../controllers/ComplaintSubmissionController');
const complaintRouter = express.Router();

complaintRouter.get("/", getComplaints);
complaintRouter.post("/", createComplaint);
complaintRouter.patch("/:id/status", updateComplaintStatus);
complaintRouter.get('/search', searchUsers);
module.exports = complaintRouter;