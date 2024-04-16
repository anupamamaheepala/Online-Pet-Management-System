import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProduct = ({ productId }) => {
    const [editedProduct, setEditedProduct] = useState({
        itemName: '',
        category: '',
        description: '',
        image: null,
        price: ''
    });

    useEffect(() => {
        // Fetch the product details based on productId
        axios.get(`http://localhost:9000/products/${productId}`)
            .then((res) => {
                const productData = res.data;
                setEditedProduct(productData);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, [productId]);

    const handleChange = e => {
        if (e.target.name === 'image') {
            setEditedProduct({ ...editedProduct, [e.target.name]: e.target.files[0] });
        } else {
            setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // Prepare form data for image upload
            const formDataToSend = new FormData();
            formDataToSend.append('itemName', editedProduct.itemName);
            formDataToSend.append('category', editedProduct.category);
            formDataToSend.append('description', editedProduct.description);
            formDataToSend.append('image', editedProduct.image);
            formDataToSend.append('price', editedProduct.price);

            // Send edited product data to server
            await axios.put(`http://localhost:9000/products/${productId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product updated successfully');
        } catch (error) {
            alert('Failed to update Product');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Product</h2>
            <div className="form-group">
                <label htmlFor="itemName">Item Name:</label>
                <input type="text" id="itemName" name="itemName" value={editedProduct.itemName} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" value={editedProduct.category} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={editedProduct.description} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input type="file" id="image" name="image" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input type="text" id="price" name="price" value={editedProduct.price} onChange={handleChange} />
            </div>
            <button type="submit">Update</button>
        </form>
    );
};

export default EditProduct;
