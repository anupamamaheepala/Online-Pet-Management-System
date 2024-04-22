import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import editstepform from '../css/editstepform.css';

const EditStepForm = () => {
    const { stepId } = useParams();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
   
    const [stepData, setStepData] = useState({
        step: '',
        name: '',
        title: '',
        description: '',
        file: null,
        contact: '',
        filePath: '' // Add filePath property
    });

    useEffect(() => {
        fetchStepDetails();
    }, []);

    const fetchStepDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:9000/step/${stepId}`);
            setStepData(res.data);
        } catch (error) {
            console.error('Error fetching step details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStepData({ ...stepData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setFileName(file.name); // Extract file name from selected file
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('step', stepData.step);
            formData.append('name', stepData.name);
            formData.append('title', stepData.title);
            formData.append('description', stepData.description);
            formData.append('file', file); // Use the file state here
            formData.append('contact', stepData.contact);

            await axios.put(`http://localhost:9000/step/${stepId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Step updated successfully');
        } catch (error) {
            console.error('Failed to update step:', error);
            alert('Failed to update step');
        }
    };



    const { step, name, title, description, contact, filePath } = stepData;

    return (
        <>
            <Header />
            <form className="step-form" onSubmit={handleSubmit}>
                <h2>Edit step details</h2>
                <div className="form-group">
                    <label htmlFor="step">Step:</label>
                    <input type="text" id="step" name="step" value={step} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={title} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={description} onChange={handleChange}></textarea>
                </div>
                <img src={`http://localhost:9000/${filePath}`} alt="Step Image"
                style={{ width: '230px', height: '200px' }} className="privatetraining-image" />
                <div className="form-group">
                    <label>Upload suitable image for this step:</label>
                    <input type="file" name="file" onChange={handleImageChange}  />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input type="text" id="contact" name="contact" value={contact} onChange={handleChange} pattern="[0-9]{10}" title="Contact number must be 10 digits" required />
                </div>

                <button type="submit" className="submit-button">Update</button>
            </form>
            
            <Footer />
        </>
    );
};

export default EditStepForm;
