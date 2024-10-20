const createError = require("http-errors");
const SampleCollection = require("../models/SampleCollectionModel");
const { successResponse } = require("./ResponseController");

const getSampleCollections = async (req, res, next) => {
  try {
    const allSampleCollections = await SampleCollection.find();

    successResponse(res, {
      statusCode: 200,
      message: "Sample collections retrieved successfully",
      payload: { allSampleCollections },
    });
  } catch (error) {
    next(error);
  }
};

const createSampleCollection = async (req, res, next) => {
  try {
    const { vendor, patientName, location, phone, pickupTime, branchName, email } = req.body;

    // Create a new SampleCollection document
    const newSampleCollection = new SampleCollection({
      vendor,
      patientName,
      location,
      phone,
      pickupTime,
      branchName,
      email,
      status: 'Submitted'
    });
    await newSampleCollection.save();

    successResponse(res, {
      statusCode: 201,
      message: 'Sample collection saved successfully',
      payload: { newSampleCollection },
    });
  } catch (error) {
    next(error);
  }
};
const updateSampleCollectionStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedSampleCollection = await SampleCollection.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedSampleCollection) {
      return next(createError(404, 'Sample collection not found'));
    }

    successResponse(res, {
      statusCode: 200,
      message: 'Sample collection status updated successfully',
      payload: { updatedSampleCollection },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSampleCollections, createSampleCollection, updateSampleCollectionStatus };