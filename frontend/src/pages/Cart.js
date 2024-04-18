// Cart.js

import React, { useEffect, useState } from "react";
import '../css/Cart.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('http://localhost:9000/cart', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // You need to replace 'user_id_here' with the actual user ID
                    // You can retrieve the user ID from the authentication system or pass it as a prop from the parent component
                    body: JSON.stringify({ userId: 'user_id_here' })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }

                const data = await response.json();
                setCartItems(data.items);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <>
            <Header />
            <div className="cart">
                <h1>Your Cart</h1>
                {cartItems.length > 0 ? (
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.productId._id} className="cart-item">
                                <img src={`http://localhost:9000/${item.productId.image}`} alt={item.productId.itemName} />
                                <div className="item-details">
                                    <h3>{item.productId.itemName}</h3>
                                    <p>Price: LKR {item.productId.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Cart;