import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
import '../css/ShopCategory.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import { useCart } from '../Context/CartContext'; // Import useCart context
import axios from 'axios'; // Correct import of axios

const ShopCategory = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const { addToCart } = useCart(); // Context to manage the cart
  const navigate = useNavigate(); // Corrected import for navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:9000/products'); // Ensure backend server is running
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setAllProducts(data); // Set products in state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts(); // Fetch products on component mount
  }, []); // Ensure useEffect has a dependency array

  const handleAddToCart = async (productId) => {
    const customerId = '661687e6f681919dd55aa688'; // Ensure this is a valid customer ID
    try {
      const response = await axios.post('http://localhost:9000/cart', { customerId, productId });
      if (response.status === 201) {
        console.log('Product added to cart');
        navigate('/cart'); // Redirect to the cart page
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value); // Update sort option
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

  return (
    <>
      <Header />
      <div className="os_shopcategory">
        <Navbar products={allProducts} />
        <img src={props.banner} className="os_shopcategory-banner" alt="" />
        <div className="os_shopcategory-indexSort">
          <p>
            Showing 1 - {filteredProducts.length} out of {allProducts.length} Products
          </p>
          <div className="os_shopcategory-sort">
            Sort by
            <select value={sortOption} onChange={handleSortChange}>
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
          <button className="os_search-button" onClick={() => console.log('Searching for:', searchQuery)}>
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
                    }`}>
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

export default ShopCategory; // Ensure proper export
