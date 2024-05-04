import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/Cart.css';

const Cart = ({ customerId }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (customerId) {
      fetchCartItems();
    } else {
      console.log('Customer ID is undefined, waiting for valid ID...');
    }
  }, [customerId]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/cart/${customerId}`);
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      setCartItems([]);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return; // Prevent removing items via quantity update
    try {
      await axios.post(`http://localhost:9000/cart`, {
        customerId, // Include customerId in the payload
        productId,
        quantity,
      });
      fetchCartItems(); // Refresh the cart after updating
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:9000/cart/${customerId}/${productId}`, {
        data: { customerId } // Include customerId in the payload for security
      });
      fetchCartItems(); // Refresh the cart after removal
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to checkout page
  };

  return (
    <>
      <Header />
      <div className="os_cart-container">
        <h2 className="os_cart-header">Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.productId} className="os_cart-item">
              <p className="os_product-details">
                <span className="os_product-name">{item.productId.itemName}</span> -
                <span className="os_product-price">LKR {item.productId.price}</span> (Qty: {item.quantity})
              </p>
              <div className="os_quantity-controls">
                <button onClick={() => updateQuantity(item.productId._id, item.quantity + 1)} className="os_quantity-btn">+</button>
                <button onClick={() => updateQuantity(item.productId._id, item.quantity - 1)} className="os_quantity-btn">-</button>
                <button onClick={() => removeItem(item.productId._id)} className="os_remove-btn">Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>No items in cart.</p>
        )}
        <button onClick={handleCheckout} className="os_checkout-btn">Checkout</button>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
