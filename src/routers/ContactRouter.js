const express = require ('express');
const { getContact, createContact } = require('../controllers/ContactController');
const contactRouter = express.Router();

contactRouter.get("/", getContact);
contactRouter.post('/', createContact);

module.exports = contactRouter;