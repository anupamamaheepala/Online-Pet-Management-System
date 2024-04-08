import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditProduct from './EditProduct';
import '../css/addedproduct.css';

const AddedProduct = () => {
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get("http://localhost:9000/products/")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleEdit = (id) => {
        setEditProductId(id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:9000/products/${id}`);
                setProducts(products.filter((product) => product._id !== id));
                alert('Product deleted successfully');
            } catch (error) {
                alert('Failed to delete product');
            }
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
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.qty}</td> {/* Added Quantity */}
                            <td><img src={product.image} alt={product.itemName} /></td>
                            <td>
                                <div className="ma_button-container">
                                    <button className="btn btn-warning" onClick={() => handleEdit(product._id)}>Edit</button>
                                    &nbsp;
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
