const express = require('express');
const { getSampleCollections, createSampleCollection } = require('../controllers/SampleCollectionController');
const sampleCollectionRouter = express.Router();

sampleCollectionRouter.get("/", getSampleCollections);
sampleCollectionRouter.post("/", createSampleCollection);

module.exports = sampleCollectionRouter;