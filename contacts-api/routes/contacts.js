const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); 

/**
 * @swagger
 * /contacts:
 * get:
 * tags:
 * - Contacts
 * summary: Returns a list of all contacts.
 * responses:
 * 200:
 * description: A list of contacts.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/definitions/Contact'
 * 500:
 * description: Server error.
 */
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contacts', error: err.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 * get:
 * tags:
 * - Contacts
 * summary: Returns a specific contact by ID.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The ID of the contact to retrieve.
 * responses:
 * 200:
 * description: The contact object returned.
 * content:
 * application/json:
 * schema:
 * $ref: '#/definitions/Contact'
 * 404:
 * description: Contact not found.
 * 500:
 * description: Server error or invalid ID format.
 */
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json(contact);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /contacts:
 * post:
 * tags:
 * - Contacts
 * summary: Creates a new contact.
 * description: All fields (firstName, lastName, email, favoriteColor, birthday) are required.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/definitions/Contact'
 * responses:
 * 201:
 * description: Contact created successfully. Returns the new ID.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id: { type: string, example: "60c72b2f90a1f00015b67a21" }
 * 400:
 * description: Required field missing (Validation Error).
 * 500:
 * description: Server error.
 */
router.post('/', async (req, res) => {

  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const contact = new Contact({ firstName, lastName, email, favoriteColor, birthday });

  try {
    const newContact = await contact.save();
    res.status(201).json({ id: newContact._id }); 
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Failed to create contact', error: err.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 * put:
 * tags:
 * - Contacts
 * summary: Updates an existing contact by ID (replaces the entire document).
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The ID of the contact to modify.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/definitions/Contact'
 * responses:
 * 204:
 * description: Contact updated successfully. 
 * 404:
 * description: Contact not found.
 * 400:
 * description: Validation Error (e.g., missing required field in body).
 * 500:
 * description: Server error or invalid ID format.
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send(); 
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }
    res.status(500).json({ message: 'Failed to update contact', error: err.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 * delete:
 * tags:
 * - Contacts
 * summary: Deletes a contact by ID.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The ID of the contact to delete.
 * responses:
 * 200:
 * description: Contact deleted successfully. 
 * 404:
 * description: Contact not found.
 * 500:
 * description: Server error or invalid ID format.
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await Contact.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }
    res.status(500).json({ message: 'Failed to delete contact', error: err.message });
  }
});

module.exports = router;