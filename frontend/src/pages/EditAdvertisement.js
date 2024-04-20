import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/advertisement.css';

const EditAdvertisement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [advertisement, setAdvertisement] = useState({
        ownerName: '',
        email: '',
        title: '',
        Breed: '',
        purpose: '',
        description: '',
        file: null,
        contact: ''
    });

    useEffect(() => {
        getAdvertisementById(id);
    }, [id]);
    
    const getAdvertisementById = async (id) => {
        try {
            const res = await axios.get(`http://localhost:9000/confirmedads/${id}`);
            setAdvertisement(res.data);
        } catch (error) {
            console.error('Error fetching advertisement:', error);
        }
    };
    

    const onChange = e => {
        setAdvertisement({ ...advertisement, [e.target.name]: e.target.value });
    };

    const onFileChange = e => {
        setAdvertisement({ ...advertisement, file: e.target.files[0] });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('ownerName', advertisement.ownerName);
            formDataToSend.append('email', advertisement.email);
            formDataToSend.append('title', advertisement.title);
            formDataToSend.append('Breed', advertisement.Breed);
            formDataToSend.append('purpose', advertisement.purpose);
            formDataToSend.append('description', advertisement.description);
            formDataToSend.append('file', advertisement.file);
            formDataToSend.append('contact', advertisement.contact);

            const res = await axios.put(`http://localhost:9000/confirmedads/confirmedads/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);

            // Redirect to the AllAdvertisements page after successful submission
            navigate('/');
            // Display alert after successful submission
            alert('Advertisement updated successfully');
        } catch (err) {
            console.error(err);
            alert('Failed to update Advertisement');
        }
    };

    return (
        <>
            <Header/>
        <form className="ma_advertisement-form" onSubmit={onSubmit} encType="multipart/form-data">
            <h2>Edit Advertisement</h2>
            <div className="ma_form-group">
                <label htmlFor="ownerName">Owner Name:</label>
                <input type="text" id="ownerName" name="ownerName" value={advertisement.ownerName} onChange={onChange} required />
            </div>

            <div className="ma_form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={advertisement.email} onChange={onChange} required />
            </div>

            <div className="ma_form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={advertisement.title} onChange={onChange} required />
            </div>

            <div className="ma_form-group">
                <label htmlFor="Breed">Breed:</label>
                <input type="text" id="Breed" name="Breed" value={advertisement.Breed} onChange={onChange} required />
            </div>

            <div className="ma_form-group">
                <label htmlFor="purpose">Purpose of the advertisement:</label>
                <select id="purpose" name="purpose" value={advertisement.purpose} onChange={onChange} required>
                    <option value="" disabled>Select Purpose</option>
                    <option value="pet_for_sale">Pet for sale</option>
                    <option value="lost_my_pet">Lost my pet</option>
                </select>
            </div>

            <div className="ma_form-group">
                <label htmlFor="description">Description:</label>
                <p>If you intend to sell the pet, include the price in the description.</p>
                <textarea id="description" name="description" value={advertisement.description} onChange={onChange} required></textarea>
            </div>
            
            <div className="ma_form-group">
                <div>
                    <label>Upload your pet's image:</label>
                    <input type="file" name="file" onChange={onFileChange} />
                </div>
            </div>

            <div className="ma_form-group">
                <label htmlFor="contact">Contact:</label>
                <input type="text" id="contact" name="contact" value={advertisement.contact} onChange={onChange} pattern="[0-9]{10}" title="Contact number must be 10 digits" required />
            </div>

            <button style={{ width: '150px' }} type="submit" className="ma_submit-button">Submit</button>
        </form>
        <Footer />
        </>
    );
};

export default EditAdvertisement;
