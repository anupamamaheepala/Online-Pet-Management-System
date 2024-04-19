import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditProduct from './EditProduct';
import '../css/addedproduct.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const AddedProduct = () => {
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:9000/products/");
            setProducts(res.data);
            setSearchResults(res.data); // Initialize search results with all products
        } catch (err) {
            console.error('Error fetching products:', err);
            alert(err.message);
        }
    };

      const handleEdit = (id) => {
        setEditProductId(id);
    };

   
    

    const handleImageClick = (imageURL) => {
        setSelectedImage(imageURL);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        const filteredProducts = products.filter((product) => {
            return product.itemName.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setSearchResults(filteredProducts);
    };
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:9000/products/${id}`); 
                setProducts(products.filter((product) => product._id !== id));
                alert('Product deleted successfully');
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    const handleSortBy = (category) => {
        setSortBy(category);
        const sortedProducts = products.filter((product) => product.category === category);
        setSearchResults(sortedProducts);
    };

    const generatePdf = (category) => {
        const doc = new jsPDF();
        let filteredProducts;
        let reportTitle;
        if (category) {
            filteredProducts = searchResults.filter(product => product.category === category);
            reportTitle = `Products Details - ${category}`;
        } else {
            filteredProducts = searchResults;
            reportTitle = 'All Products Details';
        }
    
        // Add logo to the left corner of the header
        const logo = new Image();
        logo.src = '/images/logo.png';
    
        logo.onload = function() {
            const logoWidth = 40; // Adjust the width of the logo as needed
            const xPosition = 10; // Set the left margin
            const yPosition = 10; // Set the top margin
    
            doc.addImage(logo, 'PNG', xPosition, yPosition, logoWidth, logoWidth);
    
            // Add title to the center of the page
            const pageWidth = doc.internal.pageSize.getWidth();
            const titleWidth = doc.getStringUnitWidth(reportTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const titleXPosition = (pageWidth - titleWidth) / 2;
            const titleYPosition = yPosition + logoWidth + 10; // Adjust the vertical position of the title as needed
    
            doc.setFontSize(18);
            doc.text(reportTitle, titleXPosition, titleYPosition); // Center the title
    
            // Add table data to the PDF
            const tableData = filteredProducts.map((product) => [
                product.itemName,
                product.category,
                product.price,
                product.quantity,
            ]);
    
            // Generate the rest of the PDF content
            doc.setFontSize(12);
            doc.autoTable({
                startY: titleYPosition + 10, // Adjust the vertical position of the table as needed
                head: [['Item Name', 'Category', 'Price', 'Quantity']],
                body: tableData,
                styles: {
                    fontSize: 10,
                    cellPadding: 3,
                },
                headStyles: {
                    fillColor: [128, 128, 128],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold',
                },
            });
    
            doc.save(category ? `products-details-${category.toLowerCase()}.pdf` : 'products-details.pdf');
        };
    };
    return (
        <>
            <Header />
            <h1><center>Products Details</center></h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
                <button className="report-button" onClick={() => generatePdf(sortBy)}>Download Report</button>
            </div>
            <div className="sort-by">
                <span>Sort By:</span>
                <select onChange={(e) => handleSortBy(e.target.value)}>
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
                    {searchResults.map((product) => (
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
