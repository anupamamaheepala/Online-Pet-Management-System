import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import '../css/Trainingprogram.css'; // Assuming the CSS file is named Trainingprogram.css
import { Link } from 'react-router-dom';

const PrivateTrainingPrograms = () => {
    const [privatetrainings, setPrivatetrainings] = useState([]);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [error, setError] = useState(null);

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

    const handleLearnMoreClick = (description) => {
        setSelectedDescription(description);
    };

    if (error) {
        return (
            <>
                <Header />
                <div>Error fetching Steps: {error.message}</div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <h2 className="training-topic">Private Training Programs</h2>
            <div className="privatetraining-grid">
                {privatetrainings.map(privatetraining => (
                    <div key={privatetraining._id} className="privatetraining-item">
                        <img src={`http://localhost:9000/${privatetraining.filePath.replace(/\\/g, '/')}`}
                            style={{ width: '230px', height: '200px' }} className="privatetraining-image" />

                        <h4 className="privatetraining-step">{privatetraining.step}</h4>
                        <div className="privatetraining-details">
                            <h3 className="privatetraining-name">{privatetraining.name}</h3>
                            {selectedDescription === privatetraining.description && (
                                <p className="privatetraining-description">{privatetraining.description}</p>
                            )}
                            <div className="row justify-content-center">
                                <div className="col-auto">&nbsp;</div>
                                <div className="col">
                                    <button className="add-button" onClick={() => handleLearnMoreClick(privatetraining.description)}>Learn more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="col">
                <Link to='/privateTraining'>
                    <button className="trainingadd-button">Apply</button>
                </Link>
            </div>
            <Footer />
        </>
    );
}

export default PrivateTrainingPrograms;
