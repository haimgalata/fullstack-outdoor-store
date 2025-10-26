// File: client/src/pages/Checkout.jsx
import React, { useState } from 'react';

// Checkout page component
// Props:
// - cart: list of items in the cart (read-only here)
// - clearCart: function to empty the cart after order is placed
export default function Checkout({ cart, clearCart }) {
  // Customer info states
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');

  // Order status states
  const [orderStatus, setOrderStatus] = useState(null); // success, error or null
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  // Shipping cost options
  const shippingCosts = {
    standard: 0,
    express: 30,
  };

  // Calculate total price
  const itemsTotal = cart.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  const shippingCost = shippingCosts[shippingMethod] || 0;
  const totalPrice = itemsTotal + shippingCost;

  // Simple email format check
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !shippingMethod) {
      setError('All fields are required.');
      return;
    }

    if (!isValidEmail(customerEmail)) {
      setError('Invalid email address.');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    // Check quantity > 0
    if (cart.some(({ quantity }) => quantity < 1)) {
      setError('Quantity must be at least 1.');
      return;
    }

    // Prepare order data for server
    const items = cart.map(({ product, quantity }) => ({
      productId: product._id,
      price: product.price,
      quantity,
    }));

    try {
      // Send order to server
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress,
          shippingMethod,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderStatus('success');
        setOrderId(data.orderId);
        clearCart();
        setError(null);
      } else {
        setOrderStatus('error');
        setError(data.message || 'Order failed.');
      }
    } catch {
      setOrderStatus('error');
      setError('Network error. Try again.');
    }
  };

  // Show success message after order placed
  if (orderStatus === 'success') {
    return (
      <div className="container mt-5 text-center">
        <h2>Thank you for your order!</h2>
        <p>Your order ID: <strong>{orderId}</strong></p>
      </div>
    );
  }

  return (
    <div className="container checkout-container">
      <h2 className="mb-4 text-center">Checkout</h2>

      {/* Order summary */}
      <div className="mb-4">
        <h4>Order Summary</h4>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(({ product, quantity }) => (
            <div key={product._id} className="d-flex align-items-center mb-3">
              <img src={product.imageUrl} alt={product.name} className="checkout-product-img" />
              <div className="ms-3">
                <h6>{product.name}</h6>
                <p>Quantity: {quantity}</p>
                <p>Price: ₪{(product.price * quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
        <hr />
        <p><strong>Shipping:</strong> {shippingMethod} (Cost: ₪{shippingCost.toFixed(2)})</p>
        <h5>Total Price: ₪{totalPrice.toFixed(2)}</h5>
      </div>

      {/* Show error if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Customer info form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name *</label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email *</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone *</label>
          <input
            id="phone"
            type="tel"
            className="form-control"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Shipping Address *</label>
          <textarea
            id="address"
            className="form-control"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            rows={3}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="shippingMethod" className="form-label">Shipping Method *</label>
          <select
            id="shippingMethod"
            className="form-select"
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
            required
          >
            <option value="standard">Standard (free, 14 days)</option>
            <option value="express">Express (₪30, 3 days)</option>
            <option value="pickup">Pickup (free)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Place Order</button>
      </form>
    </div>
  );
}
