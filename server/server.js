// File: Server/server.js

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const seedProducts = [
  {
    name: 'Hiking Backpack',
    description: 'Durable and spacious backpack for all your outdoor adventures.',
    price: 79.99,
    imageUrl: '/HikingBackpack.jpg',
  },
  {
    name: 'Camping Tent',
    description: 'Lightweight and easy-to-setup 2-person tent.',
    price: 129.99,
    imageUrl: '/CampingTent.jpg',
  },
  {
    name: 'Sleeping Bag',
    description: 'Warm and comfortable sleeping bag for cold nights.',
    price: 59.99,
    imageUrl: '/SleepingBag.jpg',
  },
  {
    name: 'Camping Stove',
    description: 'Compact gas stove for easy outdoor cooking.',
    price: 39.99,
    imageUrl: '/CampingStove.jpg',
  },
  {
    name: 'Hiking Boots',
    description: 'Waterproof boots with strong grip for tough terrain.',
    price: 99.99,
    imageUrl: '/HikingBoots.jpg',
  },
  {
    name: 'Headlamp',
    description: 'Bright LED headlamp with long battery life.',
    price: 24.99,
    imageUrl: '/Headlamp.jpg',
  },
  {
    name: 'Water Bottle',
    description: '1-liter stainless steel bottle to keep drinks cool.',
    price: 14.99,
    imageUrl: '/WaterBottle.jpg',
  },
  {
    name: 'Outdoor Jacket',
    description: 'Windproof and waterproof jacket for all seasons.',
    price: 119.99,
    imageUrl: '/OutdoorJacket.jpg',
  },
  {
    name: 'First Aid Kit',
    description: 'Compact kit with all basic emergency items.',
    price: 19.99,
    imageUrl: '/FirstAidKit.jpg',
  },
];

const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

const app = express();

app.use(cors());            // Enable Cross-Origin Resource Sharing (allow client requests)
app.use(express.json());    // Parse incoming JSON requests

// Connect to MongoDB using URI from .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Seed products if DB is empty
mongoose.connection.once('open', async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(seedProducts);
      console.log('✅ Seed products loaded');
    }
  } catch (err) {
    console.error('❌ Error seeding products:', err);
  }
});

// Setup routes for products and orders API endpoints
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('🌲 Outdoor Adventure Shop API is running');
});

// Start the server on specified port (default 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
