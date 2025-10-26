// File: client/src/components/Banner.jsx
import React from 'react';

// Banner component shows a main image with a welcome message and slogan.
// Used on homepage and visible on all pages below the navbar.
export default function Banner() {
  return (
    <div className="text-center my-4">
      {/* Main banner image with responsive styling */}
      <img
        src="mainPhoto.jpg"
        alt="Outdoor Adventure"
        className="img-fluid rounded banner-main-img"
      />
      {/* Welcome heading */}
      <h1 className="mt-3">Welcome to the Outdoor Adventure Shop!</h1>
      {/* Short slogan/description text */}
      <p>Your one-stop shop for all your outdoor adventure needs!</p>
    </div>
  );
}
