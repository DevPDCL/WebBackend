const express = require('express');
const { getSampleCollections, createSampleCollection, updateSampleCollectionStatus, searchSample } = require('../controllers/SampleCollectionController');
const sampleCollectionRouter = express.Router();

sampleCollectionRouter.get("/", getSampleCollections);
sampleCollectionRouter.post("/", createSampleCollection);
sampleCollectionRouter.patch("/:id/status", updateSampleCollectionStatus);
sampleCollectionRouter.get('/search', searchSample);
sampleCollectionRouter.get('/events', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;  
  
    try {
     
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
  
     
      const skip = (pageNum - 1) * limitNum;
  
     
      const events = await Event.find()
        .skip(skip)
        .limit(limitNum);
  
     
      const totalEvents = await Event.countDocuments();
  
     
      res.json({
        events,
        pagination: {
          totalEvents,
          currentPage: pageNum,
          totalPages: Math.ceil(totalEvents / limitNum),
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
module.exports = sampleCollectionRouter;