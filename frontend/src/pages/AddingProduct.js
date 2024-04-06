import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/addingproduct.css';

const AddingProduct = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        category: 'Foods',
        description: '',
        image: null,
        price: ''
    });

    const { itemName, category, description, image, price } = formData;

    const onChange = e => {
        if (e.target.name === "image" && e.target.files.length > 0) {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
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
            formDataToSend.append('description', description);
            formDataToSend.append('image', image);
            formDataToSend.append('price', price);

            const res = await axios.post("http://localhost:9000/products/add", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            // Optionally, you can clear the form fields after successful submission
            setFormData({
                itemName: '',
                category: 'Foods',
                description: '',
                image: null,
                price: ''
            });
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                console.log('Server responded with status:', err.response.status);
                console.log('Response data:', err.response.data); // Log response data for debugging
                // You can handle different types of errors here
            } else if (err.request) {
                // The request was made but no response was received
                console.log('No response received from server');
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error setting up the request:', err.message);
            }
        }
    };

    return (
        <>
            <Header />
            <form className="product-form" onSubmit={onSubmit}>
                <h2>Add your product details here.</h2>
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
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={description} onChange={onChange}></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="image" onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={price} onChange={onChange} />
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>
            <Footer />
        </>
    );
};

export default AddingProduct;
