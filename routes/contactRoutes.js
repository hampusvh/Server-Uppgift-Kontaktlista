const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ message: 'Error creating contact', error: error.message });
    }
});

module.exports = router;