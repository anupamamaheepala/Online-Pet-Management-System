import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const ProductCatalog = () => {
  const products = [
    {
      id: 1,
      name: "Dog Food",
      description: "Premium quality dog food for all breeds and sizes.",
      price: "$25",
      image: "images/Drools.png"
  },
  {
      id: 2,
      name: "Cat Toy Set",
      description: "A set of interactive toys to keep your cat entertained.",
      price: "$15",
      image: "images/Drools.png"
  },
  {
      id: 3,
      name: "Bird Cage",
      description: "Spacious cage suitable for small to medium-sized birds.",
      price: "$40",
      image: "images/Drools.png"
  },
  {
      id: 4,
      name: "Fish Tank",
      description: "Glass fish tank with built-in LED lighting.",
      price: "$50",
      image: "images/Drools.png"
  },
  {
    id: 4,
    name: "Fish Tank",
    description: "Glass fish tank with built-in LED lighting.",
    price: "$50",
    image: "images/Drools.png"
},
{
  id: 5,
  name: "Dog Food",
  description: "Premium quality dog food for all breeds and sizes.",
  price: "$25",
  image: "images/Drools.png"
},
{
id: 5,
name: "Dog Food",
description: "Premium quality dog food for all breeds and sizes.",
price: "$25",
image: "images/Drools.png"

    },
    // Add more products here if needed
  ];

  return (
    <Layout>
      <div className="product-catalog">
        <div className="search-bar">
          <input type="text" placeholder="Search products" />
          <button className="search-button">Search</button>
          <button className="cart-button">Cart</button>
        </div>

        <div className="product-grid">
          {products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: {product.price}</p>
                <button className="add-to-cart-button">Add to Cart</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductCatalog;
