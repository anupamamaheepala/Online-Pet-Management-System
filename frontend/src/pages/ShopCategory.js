import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/ShopCategory.css';
import dropdown_icon from '../components/Assests/dropdown_icon.png';
import Item from "../components/Item/Item";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";

const ShopCategory = (props) => {
    const [allProducts, setAllProducts] = useState([]);

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

    const addToCart = (productId) => {
        // Add your addToCart logic here
        console.log(`Product added to cart with ID: ${productId}`);
        // Navigate to cart page
        props.history.push('/cart');
    };

    return (
        <>
            <Header />
            <div className="shopcategory">
                <Navbar products={allProducts} />
                <img src={props.banner} className="shopcategory-banner" alt="" />
                <div className="shopcategory-indexSort">
                    <p><span>Showing 1 - {allProducts.length}</span> out of {allProducts.length} Products</p>
                    <div className="shopcategory-sort">Sort by  <img src={dropdown_icon} alt="" /></div>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {allProducts && allProducts.length > 0 ? (
                        allProducts.map(item => (
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
                                            <center><Link to="/add-to-cart" className="oshibtn-primary" onClick={() => addToCart(item._id)}>Add to Cart</Link>
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
                <div className="shopcategory-loadmore">
                    <Link to='/' style={{ textDecoration: 'none' }}>Explore More</Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShopCategory;
