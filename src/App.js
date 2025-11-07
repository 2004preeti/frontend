
import React, { useState, useEffect } from 'react';
import { productAPI, cartAPI } from './services/api';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import Receipt from './components/Receipt';
import Header from './components/Header';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('products');

  // Load products and cart on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Loading initial data...');

      await loadProducts();
      await loadCart();

      console.log('✅ Initial data loaded successfully');
    } catch (err) {
      console.error('❌ Error loading initial data:', err);
      setError(
        'Failed to connect to server. Please check if backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      console.log('🔄 Loading products...');
      const response = await productAPI.getProducts();
      setProducts(response.data);
      console.log(`✅ Loaded ${response.data.length} products`);
    } catch (error) {
      console.error('❌ Error loading products:', error);
      throw error;
    }
  };

  const loadCart = async () => {
    try {
      console.log('🔄 Loading cart...');
      const response = await cartAPI.getCart();
      setCart(response.data);
      console.log(`✅ Loaded cart with ${response.data.items.length} items`);
    } catch (error) {
      console.error('❌ Error loading cart:', error);
      throw error;
    }
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      setError(null);
      console.log(`🔄 Adding product ${productId} to cart...`);
      const response = await cartAPI.addToCart(productId, quantity);
      setCart(response.data);
      console.log('✅ Product added to cart successfully');
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      setError('Failed to add product to cart. Please try again.');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      setError(null);
      console.log(`🔄 Removing product ${productId} from cart...`);
      const response = await cartAPI.removeFromCart(productId);
      setCart(response.data);
      console.log('✅ Product removed from cart successfully');
    } catch (error) {
      console.error('❌ Error removing from cart:', error);
      setError('Failed to remove product from cart. Please try again.');
    }
  };

  const handleCheckout = async (cartItems, customerInfo) => {
    try {
      setError(null);
      console.log('🔄 Processing checkout...');
      const response = await cartAPI.checkout(cartItems, customerInfo);
      setReceipt(response.data);
      setShowCheckout(false);
      await loadCart(); // Refresh cart after checkout
      console.log('✅ Checkout completed successfully');
    } catch (error) {
      console.error('❌ Error during checkout:', error);
      setError('Failed to process checkout. Please try again.');
    }
  };

  const cartItemCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <div className="spinner"></div>
          <h2>Loading E-Commerce App...</h2>
          <p>Connecting to backend server</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* ✅ Header Component Use Karein */}
      <Header
        cartItemCount={cartItemCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={loadInitialData}>Retry</button>
        </div>
      )}

      <main className="main-content">
        {/* ✅ ProductGrid Component Use Karein */}
        {activeTab === 'products' && (
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        )}

        {/* ✅ Cart Component Use Karein */}
        {activeTab === 'cart' && (
          <Cart
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={() => setShowCheckout(true)}
          />
        )}
      </main>

      {/* ✅ CheckoutForm Modal */}
      {showCheckout && (
        <CheckoutForm
          cart={cart}
          onCheckout={handleCheckout}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {/* ✅ Receipt Modal */}
      {receipt && (
        <Receipt
          receipt={receipt}
          onClose={() => {
            setReceipt(null);
            setActiveTab('products');
          }}
        />
      )}

      <div className="connection-status">
        <p>
          Backend Status: <span className="status">Connected</span>
        </p>
        <button onClick={loadInitialData}>Refresh Data</button>
      </div>
    </div>
  );
}

export default App;