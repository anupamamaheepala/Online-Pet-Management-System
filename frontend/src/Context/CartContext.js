import React, { createContext, useState, useContext } from 'react';

// Create a context for the cart
const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
    // State to hold the cart items
    const [cart, setCart] = useState([]);

    // Function to add an item to the cart
    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    // Function to remove an item from the cart
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item._id !== productId));
    };

    // Function to calculate the total price of items in the cart
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotal }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);
