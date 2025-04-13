const express = require('express');
const router = express.Router();
const Flat = require('../models/Flat');

// GET: Retrieve 4 flat listings
router.get('/', async (req, res) => {
  try {
    const flats = await Flat.find().limit(4); 
    res.json(flats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flats' });
  }
});

// POST: Add a new flat
router.post('/', async (req, res) => {
  try {
    const newFlat = new Flat(req.body);
    const savedFlat = await newFlat.save();
    res.status(201).json(savedFlat);
  } catch (error) {
    res.status(400).json({ message: 'Error saving flat', error });
  }
});

module.exports = router;