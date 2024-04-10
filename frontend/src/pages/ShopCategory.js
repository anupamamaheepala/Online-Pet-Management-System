import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link component
import '../css/ShopCategory.css'; // Ensure correct CSS file path
import dropdown_icon from '../components/Assests/dropdown_icon.png'; // Ensure correct image path
import Item from "../components/Item/Item";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import AddToCart from "./AddToCart";

const ShopCategory = (props) => {

    const [allProducts, setAllProducts] = useState([]);
    const [cart, setCart] = useState([]);

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
        if (props.allProducts) {
            const product = props.allProducts.find(product => product._id === productId);
            if (product) {
                props.setCart([...props.cart, product]);
            }
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item._id!== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart(cart.map(item => (item._id === productId? {...item, quantity } : item)));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <>
            <Header/>
            <div className="shopcategory">
                <Navbar products={allProducts} />
                <img src={props.banner} className="shopcategory-banner" alt="" />
                <div className="shopcategory-indexSort">
                    <p><span>Showing 1 - {allProducts.length}</span> out of {allProducts.length} Products</p>
                    <div className="shopcategory-sort">Sort by  <img src={dropdown_icon} alt="" /></div>
                </div>
                <div className="shopcategory-products">
                    {allProducts && allProducts.length > 0? (
                        allProducts.map(item => (
                            (props.category === item.category) &&
                            <div key={item._id}>
                                    <Item
                                        name={item.itemName}
                                        image={item.image}
                                        price={item.price}
                                        // Check if quantity is greater than 0, if not, display "Out of Stock" message
                                        quantity={item.quantity > 0? item.quantity : "Out of Stock"}
                                    />
                               <Link to="/AddToCart">
                                        <button onClick={() => addToCart(item._id)}>Add to Cart</button>
                                </Link>
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
            <AddToCart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} calculateTotal={calculateTotal} />
            <Footer/>
        </>
    );
};

export default ShopCategory;