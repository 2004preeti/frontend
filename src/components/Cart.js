import React from 'react';
import './Cart.css';

const Cart = ({ cart, onRemoveFromCart, onCheckout }) => {
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="section-header">
        <h2>Shopping Cart</h2>
        <p>Review your items</p>
      </div>

      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.productId._id} className="cart-item">
            <div className="item-image">
              <div className="item-icon">{item.productId.image}</div>
            </div>

            <div className="item-details">
              <h4 className="item-name">{item.productId.name}</h4>
              <p className="item-description">{item.productId.description}</p>
              <div className="item-meta">
                <span className="item-price">${item.productId.price}</span>
                <span className="item-quantity">Qty: {item.quantity}</span>
              </div>
            </div>

            <div className="item-actions">
              <div className="item-total">
                ${(item.productId.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => onRemoveFromCart(item.productId._id)}
                className="remove-btn"
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${cart.total}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${cart.total}</span>
        </div>

        <button onClick={onCheckout} className="checkout-btn">
          🛍️ Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
