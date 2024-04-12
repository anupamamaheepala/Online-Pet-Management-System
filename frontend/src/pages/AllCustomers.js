import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/register.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get("http://localhost:9000/customer/")
            .then((res) => {
                console.log(res.data); // Log the data received from the API
                setCustomers(res.data); // Set the customer data to the state
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await axios.delete(`http://localhost:9000/customer/${id}`);
                setCustomers(customers.filter((customer) => customer._id !== id));
                alert('Customer deleted successfully');
            } catch (error) {
                alert('Failed to delete customer');
            }
        } else {
            alert('Deletion cancelled.');
        }
    };

    const filteredCustomers = customers.filter((customer) => {
        return (
            customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.contactNumbers.join(', ').includes(searchTerm) ||
            customer.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const generatePDFReport = () => {
        // Create a new instance of jsPDF
        const doc = new jsPDF();

        // Path to your system logo
        const logoURL = '/images/logo.png'; // Specify the URL or path to your logo image

        // Add the logo to the PDF at the top left corner
        doc.addImage(logoURL, 'PNG', 10, 10, 20, 20);

        // Add your system name as a header
        doc.text('PetZone', 40, 20); // Specify the x, y coordinates

        // Add a title to the PDF below the header
        doc.text('Customer Report', 20, 50);

        // Add headers for the table
        const headers = ['User Name', 'Email', 'Contact', 'Address'];

        // Add rows to the table
        const rows = filteredCustomers.map((customer) => [
            customer.username,
            customer.email,
            customer.contactNumbers.join(', '),
            customer.address,
        ]);

        // Add a table to the PDF
        doc.autoTable({
            startY: 60, // Start the table below the title
            head: [headers],
            body: rows,
        });

        // Save the PDF
        doc.save('customer_report.pdf');
    };

    return (
        <>
            <Header />
            <h1><center>All Customer Details</center></h1>

            <div className='customer-SearchBar-container'>
                <input
                    className='customer-SearchBar'
                    type="text"
                    placeholder="Search by Name, Email, Contact, or Address"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={generatePDFReport}>Download PDF Report</button>
            </div>

            <table className="customer_details_table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer) => (
                        <tr key={customer._id}>
                            <td>{customer.username}</td>
                            <td>{customer.email}</td>
                            <td>
                                {/* Display each contact number on its own line */}
                                {customer.contactNumbers.map((contactNumber, index) => (
                                    <div key={index}>
                                        {contactNumber}
                                    </div>
                                ))}
                            </td>
                            <td>{customer.address}</td>
                            <td>
                                <Link className="btn btn-warning" to={`/edit/${customer._id}`}>Edit</Link>
                                &nbsp;
                                <button className="btn btn-danger" onClick={() => handleDelete(customer._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />

            <Footer />
        </>
    );
};

export default AllCustomers;
