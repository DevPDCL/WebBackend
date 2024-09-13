const createError = require("http-errors");
const Message = require("../models/ContactModel");
const { successResponse } = require("./ResponseController");

const getContact = async (req, res, next) => {
  try {
    const allMessages = await Message.find();

    successResponse(res, {
      statusCode: 200,
      message: " Messages returned successfully",
      payload: { allMessages },
    });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, email, mobile, message } = req.body; // Extract data from request body

    // Create a new Message document
    const newMessage = new Message({ name, email, mobile, message });
    await newMessage.save(); // Save to the database

    successResponse(res, {
      statusCode: 201, // Created status code
      message: 'Message saved successfully',
      payload: { newMessage },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getContact, createContact };
