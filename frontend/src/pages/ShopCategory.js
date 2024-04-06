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
        const fetchInfo = async () => {
            try {
                const response = await fetch('http://localhost:9000/allproducts');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setAllProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchInfo();
    }, []);

    return (
        <>
            <Header/>
            <div className="shopcategory">
                <Navbar/>
                <img src={props.banner} className="shopcategory-banner" alt="" />
                <div className="shopcategory-indexSort">
                    <p><span>Showing 1 - 12</span> out of 54 Products</p>
                    <div className="shopcategory-sort">Sort by  <img src={dropdown_icon} alt="" /></div>
                </div>
                <div className="shopcategory-products">
                    {allProducts.map((item) => (
                        (props.category === item.category) && // Filter products by category
                        <Item key={item.id} id={item.id} name={item.name} image={item.image} price={item.price} />
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
