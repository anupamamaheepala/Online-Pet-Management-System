import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/ShopCategory.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import axios from 'axios';

const ShopCategory = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date'); // Fixes the `setState` error

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:9000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === 'price') {
      return a.price - b.price;
    }
  });

  const filteredProducts = sortedProducts.filter(
    (item) =>
      item.category === props.category &&
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleAddToCart = async (productId) => {
    try {
      // Define the customerId - this should ideally come from user data or context
      const customerId = 'user_id'; // Adjust to obtain the actual customer ID
      
      // Send the POST request to add the product to the cart
      const response = await axios.post('http://localhost:9000/cart', { customerId, productId });
  
      if (response.status === 200 || response.status === 201) {
        console.log('Product added to cart');
        props.history.push('/cart'); // Redirect to the cart
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      // Improved error handling with detailed output
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response from server:', error.response.data);
      } else if (error.request) {
        // No response was received from the server
        console.error('No response from server:', error.request);
      } else {
        // Any other error
        console.error('Error:', error.message);
      }
    }
  };
  

  return (
    <>
      <Header />
      <div className="os_shopcategory">
        <Navbar products={allProducts} />
        <img src={props.banner} className="os_shopcategory-banner" alt="" />
        <div className="os_shopcategory-indexSort">
          <p>
            <span>Showing 1 - {filteredProducts.length}</span> out of {allProducts.length} Products
          </p>
          <div className="os_shopcategory-sort">
            Sort by
            <select
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="date">Date</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
        <div className="os_search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="os_search-button"
            onClick={() => console.log("Searching for:", searchQuery)}
          >
            Search
          </button>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item._id} className="col">
                <div className="os_card h-100 d-flex flex-column justify-content-between position-relative">
                  <div className={`status-badge ${
                      item.quantity > 0 ? 'in-stock' : 'out-of-stock'
                    }`}
                  >
                    {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: '190px' }}
                  >
                    <img
                      src={`http://localhost:9000/${item.image}`}
                      className="os_card-img-top"
                      alt={item.itemName}
                      style={{ width: '170px', height: 'auto', cursor: 'pointer' }}
                    />
                  </div>
                  <div className="os_card-body text-center">
                    <h5 className="os_card-title">{item.itemName}</h5>
                    <p className="os_card-text">Price: LKR {item.price}</p>

                    {/* Show the "Only X left" message when quantity is 5 or less */}
                    {item.quantity > 0 && item.quantity <= 5 ? (
                      <p className="text-warning">Only {item.quantity} left</p>
                    ) : null}

                    {item.quantity > 0 ? (
                      <center>
                        <button
                          className="os_button-primary"
                          onClick={() => handleAddToCart(item._id)}
                        >
                          Add to Cart
                        </button>
                      </center>
                    ) : (
                      <p className="text-danger">Out of Stock</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
        <div className="os_shopcategory-loadmore">
          <Link to="/" style={{ textDecoration: 'none' }}>
            Explore More
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopCategory;
