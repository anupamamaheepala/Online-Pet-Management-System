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
    const [sortOption, setSortOption] = useState('date'); // Default sort option is by date

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

    const addToCart = async (productId) => {
        try {
          // Replace 'user_id_here' with the actual user ID
          const customerId = 'user_id';
      
          const response = await axios.post('http://localhost:9000/cart', {
            customerId,
            productId,
          });
      
          if (response.status === 200) {
            // Cart item added successfully
            console.log('Product added to cart');
            // Navigate to the cart page
            props.history.push('/cart');
          } else {
            // Handle error
            console.error('Failed to add product to cart');
          }
        } catch (error) {
          console.error('Error adding product to cart:', error);
        }
      };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        // Add logic to perform search here
        console.log("Searching for:", searchQuery);
        // You can perform further actions like filtering, displaying results, etc.
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const sortedProducts = [...allProducts].sort((a, b) => {
        if (sortOption === 'date') {
            // Sort by date
            return new Date(b.date) - new Date(a.date);
        } else if (sortOption === 'price') {
            // Sort by price
            return a.price - b.price;
        }
    });

    const filteredProducts = sortedProducts.filter(item => item.itemName.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            <Header />
            <div className="shopcategory">
                <Navbar products={allProducts} />
                <img src={props.banner} className="shopcategory-banner" alt="" />
                <div className="shopcategory-indexSort">
                    <p><span>Showing 1 - {filteredProducts.length}</span> out of {allProducts.length} Products</p>
                    <div className="shopcategory-sort">
                        Sort by
                        <select value={sortOption} onChange={handleSortChange}>
                            <option value="date">Date</option>
                            <option value="price">Price</option>
                        </select>
                    </div>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="search-button" onClick={handleSearch}>Search</button>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {filteredProducts && filteredProducts.length > 0 ? (
                        filteredProducts.map(item => {
                            console.log("Item category:", item.category);
                            console.log("Props category:", props.category);
                            return (
                                (props.category === item.category) &&
                                <div key={item._id} className="col">
                                    <div className="card h-100 d-flex flex-column justify-content-between">
                                        <div className="d-flex justify-content-center align-items-center" style={{ height: '190px' }}>
                                            <img src={`http://localhost:9000/${item.image}`} className="card-img-top" alt={item.itemName} style={{ width: '170px', height: 'auto', cursor: 'pointer' }} />
                                        </div>
                                        <div className="card-body text-center">
                                            <h5 className="card-title">{item.itemName}</h5>
                                            <p className="card-text">Price: LKR {item.price}</p>
                                            {(item.quantity > 0) ? (
                                                <center>
                                                    <Link to="/Cart" className="oshibtn-primary" onClick={() => addToCart(item._id)}>Add to Cart</Link>
                                                </center>
                                            ) : (
                                                <p className="text-danger">Out of Stock</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
                <div className="shopcategory-loadmore">
                    <Link to='/' style={{ textDecoration: 'none' }}>Explore More</Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShopCategory;
