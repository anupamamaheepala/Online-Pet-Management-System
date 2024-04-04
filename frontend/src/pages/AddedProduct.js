import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../css/addedproduct.css';

const AddedProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:9000/product/get");
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <>
            <Header />
            <h1><center>Products</center></h1>
<table className="ma_advertisement-table">
    <thead>
        <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Manage</th>
        </tr>
    </thead>
    <tbody>
        {products.map((product) => (
            <tr key={product._id}>
                <td>{product.itemName}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td><img src={product.image} alt={product.itemName} /></td>
                <td>{product.price}</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>

            <div className="product-container">
                {products.map(product => (
                    <div key={product._id} className="product-column">
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
                                        <Link to={`/edit/${product._id}`} className="add_button confirm_button">Edit</Link>
                                    </div>
                                    <div className="button-container">
                                        <Link to={`/delete/${product._id}`} className="add_button reject_button">Delete</Link>
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

export default AddedProduct;
