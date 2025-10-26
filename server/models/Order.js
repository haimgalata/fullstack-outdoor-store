// File: Server/models/Order.js

const mongoose = require('mongoose');

// Define the schema for an order in the database
const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to the Product model
      quantity: { type: Number, required: true, min: 1 },                 // Must order at least 1
      price: Number,                                                      // Price at the time of order
    },
  ],
  customerName: { type: String, required: true },                         // Full name of the customer
  customerEmail: { type: String, required: true },                        // Email for contact/confirmation
  customerPhone: String,                                                 // Optional phone number
  shippingAddress: String,                                               // Delivery address
  shippingMethod: String,                                                // Chosen delivery option
  totalPrice: Number,                                                    // Total price including shipping
  createdAt: { type: Date, default: Date.now },                          // Timestamp of order
});

// Export the Order model for use in the server
module.exports = mongoose.model('Order', orderSchema);
