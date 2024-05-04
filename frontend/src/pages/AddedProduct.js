import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import EditProduct from './EditProduct';
import '../css/addedproduct.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import StockManagerHeader from '../components/StockManagerHeader';

const AddedProduct = () => {
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [lowQuantityProducts, setLowQuantityProducts] = useState([]);

    const LOW_QUANTITY_THRESHOLD = 5; // Show warning only when quantity is 5 or below

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:9000/products/");
            setProducts(res.data);
            setSearchResults(res.data);

            // Check for low-quantity products
            const lowQuantity = res.data.filter(
                product => product.quantity <= LOW_QUANTITY_THRESHOLD
            );
            setLowQuantityProducts(lowQuantity); // Store low-quantity products
        } catch (err) {
            console.error('Error fetching products:', err);
            alert(err.message);
        }
    };

    const handleEdit = (id) => {
        Swal.fire({
            title: 'Edit Product',
            text: 'Do you want to edit this product?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, edit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setEditProductId(id);
            }
        });
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:9000/products/${id}`);
                    setProducts(products.filter(product => product._id !== id));
                    Swal.fire(
                        'Deleted!',
                        'Your product has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error deleting product:', error);
                    Swal.fire(
                        'Error!',
                        'Failed to delete product.',
                        'error'
                    );
                }
            }
        });
    };

    const handleImageClick = (imageURL) => {
        setSelectedImage(imageURL);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        const filteredProducts = products.filter(
            product => product.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredProducts);
    };

    const handleSortBy = (category) => {
        setSortBy(category);
        const sortedProducts = products.filter(
            product => product.category === category
        );
        setSearchResults(sortedProducts);
    };

    const generatePdf = (category) => {
        const doc = new jsPDF();
        let filteredProducts;
        let reportTitle;

        if (category) {
            filteredProducts = searchResults.filter(
                product => product.category === category
            );
            reportTitle = `Products Details - ${category}`;
        } else {
            filteredProducts = searchResults;
            reportTitle = 'All Products Details';
        }

        // Add title and table content to the PDF
        const tableData = filteredProducts.map(product => [
            product.itemName,
            product.category,
            product.price,
            product.quantity
        ]);

        doc.setFontSize(18);
        doc.text(reportTitle, 10, 10); // Simple title
        doc.autoTable({
            startY: 20,
            head: [['Item Name', 'Category', 'Price', 'Quantity']],
            body: tableData,
        });

        doc.save('products_report.pdf'); // Download the generated PDF
    };

    return (
        <>
            <StockManagerHeader />
            <h1>
                <center>Products Details</center>
            </h1>

            {lowQuantityProducts.length > 0 && (
                <div className="important-note" >
                    <h2>⚠️ Attention! Low Quantity Products:</h2>
                    <ul>
                        {lowQuantityProducts.map(product => (
                            <li key={product._id}>
                                {product.itemName} (Quantity: {product.quantity})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
                <button className="report-button" onClick={() => generatePdf(sortBy)}>
                    Download Report
                </button>
            </div>

            <div className="sort-by">
                <span>Sort By:</span>
                <select onChange={e => handleSortBy(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Foods">Foods</option>
                    <option value="Medicines">Medicines</option>
                    <option value="Toys and Accessories">Toys and Accessories</option>
                </select>
            </div>

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
                    {searchResults.map(product => (
                        <tr key={product._id}>
                            <td>{product.itemName}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <img
                                    src={`http://localhost:9000/${product.image.replace(/\\/g, '/')}`}
                                    alt="Product"
                                    style={{ width: '130px', height: '130px', cursor: 'pointer' }}
                                    onClick={() => handleImageClick(`http://localhost:9000/${product.image.replace(/\\/g, '/')}`)}
                                />
                            </td>
                            <td>
                                <div className="ma_button-container">
                                    <Link to={`/EditProduct/${product._id}`}>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => handleEdit(product._id)}
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
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
