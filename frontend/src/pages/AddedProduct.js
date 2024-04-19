// AddedProduct.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditProduct from './EditProduct';
import '../css/addedproduct.css';
import { Link } from "react-router-dom";

const AddedProduct = () => {
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:9000/products/");
            setProducts(res.data);
        } catch (err) {
            console.error('Error fetching products:', err);
            alert(err.message);
        }
    };

    const handleEdit = (id) => {
        setEditProductId(id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:9000/products/${id}`); // Fix syntax here
                setProducts(products.filter((product) => product._id !== id));
                alert('Product deleted successfully');
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };
    


    const handleImageClick = (imageURL) => {
        setSelectedImage(imageURL);
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
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Image</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.itemName}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td> <img
                                src={`http://localhost:9000/${product.image.replace(/\\/g, '/')}`}
                                alt="Product"
                                style={{ width: '130px', height: '130px', cursor: 'pointer' }}
                                onClick={() => handleImageClick(`http://localhost:9000/${product.image.replace(/\\/g, '/')}`)}
                            /></td>
                            <td>
                                <div className="ma_button-container">
                                    <Link to={`/EditProduct/${product._id}`}>
                                        <button className="btn btn-warning" onClick={() => handleEdit(product._id)}>Edit</button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editProductId && <EditProduct productId={editProductId} />}
            <Footer />
        </>
    );
};

export default AddedProduct;
