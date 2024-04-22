import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/addingproduct.css';
import Swal from 'sweetalert2';
import StockManagerHeader from '../components/StockManagerHeader';


const EditProduct = () => {
    const { productId } = useParams();
    const [productData, setProductData] = useState({
        itemName: '',
        category: '',
        image: null, // Added image state
        price: '',
        quantity: ''
    });

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:9000/products/${productId}`);
            setProductData(res.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProductData({ ...productData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('itemName', productData.itemName);
            formData.append('category', productData.category);
            formData.append('image', productData.image); // Append image to form data
            formData.append('price', productData.price);
            formData.append('quantity', productData.quantity);
    
            await axios.put(`http://localhost:9000/products/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Display SweetAlert success message
            Swal.fire({
                icon: 'success',
                title: 'Product updated successfully!',
                text: `The product with ID: ${productId} has been updated.`,
            });
        } catch (error) {
            console.error('Failed to update product:', error);
    
            // Display SweetAlert error message
            Swal.fire({
                icon: 'error',
                title: 'Failed to update product',
                text: 'An error occurred while updating the product. Please try again later.',
            });
        }
    };
    

    const { itemName, category, price, quantity } = productData;

    return (
        <>
            <StockManagerHeader />
            <form className="product-form" onSubmit={handleSubmit}>
                <h2>Edit product details</h2>
                <div className="form-group">
                    <label htmlFor="itemName">Item Name:</label>
                    <input type="text" id="itemName" name="itemName" value={itemName} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="category" className="category-label">Product category:</label>
                    <select value={category} name="category" className="add-product-selector" onChange={handleChange}>
                        <option value="Foods">Foods</option>
                        <option value="Medicines">Medicines</option>
                        <option value="Toys and Accessories">Toys and Accessories</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="image" onChange={handleImageChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={price} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleChange} />
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>
        </>
    );
};

export default EditProduct;
