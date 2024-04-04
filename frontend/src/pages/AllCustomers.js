import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/register.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllCustomers = () => {
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/customer/")
            .then((res) => {
                console.log(res.data); // Log the data received from the API
                setCustomer(res.data); // Set the customer data to the state
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await axios.delete(`http://localhost:9000/customer/${id}`);
                setCustomer(customer.filter((cus) => cus._id !== id));
                alert('Customer deleted successfully');
            } catch (error) {
                alert('Failed to delete customer');
            }
        } else {
            alert('Deletion cancelled.');
        }
    };
    
    return (
        <>
            <Header />
            <h1><center>All Customer Details</center></h1>
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
                    {customer.map((cus) => (
                        <tr key={cus._id}>
                            <td>{cus.username}</td>
                            <td>{cus.email}</td>
                            <td>{cus.contactNumber}</td>
                            <td>{cus.address}</td>
                            <td>
                               
                                <Link className="btn btn-warning" to={`/edit/${cus._id}`}>Edit</Link>
                                &nbsp;
                                <button className= "btn btn-danger" onClick={() => handleDelete(cus._id)}>Delete</button> {/* Delete button */}
                                

                            </td>
                            
                            
                            <td></td>
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
