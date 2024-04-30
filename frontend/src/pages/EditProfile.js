import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../css/editprofile.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EditProfile = () => {
    const { customerId } = useParams();
    const [customerData, setCustomerData] = useState({
        username: '',
        email: '',
        contactNumbers: [''],
        address: '',
        profilePhoto: '',
    });

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const res = await axios.get(`http://localhost:9000/customer/${customerId}`);
                setCustomerData(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCustomerData();
    }, [customerId]);

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value, dataset } = e.target;
        if (name === 'contactNumbers') {
            const index = parseInt(dataset.index, 10);
            const updatedContactNumbers = [...customerData.contactNumbers];

            // Validate contact number
            if (/^\d{0,10}$/.test(value)) {
                // If valid, update the state with the new contact number
                updatedContactNumbers[index] = value;
                setCustomerData({ ...customerData, contactNumbers: updatedContactNumbers });
            } else {
                // Display an alert for invalid contact number input
                alert("Contact number must contain only numbers and be exactly 10 digits long.");
            }
        } else {
            setCustomerData({ ...customerData, [name]: value });
        }
    };

    
    const onBlurContactNumber = async (index, event) => {
        const value = event.target.value;
        try {
            const response = await axios.get(`http://localhost:9000/customer/contact-number/${value}`);
            if (response.data) {
                alert("Contact number already exists. Please use a different contact number.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while checking the contact number. Please try again later.");
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const updatedData = {
                username: customerData.username,
                email: customerData.email,
                contactNumbers: customerData.contactNumbers,
                address: customerData.address
            };

            // Send a PUT request with updated data to update the customer's profile
            await axios.put(`http://localhost:9000/customer/${customerId}`, updatedData);
            alert('Profile updated successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to update profile');
        }
    };

    // Function to add a new contact number field
    const handleAddContactNumber = () => {
        if (customerData.contactNumbers.length < 3) {
            setCustomerData({
                ...customerData,
                contactNumbers: [...customerData.contactNumbers, ''],
            });
        } else {
            alert("You can only add up to three contact numbers.");
        }
    };

    // Function to remove a contact number field
    const handleRemoveContactNumber = (index) => {
        const updatedContactNumbers = [...customerData.contactNumbers];
        updatedContactNumbers.splice(index, 1);
        setCustomerData({ ...customerData, contactNumbers: updatedContactNumbers });
    };

    return (
        <>
            <Header />
            <br />
            <div className="edit-profile-container">
                <center><h2>Edit Profile</h2></center>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" value={customerData.username} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={customerData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input type="text" name="address" value={customerData.address} onChange={handleChange} />
                    </div>


                    <div>
                        <label>Contact Numbers:</label>
                        {customerData.contactNumbers.map((contactNumber, index) => (
                            <div key={index}>
                                <input
                                    type="tel"
                                    name="contactNumbers"
                                    data-index={index}
                                    value={contactNumber}
                                    onChange={handleChange}
                                    onBlur={(event) => onBlurContactNumber(index, event)}
                                    pattern="\d{10}"
                                    title="Contact number must be exactly 10 digits long and contain only numbers."
                                    required
                                />
                                {index > 0 && (
                                    <button type="button" className="edit-profile-remove-button" onClick={() => handleRemoveContactNumber(index)}>
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button className="edit-profile-addContact-button" type="button" onClick={handleAddContactNumber}>
                            Add Contact Number
                        </button>
                    </div>
                    <center><button type="submit" className="save-profile-button">Save</button></center>

                </form>

            </div>
            <Footer />
        </>
    );
};

export default EditProfile;
