import React, { useState } from 'react';
import './CheckoutForm.css';

const CheckoutForm = ({ cart, onCheckout, onClose }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckout(cart.items, customerInfo);
  };

  const handleChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="checkout-modal">
      <div className="checkout-content">
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button onClick={onClose} className="close-btn">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h3>Shipping Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group full-width">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your shipping address"
                />
              </div>

              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={customerInfo.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter your city"
                />
              </div>

              <div className="form-group">
                <label>ZIP Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={customerInfo.zipCode}
                  onChange={handleChange}
                  required
                  placeholder="Enter ZIP code"
                />
              </div>
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.items.map((item) => (
              <div key={item.productId._id} className="order-item">
                <span>
                  {item.productId.name} × {item.quantity}
                </span>
                <span>
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="order-total">
              <span>Total:</span>
              <span>${cart.total}</span>
            </div>
          </div>

          <div className="checkout-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-order-btn">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
