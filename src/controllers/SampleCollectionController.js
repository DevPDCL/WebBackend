const createError = require("http-errors");
const SampleCollection = require("../models/SampleCollectionModel");
const { successResponse } = require("./ResponseController");

const getColorCode = (status) => {
  const colorCodes = {
    Submitted: "#ffffff",
    Processing: "#fef9c3",
    "On the way": "#dbeafe",
    Completed: "#dcfce7",
  };
  return colorCodes[status] || "#ffffff"; // Default to white if status is invalid
};
const searchSample = async (req, res) => {
  const { patientName } = req.query;  // Get the search query from the URL (e.g., /api/users/search?name=John)
  
  try {
    const users = await SampleCollection.find({
      patientName: { $regex: patientName, $options: 'i' },  // Perform case-insensitive search
    }).exec();
    
    return res.status(200).json(users);  // Send the search results
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
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
    const {
      vendor,
      patientName,
      location,
      phone,
      pickupTime,
      branchName,
      email,
    } = req.body;

    const status = "Submitted";
    const colorCode = getColorCode(status);

    // Create a new SampleCollection document
    const newSampleCollection = new SampleCollection({
      vendor,
      patientName,
      location,
      phone,
      pickupTime,
      branchName,
      email,
      status,
      colorCode,
    });
    await newSampleCollection.save();

    successResponse(res, {
      statusCode: 201,
      message: "Sample collection saved successfully",
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

    // Validate the status
    const validStatuses = [
      "Submitted",
      "Processing",
      "On the way",
      "Completed",
    ];
    if (!validStatuses.includes(status)) {
      return next(createError(400, "Invalid status value"));
    }

    const colorCode = getColorCode(status);

    const updatedSampleCollection = await SampleCollection.findByIdAndUpdate(
      id,
      { status, colorCode },
      { new: true }
    );

    if (!updatedSampleCollection) {
      return next(createError(404, "Sample collection not found"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Sample collection status updated successfully",
      payload: { updatedSampleCollection },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSampleCollections,
  createSampleCollection,
  updateSampleCollectionStatus,
  searchSample
};
