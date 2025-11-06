import React from 'react';
import { getImageUrl } from '../services/api';
import './ProductGrid.css';

const ProductGrid = ({ products, onAddToCart }) => {
  // Check if the image is an emoji or a URL
  const isEmoji = (str) => {
    return str && str.length <= 3 && /\p{Emoji}/u.test(str);
  };

  return (
    <div className="product-grid-container">
      <div className="section-header">
        <h2>Featured Products</h2>
        <p>Discover our amazing collection</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              {isEmoji(product.image) ? (
                // ✅ Emoji display karein
                <div className="product-icon">{product.image}</div>
              ) : (
                // ✅ Image URL display karein
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  onError={(e) => {
                    // Agar image load nahi hoti toh emoji show karein
                    e.target.style.display = 'none';
                    const iconDiv = document.createElement('div');
                    iconDiv.className = 'product-icon';
                    iconDiv.textContent = '📦';
                    e.target.parentNode.appendChild(iconDiv);
                  }}
                />
              )}
              <div className="product-overlay">
                <button
                  onClick={() => onAddToCart(product._id, 1)}
                  className="quick-add-btn"
                >
                  + Add to Cart
                </button>
              </div>
            </div>

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price}</span>
                <button
                  onClick={() => onAddToCart(product._id, 1)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
