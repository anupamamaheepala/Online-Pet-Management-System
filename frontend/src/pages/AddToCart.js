import React from 'react';
import { useCart } from '../Context/CartContext';

const AddToCartPage = () => {
  const cartContext = useCart();

  // If cart data is not available or empty, display a loading message
  if (!cartContext || !cartContext.cart || cartContext.cart.length === 0) {
    return <div>Loading...</div>;
  }

  // Destructure cart and other properties from cartContext
  const { cart, removeFromCart, calculateTotal } = cartContext;

  // Calculate total cost of items in the cart
  const total = calculateTotal();

  return (
    <div>
      {cart.map((item) => (
        <div key={item._id}>
          <h3>{item.itemName}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item._id)}>Remove from Cart</button>
        </div>
      ))}
      <p>Total: ${total}</p>
      <button >Buy Now</button>
    </div>
  );
};

export default AddToCartPage;
