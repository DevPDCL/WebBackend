const express = require('express');
const { getSampleCollections, createSampleCollection, updateSampleCollectionStatus, searchSample } = require('../controllers/SampleCollectionController');
const sampleCollectionRouter = express.Router();

sampleCollectionRouter.get("/", getSampleCollections);
sampleCollectionRouter.post("/", createSampleCollection);
sampleCollectionRouter.patch("/:id/status", updateSampleCollectionStatus);
sampleCollectionRouter.get('/search', searchSample);

module.exports = sampleCollectionRouter;