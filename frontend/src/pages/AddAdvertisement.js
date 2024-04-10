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
        title: '',
        Breed: '',
        purpose: '',
        description: '',
        file: null,
        price: '',
        contact: ''
    });

    const { ownerName, email, title, Breed, purpose, description, file, price, contact } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            formDataToSend.append('title', title);
            formDataToSend.append('Breed', Breed);
            formDataToSend.append('purpose', purpose);
            formDataToSend.append('description', description);
            formDataToSend.append('file', file);
            formDataToSend.append('price', price);
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
                title: '',
                Breed: '',
                purpose: '',
                description: '',
                file: null,
                price: '',
                contact: ''
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Header />
            <form className="ma_advertisement-form" onSubmit={onSubmit} encType="multipart/form-data">
                <h2>Add Your Advertisement Details Here.</h2>
                <p>You should enter the pet's date of birth, health status, height, weight etc. in the description box.
                    <b>If your pet is lost,</b> include those facts clearly. The time the pet went missing, last seen location etc.</p>

                <div className="ma_form-group">
                    <label htmlFor="ownerName">Owner Name:</label>
                    <input type="text" id="ownerName" name="ownerName" value={ownerName} onChange={onChange} />
                </div>

                <div className="ma_form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={onChange} />
                </div>

                <div className="ma_form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={title} onChange={onChange} />
                </div>

                <div className="ma_form-group">
                    <label htmlFor="Breed">Breed:</label>
                    <input type="text" id="Breed" name="Breed" value={Breed} onChange={onChange} />
                </div>

                <div className="ma_form-group">
                    <label htmlFor="purpose">Purpose of the advertisement:</label>
                    <select id="purpose" name="purpose" value={purpose} onChange={onChange}>
                        <option value="" disabled>Select Purpose</option>
                        <option value="pet_for_sale">Pet for sale</option>
                        <option value="lost_my_pet">Lost my pet</option>
                    </select>
                </div>

                <div className="ma_form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={description} onChange={onChange}></textarea>
                </div>

                <div className="ma_form-group">
                    <div>
                        <label>Upload your pet's image:</label>
                        <input type="file" name="file" onChange={onFileChange} />
                    </div>
                </div>

                <div className="ma_form-group">
                    <label htmlFor="price">Price(LKR):</label>
                    <input type="text" id="price" name="price" value={price} onChange={onChange} />
                </div>

                <div className="ma_form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input type="text" id="contact" name="contact" value={contact} onChange={onChange} />
                </div>

                <button style={{ width: '150px' }} type="submit" className="ma_submit-button">Submit</button>
            </form>
            <Footer />
        </>
    );
};

export default AddAdvertisement;
