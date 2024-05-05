//AddAdvertisement.js

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/advertisement.css';

const AddAdvertisement = () => {
    const [formData, setFormData] = useState({
        ownerName: '',
        email: '',
        pet_type: '',
        Breed: '',
        purpose: '',
        description: '',
        file: null,
        contact: ''
    });

    const { ownerName, email, pet_type, Breed, purpose, description, file, contact } = formData;
    

    const onChange = e => {
        const { name, value } = e.target;
        let newValue = value;
        
        if (name === 'contact') {
            newValue = value.replace(/[^\d]/g, ''); // Replace non-digit characters with empty string
            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10); // Limit to 10 characters
            }
        }

        if (name === 'ownerName') {
            newValue = value.replace(/[^A-Za-z.\s]/g, ''); // Allow letters, dots, and spaces
        } else if (name === 'contact') {
            newValue = value.replace(/[^\d]/g, ''); 
            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10); 
            }
        }
        
        setFormData({ ...formData, [name]: newValue }); 
    };
    

    const onFileChange = e => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('ownerName', ownerName);
            formDataToSend.append('email', email);
            formDataToSend.append('pet_type', pet_type);
            formDataToSend.append('Breed', Breed);
            formDataToSend.append('purpose', purpose);
            formDataToSend.append('description', description);
            formDataToSend.append('file', file);
            formDataToSend.append('contact', contact);

            const res = await axios.post("http://localhost:9000/ads/add", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            });
            console.log(res.data);

            setFormData({
                ownerName: '',
                email: '',
                pet_type: '',
                Breed: '',
                purpose: '',
                description: '',
                file:null,
                contact: ''
            });
           
            // Display alert after successful submission
            alert('Advertisement submitted successfully');
            window.location.href = '/Advertisement';
        } catch (err) {
            console.error(err);
            // Display error message to the user
            alert('Failed to submit advertisement');
        }
    };

    return (
        <>
            <Header />
            <form className="ma_advertisement-form" onSubmit={onSubmit} encType="multipart/form-data">
                <h4><center>Add Your Advertisement Details Here.</center></h4>
                <h7><p>You should enter the pet's date of birth, health status, height, weight etc. in the description box.
                    <b>If your pet is lost,</b> include those facts clearly. The time the pet went missing, last seen location etc.<b> Advertisements are posted for 10 days only.</b></p>
                    </h7>
                <div className="ma_form-group">
                    <label htmlFor="ownerName">Owner Name:</label>
                    <input type="text" id="ownerName" name="ownerName" value={ownerName} onChange={onChange} required />
                </div>

                <div className="ma_form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={onChange} required />
                </div>

                <div className="ma_form-group">
                    <label htmlFor="pet_type">Pet Type:</label>
                    <select id="pet_type" name="pet_type" value={pet_type} onChange={onChange} required>
                        <option value="">Select your pet type</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>  
                        <option value="rabbit">Rabbit</option> 
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="ma_form-group">
                    <label htmlFor="Breed">Species:</label>
                    <input type="text" id="Breed" name="Breed" value={Breed} onChange={onChange} required />
                </div>

                <div className="ma_form-group">
                    <label htmlFor="purpose">Purpose of the advertisement:</label>
                    <select id="purpose" name="purpose" value={purpose} onChange={onChange} required>
                        <option value="">Select Purpose</option>
                        <option value="pet_for_sale">Pet for sale</option>
                        <option value="lost_my_pet">Lost my pet</option>
                    </select>
                </div>

                <div className="ma_form-group">
                    <label htmlFor="description">Description:</label>
                    <p>If you intend to sell the pet, include the price in the description.</p>
                    <textarea id="description" name="description" value={description} onChange={onChange} required></textarea>
                </div>
                
                <div className="ma_form-group">
                    <div>
                        <label>Upload your pet's image:</label>
                        <input type="file" name="file" onChange={onFileChange} required />
                    </div>
                </div>

                <div className="ma_form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input type="text" id="contact" name="contact" value={contact} onChange={onChange} maxLength="10" required />
                </div>

                <button style={{ width: '150px' }} type="submit" className="ma_submit-button">Submit</button>
            </form>
            <Footer />
        </>
    );
};

export default AddAdvertisement;
