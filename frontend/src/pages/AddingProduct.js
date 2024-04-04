import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/addingproduct.css';

const AddingProduct = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        category: 'Foods', // Default category
        description: '',
        image: '',
        price: ''
    });

    const { itemName, category, description, image, price } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/product/add", formData);
            console.log(res.data);
            // Optionally, you can clear the form fields after successful submission
            setFormData({
                itemName: '',
                category: 'Foods', // Reset to default category
                description: '',
                image: '',
                price: ''
            });
        } catch (err) {
            console.error(err);
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

                <div className="form">
                    <p>Product category</p>
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
                    <label htmlFor="image">Image URL:</label>
                    <input type="text" id="image" name="image" value={image} onChange={onChange} />
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
