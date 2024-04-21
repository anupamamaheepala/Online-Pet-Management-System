import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import viewapplication from '../css/viewapplication.css';

const ViewApplication = () => {
    const [training, setTraining] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                const id = searchParams.get('id');
                if (!id) {
                    console.error('No ID parameter found in URL');
                    return;
                }
                const response = await axios.get(`http://localhost:9000/training/${id}`);
                setTraining(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className="alo22-view-application-container">
                <h2 className="alo22-view-application-heading">View Application</h2>
                {loading ? (
                    <p className="alo22-loading-message">Loading...</p>
                ) : (
                    <div className="alo22-application-info">
                        <div className="alo22-application-details">
                            <div className="alo22-status-box">
                                <span
                                    className={`alo22-status-label ${
                                        training.status === 'approved'
                                            ? 'alo22-approved'
                                            : training.status === 'pending'
                                            ? 'alo22-pending'
                                            : 'alo22-rejected'
                                    }`}
                                >
                                    {training.status}
                                </span>
                            </div>
                            <p className="alo22-application-info-item">
                                <span className="alo22-label">Owner's Name:</span>
                                <span className="alo22-value">{training.ownerName}</span>
                            </p>
                            <p className="alo22-application-info-item">
                                <span className="alo22-label">Address:</span>
                                <span className="alo22-value">{training.address}</span>
                            </p>
                            <p className="alo22-application-info-item">
                                <span className="alo22-label">Contact Number:</span>
                                <span className="alo22-value">{training.contact}</span>
                            </p>
                            <p className="alo22-application-info-item">
                                <span className="alo22-label">Dog's Name:</span>
                                <span className="alo22-value">{training.dogName}</span>
                            </p>
                            <p className="alo22-application-info-item">
                                <span className="alo22-label">Breed:</span>
                                <span className="alo22-value">{training.breed}</span>
                            </p>
                            <p className="alo22-application-info-item">
                                <span className="alo22-label">Age:</span>
                                <span className="alo22-value">{training.age}</span>
                            </p>
                            <div className="alo22-button-container">
                                {training.status === 'approved' && (
                                    <>
                                        <button className="alo22-btn alo22-pay-btn">Pay Now</button>
                                        <button className="alo22-btn alo22-register-btn">Register</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ViewApplication;