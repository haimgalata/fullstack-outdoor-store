// File: client/src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Home from './pages/Home';
import Checkout from './pages/Checkout';

function App() {
  // State to hold all products fetched from the server
  const [products, setProducts] = useState([]);
  // State for search input (used to filter products)
  const [search, setSearch] = useState("");

  // Cart state initialized from localStorage if available (persistent cart)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // State to control cart visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch products once on component mount
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add product to cart or increase quantity if it already exists
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product._id === product._id);
      if (existing) {
        // Increase quantity by 1
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new product with quantity 1
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true); // Automatically open cart on add
  };

  // Remove product completely from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
  };

  // Change the quantity of a product in the cart (ignore invalid values)
  const onQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Toggle cart visibility open/close
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Clear the entire cart (used after order)
  const clearCart = () => setCart([]);

  // Filter products by search input (case-insensitive, by name or description)
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Router>
      {/* Navbar receives cart info and toggle function */}
      {/* Navbar receives cart info, toggle function, and search handler */}
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        totalPrice={cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}
        toggleCart={toggleCart}
        onSearch={setSearch} // Passes search handler to Navbar
      />
      {/* Banner shown on all pages */}
      <Banner />
      <Routes>
        <Route
          path="/"
          element={
            // Home receives filtered products according to search
            <Home
              products={filteredProducts}
              addToCart={addToCart}
              cart={cart}
              removeFromCart={removeFromCart}
              onQuantityChange={onQuantityChange}
              isCartOpen={isCartOpen}
              toggleCart={toggleCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} clearCart={clearCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
