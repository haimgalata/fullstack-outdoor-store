// File: client/src/components/Cart.jsx
import React from 'react';

// Cart component displays the shopping cart contents.
// Shows when isCartOpen is true; otherwise returns null (hidden).
// Props:
// - cart: array of { product, quantity }
// - removeFromCart: function to remove a product by id
// - onQuantityChange: function to update quantity for a product
// - isCartOpen: boolean to toggle cart visibility
// - toggleCart: function to open/close the cart UI
export default function Cart({ cart, removeFromCart, onQuantityChange, isCartOpen, toggleCart }) {
  if (!isCartOpen) return null; // Hide cart if closed

  // Calculate total price for all items in cart
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="cart-container">
      {/* Close button for cart */}
      <button className="btn-close float-end" aria-label="Close" onClick={toggleCart}></button>

      <h5>Shopping Cart</h5>

      {/* Empty cart message */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        // List all products in cart
        cart.map(({ product, quantity }) => (
          <div key={product._id} className="d-flex align-items-center mb-3">
            {/* Product image */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="cart-product-img"
            />
            <div className="flex-grow-1 ms-3">
              {/* Product name */}
              <h6>{product.name}</h6>

              {/* Quantity controls */}
              <div>
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => onQuantityChange(product._id, quantity - 1)}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="btn btn-sm btn-outline-secondary ms-2"
                  onClick={() => onQuantityChange(product._id, quantity + 1)}
                >
                  +
                </button>
              </div>

              {/* Price per unit */}
              <p>Price/unit: ₪{product.price.toFixed(2)}</p>
              {/* Total price for this product (unit price * quantity) */}
              <p>Total: ₪{(product.price * quantity).toFixed(2)}</p>

              {/* Remove product button */}
              <button
                className="btn btn-sm btn-danger mt-2"
                onClick={() => removeFromCart(product._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <hr />

      {/* Total cart price */}
      <h6>Total: ₪{totalPrice.toFixed(2)}</h6>

      {/* Place order button navigates to checkout page */}
      <button
        className="btn btn-primary w-100"
        onClick={() => {
          toggleCart();
          window.location.href = '/checkout';
        }}
      >
        Place Order
      </button>
    </div>
  );
}
