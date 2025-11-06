import React from 'react';
import './Receipt.css';

const Receipt = ({ receipt, onClose }) => {
  return (
    <div className="receipt-modal">
      <div className="receipt-content">
        <div className="receipt-header">
          <div className="success-icon">✅</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase</p>
        </div>

        <div className="receipt-details">
          <div className="detail-row">
            <span>Order ID:</span>
            <span className="order-id">{receipt.orderId}</span>
          </div>

          <div className="detail-row">
            <span>Customer:</span>
            <span>{receipt.customerInfo.name}</span>
          </div>

          <div className="detail-row">
            <span>Email:</span>
            <span>{receipt.customerInfo.email}</span>
          </div>

          <div className="detail-row">
            <span>Order Date:</span>
            <span>{new Date(receipt.timestamp).toLocaleDateString()}</span>
          </div>

          <div className="detail-row">
            <span>Status:</span>
            <span className="status-completed">{receipt.status}</span>
          </div>
        </div>

        <div className="receipt-items">
          <h3>Order Items</h3>
          {receipt.items.map((item) => (
            <div key={item.productId._id} className="receipt-item">
              <div className="item-info">
                <span className="item-name">{item.productId.name}</span>
                <span className="item-quantity">Qty: {item.quantity}</span>
              </div>
              <span className="item-total">
                ${(item.productId.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="receipt-total">
          <div className="total-row">
            <span>Total Amount:</span>
            <span className="total-amount">${receipt.total}</span>
          </div>
        </div>

        <button onClick={onClose} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Receipt;
