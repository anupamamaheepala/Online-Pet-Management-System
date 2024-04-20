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
        pet_type: '', // Include pet_type in the state
        Breed: '',
        purpose: '',
        description: '',
        contact: ''
    });

    useEffect(() => {
        fetchAdvertisementDetails();
    }, []);

    const fetchAdvertisementDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:9000/confirmedads/${advertisementId}`);
            setAdvertisementData(res.data);
        } catch (error) {
            console.error('Error fetching advertisement details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdvertisementData({ ...advertisementData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9000/confirmedads/${advertisementId}`, advertisementData);
            alert('Advertisement updated successfully');
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
                    <input type="text" id="ownerName" name="ownerName" value={ownerName} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="pet_type">Pet Type:</label>
                    <input type="text" id="pet_type" name="pet_type" value={pet_type} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="Breed">Breed:</label>
                    <input type="text" id="Breed" name="Breed" value={Breed} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="purpose">Purpose:</label>
                    <input type="text" id="purpose" name="purpose" value={purpose} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={description} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input type="text" id="contact" name="contact" value={contact} onChange={handleChange} />
                </div>

                <button type="submit" className="submit-button">Update</button>
            </form>
            <Footer />
        </>
    );
};

export default EditAdvertisement;
