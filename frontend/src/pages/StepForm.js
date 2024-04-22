import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/advertisement.css';
import '../css/Trainingprogram.css';
import Swal from 'sweetalert2';
import Editstepform from './Editstepform'; // Adjust the path as needed


//steeeeeeeeeeee


const StepForm = () => {
    const [privatetrainings, setPrivatetrainings] = useState([]);
    const [error, setError] = useState(null);
    const [editStepId, setEditStepId] = useState(null);
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);

    const [formData, setFormData] = useState({
        step: '',
        name: '',
        title: '',
        description: '',
        file: null,
        contact: ''
    });
    useEffect(() => {
        // Fetch data
        axios.get('http://localhost:9000/step/getss')
            .then(response => {
                setPrivatetrainings(response.data);
            })
            .catch(error => {
                console.error('Error fetching steps:', error);
                setError(error);
            });
    }, []);
    const handleLearnMoreClick = (index) => {
        setExpandedCardIndex(index);
    };


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

    const handleEdit = (id) => {
        Swal.fire({
            title: 'Edit Product',
            text: 'Do you want to edit this product?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, edit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setEditStepId(id);
            }
        });
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:9000/step/delete/${id}`);
            alert('Step deleted successfully');
            // Remove the deleted step from the state
            setPrivatetrainings(privatetrainings.filter(step => step._id !== id));
        } catch (error) {
            console.error('Error deleting step:', error);
            alert('Failed to delete step');
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
    <label htmlFor="step">Step:</label>
    <input
        type="number"
        id="step"
        name="step"
        value={step}
        onChange={onChange}
        min="1" // Set minimum value
        step="1" // Set step size
        placeholder="Step" // Placeholder text
        required
    />
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


            
            
            <h2 className="training-topic">Private Training Programs</h2>
            
            <div className="privatetraining-grid">
                {privatetrainings.map((privatetraining, index) => (
                    <div key={privatetraining._id} className="privatetraining-item1">
                        <img src={`http://localhost:9000/${privatetraining.filePath.replace(/\\/g, '/')}`}
                            style={{ width: '230px', height: '200px' }} className="privatetraining-image" />

                        <h4 className="privatetraining-step">Step {privatetraining.step} </h4>
                        <div className="privatetraining-details">
                            <h3 className="privatetraining-name">{privatetraining.name}</h3>
                            {expandedCardIndex === index && (
                                <p className="privatetraining-description">{privatetraining.description}</p>
                            )}
                            <div className="row justify-content-center">
                                <div className="col-auto">&nbsp;</div>
                                <div className="col">
                               
                                    <button className="add-button" onClick={() => handleLearnMoreClick(index)}>Learn more</button>

                                    <Link to={`/Editstepform/${privatetraining._id}`}>
                                        <button className="alo7-button" onClick={() => handleEdit(privatetraining._id)}>Edit</button>
                                    </Link>
                                    <button className="aloo-button2" onClick={() => handleDelete(privatetraining._id)}>Delete</button>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {editStepId && <Editstepform steptId={editStepId} />}
            
            <Footer />
        </>
    );
};

export default StepForm;
