import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/advertisement.css';

const StepForm = () => {
    const [formData, setFormData] = useState({
        step: '',
        name: '',
        title: '',
        description: '',
        file: null,
        contact: ''
    });

    const { step,name,title,description,file,contact } = formData;

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
            formDataToSend.append('step', step);
            formDataToSend.append('name', name);
            formDataToSend.append('title', title);
            formDataToSend.append('description', description);
            formDataToSend.append('file', file);
            formDataToSend.append('contact', contact);

            const res = await axios.post("http://localhost:9000/step/adds", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);

            setFormData({
                step: '',
                name: '',
                title: '',
                description: '',
                file: null,
                contact: ''
            });

            // Display alert after successful submission
            alert('training successfuly submitted');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Header />
            <form className="ma_advertisement-form" onSubmit={onSubmit} encType="multipart/form-data">
                <h2>AddTraining New step.</h2>
                <p>Enter the private training steps
                    <b>If your pet is lost,</b> include those facts clearly. The time the pet went missing, last seen location etc.</p>

                <div className="ma_form-group">
                    <label htmlFor="step">step:</label>
                    <input type="text" id="step" name="step" value={step} onChange={onChange} required />
                </div>

                <div className="ma_form-group">
                    <label htmlFor="name">name:</label>
                    <input type="name" id="name" name="name" value={name} onChange={onChange} required />
                </div>

                <div className="ma_form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="title" id="title" name="title" value={title} onChange={onChange} required />
                </div>

                <div className="ma_form-group">
                    <label htmlFor="description">Description:</label>
                    <p>If you intend to sell the pet, include the price in the description.</p>
                    <textarea id="description" name="description" value={description} onChange={onChange} required></textarea>
                </div>
                
                <div className="ma_form-group">
                    <div>
                        <label>Upload suitable image for this step:</label>
                        <input type="file" name="file" onChange={onFileChange} required />
                    </div>
                </div>

                <div className="ma_form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input type="text" id="contact" name="contact" value={contact} onChange={onChange} pattern="[0-9]{10}" title="Contact number must be 10 digits" required />
                </div>

                <button style={{ width: '150px' }} type="submit" className="ma_submit-button">Add step</button>
            </form>
            <Footer />
        </>
    );
};

export default StepForm;
