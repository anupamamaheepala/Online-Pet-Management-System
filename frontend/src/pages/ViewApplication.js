import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';


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
            <div className="view-application-container">
                <h2 className="view-application-heading">View Application</h2>
                {loading ? (
                    <p className="loading-message">Loading...</p>
                ) : (
                    <div className="application-info">
                        <p className="application-info-item"><span className="label">Owner's Name:</span><span className="value">{training.ownerName}</span></p>
                        <p className="application-info-item"><span className="label">Address:</span><span className="value">{training.address}</span></p>
                        <p className="application-info-item"><span className="label">Contact Number:</span><span className="value">{training.contact}</span></p>
                        <p className="application-info-item"><span className="label">Dog's Name:</span><span className="value">{training.dogName}</span></p>
                        <p className="application-info-item"><span className="label">Breed:</span><span className="value">{training.breed}</span></p>
                        <p className="application-info-item"><span className="label">Age:</span><span className="value">{training.age}</span></p>
                        {/* Add more details as needed */}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ViewApplication;
