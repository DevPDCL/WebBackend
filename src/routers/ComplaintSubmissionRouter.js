const express = require('express');
const { getComplaints, createComplaint } = require('../controllers/ComplaintSubmissionController');
const complaintRouter = express.Router();

complaintRouter.get("/", getComplaints);
complaintRouter.post("/", createComplaint);

module.exports = complaintRouter;