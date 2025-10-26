// File: Server/routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Handle GET request to fetch all products from the database
router.get('/', async (req, res) => {
  try {
    // Get all products from MongoDB
    const products = await Product.find();

    // Send the products to the client
    res.json(products);
  } catch (err) {
    // Handle server/database error
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

module.exports = router;
