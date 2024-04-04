import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../css/addedproduct.css';

const AddingProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // Mocking product data
            const data = [
                {
                    id: 1,
                    itemName: "Product 1",
                    category: "Category 1",
                    description: "Description of product 1.",
                    image: "https://via.placeholder.com/150",
                    price: "100"
                },
                {
                    id: 2,
                    itemName: "Product 2",
                    category: "Category 2",
                    description: "Description of product 2.",
                    image: "https://via.placeholder.com/150",
                    price: "200"
                },
                // Add more product data as needed
            ];
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="product-container">
                {products.map(product => (
                    <div key={product.id} className="product-column">
                        <h3>{product.category}</h3>
                        <div className="product-box">
                            {/* Render an image if available */}
                            {product.image && <img src={product.image} alt={product.itemName} className="product-photo" />}
                            <div className="product-details">
                                <h4>{product.itemName}</h4>
                                <p>{product.description}</p>
                                <p>Price: {product.price}</p>
                                <div className="product-buttons">
                                    <div className="button-container">
                                        <Link to={`/edit/${product.id}`} className="add_button confirm_button">Edit</Link>
                                    </div>
                                    <div className="button-container">
                                        <Link to={`/delete/${product.id}`} className="add_button reject_button">Delete</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default AddingProduct;
