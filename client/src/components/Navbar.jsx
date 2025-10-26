// File: client/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Navbar component displayed on all pages at the top.
// Contains logo, link to home page, checkout button, and cart toggle with count and total price.

export default function Navbar({ cartCount, totalPrice, toggleCart, onSearch }) {
  const navigate = useNavigate();
  const location = useLocation(); // Used to determine current page for search bar

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      {/* Brand logo linking to home page */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src="/adventure.jpg" alt="Logo" className="navbar-logo" />
        Outdoor Adventure Shop
      </Link>

      {/* Show search bar only on home page ("/") */}
      {location.pathname === '/' && (
        <form className="d-flex mx-3" role="search" onSubmit={e => e.preventDefault()}>
          {/* Search input calls onSearch on change */}
          <input
            className="form-control"
            type="search"
            placeholder="Search products..."
            aria-label="Search"
            onChange={e => onSearch(e.target.value)}
          />
        </form>
      )}

      {/* Right side buttons */}
      <div className="ms-auto d-flex align-items-center">
        {/* Checkout button navigates to /checkout */}
        <button
          className="btn btn-outline-light me-3"
          onClick={() => navigate('/checkout')}
          type="button"
        >
          Checkout
        </button>

        {/* Cart toggle button shows item count and total price */}
        <button
          className="btn btn-light position-relative"
          onClick={toggleCart}
          aria-label="Toggle cart"
          type="button"
        >
          🛒
          <span className="badge bg-danger ms-1">
            {cartCount} | ₪{totalPrice.toFixed(2)}
          </span>
        </button>
      </div>
    </nav>
  );
}
