import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // Import the Header component
import Footer from '../components/Footer'; // Import the Footer component
import '../css/ProductCatalog.css';

const ProductCatalog = () => {
  const products = [
    // Product data
  ];

  return (
    <>
      <Header /> {/* Add the Header component */}
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
      <Footer /> {/* Add the Footer component */}
    </>
  );
};

export default ProductCatalog;
