// File: Server/models/Product.js

const mongoose = require('mongoose');

// Define the schema for a product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Product name (required)
  description: String,                          // Short description (optional)
  price: { type: Number, required: true },      // Product price (required)
  imageUrl: String,                             // URL to product image
});

// Export the Product model to be used in routes or seeding
module.exports = mongoose.model('Product', productSchema);
