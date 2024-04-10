import React from 'react';

const AddToCartPage = ({ cart, removeFromCart, calculateTotal }) => {
  // If cart data is not available or empty, display a loading message
  if (!cart || cart.length === 0) {
    return <div>Loading...</div>;
  }

  // Calculate total cost of items in the cart
  const total = calculateTotal();

  return (
    <div>
      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
        </div>
      ))}
      <p>Total: ${total}</p>
      <button >Buy Now</button>
    </div>
  );
};

export default AddToCartPage;
