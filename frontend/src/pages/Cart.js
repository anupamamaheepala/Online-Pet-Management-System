import React from 'react';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  if (!cart) {
    return <p>Loading cart...</p>;
  }
  const addToCart = async (productId) => {
    const customerId = '661687e6f681919dd55aa688'; // Replace with actual logic to get the customer ID
    console.log(customerId)

    try {
      const response = await axios.post('http://localhost:9000/cart', { customerId:customerId,productId:productId });
      if (response.status === 201) {

        console.log('Product added to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.items.map((item) => (
            <li key={item.productId._id}>
              <div className="cart-item">
                <img
                  src={`http://localhost:9000/${item.productId.image}`}
                  alt={item.productId.itemName}
                  style={{ width: '50px', height: '50px' }}
                />
                <span>{item.productId.itemName}</span>
                <span>Price: LKR {item.productId.price}</span>
                <span>Quantity: {item.quantity}</span>
                <button onClick={() => removeFromCart(item.productId._id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/shop">Continue Shopping</Link>
    </div>
  );
};

export default Cart;
