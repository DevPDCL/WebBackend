const express = require('express');
const { getSampleCollections, createSampleCollection, updateSampleCollectionStatus } = require('../controllers/SampleCollectionController');
const sampleCollectionRouter = express.Router();

sampleCollectionRouter.get("/", getSampleCollections);
sampleCollectionRouter.post("/", createSampleCollection);
sampleCollectionRouter.patch("/:id/status", updateSampleCollectionStatus);

module.exports = sampleCollectionRouter;