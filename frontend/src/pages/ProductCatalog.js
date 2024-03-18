import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import '../css/ProductCatalog.css';

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
      id: 5,
      name: "Bird Cage",
      description: "Spacious cage suitable for small to medium-sized birds.",
      price: "$40",
      image: "images/Drools.png"
    },
    {
      id: 6,
      name: "Bird Cage",
      description: "Spacious cage suitable for small to medium-sized birds.",
      price: "$40",
      image: "images/Drools.png"
    },
    {
      id: 7,
      name: "Bird Cage",
      description: "Spacious cage suitable for small to medium-sized birds.",
      price: "$40",
      image: "images/Drools.png"
    },
    {
      id: 8,
      name: "Bird Cage",
      description: "Spacious cage suitable for small to medium-sized birds.",
      price: "$40",
      image: "images/Drools.png"
    }
  ];


  return (
    <Layout>
      <div className="product-catalog">
        <div className="search-bar">
          <input type="text" placeholder="Search products" />
          <button className="search-button">Search</button>
          <Link to="/cart" className="cart-button">Cart</Link>
        </div>

        <div className="product-grid">
          {products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-item-link">
              <div className="product-item">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">Price: {product.price}</p>
                  <button className="add-to-cart-button">Add to Cart</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductCatalog;
