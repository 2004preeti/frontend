import React from 'react';
import './Header.css';

const Header = ({ cartItemCount, activeTab, setActiveTab }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>🛍️ Vibe Commerce</h1>
          
        </div>

        <nav className="navigation">
          <button
            className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            🏪 Products
          </button>

          <button
            className={`nav-btn cart-btn ${
              activeTab === 'cart' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('cart')}
          >
            🛒 Cart
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
