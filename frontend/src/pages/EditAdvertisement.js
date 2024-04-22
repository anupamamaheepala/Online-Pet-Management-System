import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/addingproduct.css';

const EditAdvertisement = () => {
    const { advertisementId } = useParams();
    const [advertisementData, setAdvertisementData] = useState({
        ownerName: '',
        email: '',
        pet_type: '', 
        Breed: '',
        purpose: '',
        description: '',
        contact: ''
    });
    const [petTypes, setPetTypes] = useState([]);
    const [purposes, setPurposes] = useState([]);

    useEffect(() => {
        fetchAdvertisementDetails();
        fetchPetTypes();
        fetchPurposes();
    }, []);

    const fetchAdvertisementDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:9000/confirmedads/${advertisementId}`);
            setAdvertisementData(res.data);
        } catch (error) {
            console.error('Error fetching advertisement details:', error);
        }
    };

    const fetchPetTypes = async () => {
        try {
            const res = await axios.get('http://localhost:9000/petTypes');
            setPetTypes(res.data);
        } catch (error) {
            console.error('Error fetching pet types:', error);
        }
    };

    const fetchPurposes = async () => {
        try {
            const res = await axios.get('http://localhost:9000/purposes');
            setPurposes(res.data);
        } catch (error) {
            console.error('Error fetching purposes:', error);
        }
    };

    
        
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        
        if (name === 'contact') {
            newValue = value.replace(/[^\d]/g, ''); // Replace non-digit characters with empty string
            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10); // Limit to 10 characters
            }
        } else if (name === 'ownerName') {
            newValue = value.replace(/[^A-Za-z\s]/g, ''); // Replace non-letter and non-space characters with empty string
        }
        
        setAdvertisementData({ ...advertisementData, [name]: newValue });
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9000/confirmedads/${advertisementId}`, advertisementData);
            alert('Advertisement updated successfully');
            window.location.href = '/AllAdvertisements';
        } catch (error) {
            console.error('Failed to update advertisement:', error);
            alert('Failed to update advertisement');
        }
    };

    const { ownerName, email, pet_type, Breed, purpose, description, contact } = advertisementData;

    return (
        <>
            <Header />
            <form className="product-form" onSubmit={handleSubmit}>
                <h2>Edit advertisement details</h2>
                <div className="form-group">
                    <label htmlFor="ownerName">Owner Name:</label>
                    <input type="text" id="ownerName" name="ownerName" value={ownerName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="pet_type">Pet Type:</label>
                    <select id="pet_type" name="pet_type" value={pet_type} onChange={handleChange}>
                        
                        <option value="">Select your pet type</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>  
                        <option value="rabbit">Rabbit</option> 
                        <option value="other">Other</option>
                        {petTypes.map(type => (
                            <option key={type._id} value={type.name}>{type.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="Breed">Species:</label>
                    <input type="text" id="Breed" name="Breed" value={Breed} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="purpose">Purpose:</label>
                    <select id="purpose" name="purpose" value={purpose} onChange={handleChange}>
                        <option value="">Select Purpose</option>
                        <option value="pet_for_sale">Pet for sale</option>
                        <option value="lost_my_pet">Lost my pet</option>
                        {purposes.map(purpose => (
                            <option key={purpose._id} value={purpose.name}>{purpose.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={description} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input type="text" id="contact" name="contact" value={contact} onChange={handleChange} maxLength="10" required />

                </div>

                <button type="submit" className="ma_submit-button">Update</button>
            </form>
            <Footer />
        </>
    );
};

export default EditAdvertisement;
