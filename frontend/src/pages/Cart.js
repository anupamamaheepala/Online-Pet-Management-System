import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import jsPDF from 'jspdf';
import moment from 'moment';
import '../css/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const customerId = localStorage.getItem('userId');

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
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    // Update UI immediately
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.productId._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    try {
      const response = await axios.post('http://localhost:9000/cart', {
        customerId,
        productId,
        quantity: newQuantity,
      });
      if (response.status !== 200) { // Check your backend status, it might be 204, etc.
        throw new Error('Failed to update server');
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
      // Revert changes in UI if there's an error
      setCartItems(currentItems =>
        currentItems.map(item =>
          item.productId._id === productId ? { ...item, quantity: item.quantity } : item
        )
      );
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:9000/cart/${customerId}/${productId}`);
      setCartItems(cartItems.filter(item => item.productId._id !== productId));
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/Payerinfo'); // Redirect to the order form page
  };

  const totalAmount = cartItems.reduce((total, item) => total + (item.productId.price * item.quantity), 0);

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
  
    const logo = new Image();
    logo.src = '/images/logo.png';
    // Logo
    const logoWidth = 40;
    const logoXPosition = (210 - logoWidth) / 2;
    const logoYPosition = 10;
    doc.addImage(logo, 'PNG', logoXPosition, logoYPosition, logoWidth, logoWidth);
  
    // Title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text('Order Summary', 105, logoYPosition + 50, { align: 'center' });
  
    // Cart items
    let yPosition = logoYPosition + 70;
    cartItems.forEach((item, index) => {
      const itemName = item.productId.itemName;
      const itemPrice = item.productId.price;
      const itemQuantity = item.quantity;
      const totalPrice = itemPrice * itemQuantity;
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`${index + 1}. ${itemName}`, 15, yPosition);
      doc.text(`Price: LKR ${itemPrice}`, 75, yPosition);
      doc.text(`Quantity: ${itemQuantity}`, 105, yPosition);
      doc.text(`Total: LKR ${totalPrice}`, 155, yPosition);
      yPosition += 10;
    });
  
    // Total amount
    doc.setFontSize(14);
    doc.setTextColor(255, 0, 0);
    doc.text(`Total Amount: LKR ${totalAmount}`, 105, yPosition + 10, { align: 'right' });
  
    // Save the PDF
    doc.save(`cart_report_${moment().format('YYYYMMDD_HHmmss')}.pdf`);
  };

  return (
    <>
      <Header />
      <div className="os_cart-container">
        <h2 className="os_cart-header">Cart</h2>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.productId._id} className="os_cart-item">
                <p className="os_product-details">
                  <span className="os_product-name">{item.productId.itemName}</span> -
                  <span className="os_product-price">LKR {item.productId.price}</span> (Qty: {item.quantity})
                </p>
                <div className="os_quantity-controls">
                  <button onClick={() => updateQuantity(item.productId._id, item.quantity + 1)} className="os_quantity-btn">+</button>
                  <button onClick={() => updateQuantity(item.productId._id, item.quantity - 1)} className="os_quantity-btn" disabled={item.quantity === 1}>-</button>
                  <button onClick={() => removeItem(item.productId._id)} className="os_remove-btn">Remove</button>
                </div>
              </div>
            ))}
            <p>Total Amount: LKR {totalAmount}</p>
            <button onClick={handleCheckout} className="os_checkout-btn">Checkout</button>
          </>
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
      <div className="important-note">
        <p>** Add this PDF when doing payment and filling out the order form. **</p>
        <button onClick={generatePDF} className="os_cart-slip-btn">Cart Slip</button>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
