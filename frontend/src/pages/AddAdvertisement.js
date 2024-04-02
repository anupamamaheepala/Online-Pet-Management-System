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
        price: '',
        contact: ''
    });

    const { ownerName, email, title, Breed, purpose, description, price, contact } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/ads/add", formData);
            console.log(res.data);
            // Optionally, you can clear the form fields after successful submission
            setFormData({
                ownerName: '',
                email: '',
                title: '',
                Breed: '',
                purpose: '',
                description: '',
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
            <form className="ma_advertisement-form" onSubmit={onSubmit}>
                <h2>Add your advertisement details here. </h2>
                <p>You should enter the pet's date of birth, health status, height, weight etc. in the description box.
                    <b> If your pet is lost,</b> include those facts clearly. The time the pet went missing, last seen location etc.</p>

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
//add
export default AddAdvertisement;
