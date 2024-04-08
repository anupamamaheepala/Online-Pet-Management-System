import React, { useEffect, useState } from "react";
import '../css/ShopCategory.css'; // Ensure correct CSS file path
import dropdown_icon from '../components/Assests/dropdown_icon.png'; // Ensure correct image path
import Item from "../components/Item/Item";
import { Link } from "react-router-dom";
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

    return (
        <>
            <Header/>
            <div className="shopcategory">
                <Navbar/>
                <img src={props.banner} className="shopcategory-banner" alt="" />
                <div className="shopcategory-indexSort">
                    <p><span>Showing 1 - {allProducts.length}</span> out of {allProducts.length} Products</p>
                    <div className="shopcategory-sort">Sort by  <img src={dropdown_icon} alt="" /></div>
                </div>
                <div className="shopcategory-products">
                    {allProducts.map((item) => (
                        (props.category === item.category) &&
                        <Item
                            key={item._id}
                            id={item._id}
                            name={item.itemName}
                            image={item.image}
                            price={item.price}
                            // Check if quantity is greater than 0, if not, display "Out of Stock" message
                            quantity={item.quantity > 0 ? item.quantity : "Out of Stock"}
                        />
                    ))}
                </div>
                <div className="shopcategory-loadmore">
                    <Link to='/' style={{ textDecoration: 'none' }}>Explore More</Link>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ShopCategory;
