import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ShopCategory.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';

const ShopCategory = ({ category, banner }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:9000/products');
        setAllProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Fetch products on component mount

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post('http://localhost:9000/cart', { customerId: localStorage.getItem('userId'), productId });
      if (response.status === 201) {
        console.log('Product added to cart');
        navigate('/cart'); // Redirect to the cart page
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };


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
    return 0; // Default case to ensure no errors in case of unknown sort option
  });

  const filteredProducts = sortedProducts.filter(
    (item) =>
      item.category.toLowerCase() === category.toLowerCase() &&
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="os_shopcategory">
        <Navbar />
        <img src={banner} className="os_shopcategory-banner" alt="Category Banner" />
        <div className="os_shopcategory-indexSort">
          <p>
            Showing {filteredProducts.length} out of {allProducts.length} Products
          </p>
          <div className="os_shopcategory-sort">
            Sort by:
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
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item._id} className="col">
                <div className="os_card h-100 d-flex flex-column justify-content-between position-relative">
                  <div className={`status-badge ${item.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                  <div className="d-flex justify-content-center align-items-center" style={{ height: '190px' }}>
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
                      <div className="d-flex justify-content-center"> 
                        <button
                          className="os_button-primary"
                          onClick={() => handleAddToCart(item._id)}
                        >
                          Add to Cart
                        </button>
                      </div>
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
