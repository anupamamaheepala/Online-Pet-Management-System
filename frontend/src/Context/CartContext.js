import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const customerId = 'user_id'; // Placeholder, replace with actual user ID logic

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/cart/${customerId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await axios.post('http://localhost:9000/cart', { customerId, productId });
      setCart(response.data.cart); // Update the cart state
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  useEffect(() => {
    fetchCart(); // Fetch the cart when the component mounts
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider }; 