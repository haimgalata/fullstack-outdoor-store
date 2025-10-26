// File: client/src/pages/Home.jsx
import React from 'react';
import Cart from '../components/Cart';

// Home component: displays product grid and floating cart component
export default function Home({
  products,          // Array of product objects to display
  addToCart,         // Function to add a product to cart
  cart,              // Current cart state (array of {product, quantity})
  removeFromCart,    // Function to remove a product from cart
  onQuantityChange,  // Function to update quantity of a product in cart
  isCartOpen,        // Boolean flag if cart UI is open or closed
  toggleCart,        // Function to toggle the cart UI visibility
}) {
  return (
    <div className="container mt-4">
      {/* Floating shopping cart component; visibility controlled via isCartOpen */}
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        onQuantityChange={onQuantityChange}
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
      />

      {/* Responsive 3x3 product grid */}
      <div className="products-grid">
        {/* Show up to 9 products */}
        {products.slice(0, 9).map((product) => (
          <div className="card h-100" key={product._id}>
            {/* Product image */}
            <img
              src={product.imageUrl}
              className="card-img-top img-fluid"
              alt={product.name}
            />
            {/* Product info and action */}
            <div className="card-body d-flex flex-column">
              {/* Product name */}
              <h5 className="card-title">{product.name}</h5>
              {/* Product short description; grows to fill vertical space */}
              <p className="card-text flex-grow-1">{product.description}</p>
              {/* Product price in bold */}
              <p className="card-text fw-bold">₪{product.price.toFixed(2)}</p>
              {/* Add to Cart button, placed at bottom via mt-auto */}
              <button
                className="btn btn-primary mt-auto"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
