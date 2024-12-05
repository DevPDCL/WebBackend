const express = require('express');
const { getComplaints, createComplaint, updateComplaintStatus, searchUsers } = require('../controllers/ComplaintSubmissionController');
const complaintRouter = express.Router();

complaintRouter.get("/", getComplaints);
complaintRouter.post("/", createComplaint);
complaintRouter.patch("/:id/status", updateComplaintStatus);
complaintRouter.get('/search', searchUsers);
complaintRouter.get('/events', async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      
      if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
  
      const events = await Event.find({
        date: { $gte: start, $lte: end }
      });
  
      res.json(events);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
module.exports = complaintRouter;