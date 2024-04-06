// export default AllCustomers;
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/register.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            customer.contactNumber.includes(searchTerm) ||
            customer.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

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
                            <td>{customer.contactNumber}</td>
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
            <br></br>
            <Footer />
        </>
    );
}

export default AllCustomers;
