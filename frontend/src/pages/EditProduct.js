import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/addingproduct.css';

const EditProduct = ({ productId }) => {
    const [formData, setFormData] = useState({
        itemName: '',
        category: 'Foods',
        image: null,
        price: '',
        quantity: 0
    });

    useEffect(() => {
        // Fetch product details and set form data based on productId
        const fetchProductDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:9000/products/${productId}`);
                const productData = res.data;
                setFormData({
                    itemName: productData.itemName,
                    category: productData.category,
                    image: null, // You may set image URL here if needed
                    price: productData.price,
                    quantity: productData.quantity
                });
            } catch (error) {
                // Handle error
            }
        };
    
        fetchProductDetails();
    }, [productId]);

    const { itemName, category, image, price, quantity } = formData;

    const onChange = e => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('itemName', itemName);
            formDataToSend.append('category', category);
            formDataToSend.append('image', image);
            formDataToSend.append('price', price);
            formDataToSend.append('quantity', quantity);
    
            const res = await axios.put(`http://localhost:9000/products/${EditProduct.productId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
        } catch (err) {
            // Error handling
        }
    };

    return (
        <>
            <Header />
            <form className="product-form" onSubmit={onSubmit}>
                <h2>Edit product details</h2>
                <div className="form-group">
                    <label htmlFor="itemName">Item Name:</label>
                    <input type="text" id="itemName" name="itemName" value={itemName} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="category" className="category-label">Product category:</label>
                    <select value={category} name="category" className="add-product-selector" onChange={onChange}>
                        <option value="Foods">Foods</option>
                        <option value="Medicines">Medicines</option>
                        <option value="Toys and Accessories">Toys and Accessories</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="image" onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={price} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" value={quantity} onChange={onChange} />
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>
            <Footer />
        </>
    );
};

export default EditProduct;
