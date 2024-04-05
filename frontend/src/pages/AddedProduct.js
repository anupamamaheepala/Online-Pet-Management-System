import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../css/addedproduct.css';

const AddedProduct = () => {
    const [products, setProducts] = useState([]);



    useEffect(() => {
        axios.get("http://localhost:9000/products/")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });

    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Product?")) {
            try {
                await axios.delete(`http://localhost:9000/products/${id}`);
                setProducts(products.filter((item) => item._id !== id));
                alert('Advertisement deleted successfully');
            } catch (error) {
                alert('Failed to delete Advertisement');
            }
        } else {
            alert('Deletion cancelled.');
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
            <th>Price</th>
            <th>Image</th>
            <th>Manage</th>
        </tr>
    </thead>
    <tbody>
        {products.map((product) => (
            <tr key={product._id}>
                <td>{product.itemName}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td><img src={product.image} alt={product.itemName} /></td>
                <td>
                    <div className="ma_button-container">
                        <a className="btn btn-warning" >
                           &nbsp;Edit
                        </a>
                        &nbsp;
                        <button className= "btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
</table>


          
    
            <Footer />
        </>
    );
}

export default AddedProduct;
