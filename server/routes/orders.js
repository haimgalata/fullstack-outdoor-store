// File: Server/routes/orders.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Handle POST request to create a new order
router.post('/', async (req, res) => {
  const {
    items,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    shippingMethod,
  } = req.body;

  // Check for required fields
  if (!items || items.length === 0 || !customerName || !customerEmail) {
    return res.status(400).json({ message: 'Missing required order fields' });
  }

  // Calculate total price based on item prices and quantities
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  try {
    // Create new order object
    const order = new Order({
      items,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingMethod,
      totalPrice,
    });

    // Save the order to the database
    await order.save();

    // Respond with success and order ID
    res.status(201).json({
      message: 'Order received successfully',
      orderId: order._id,
    });
  } catch (err) {
    // Handle error during save
    res.status(500).json({ message: 'Error saving the order' });
  }
});

module.exports = router;
