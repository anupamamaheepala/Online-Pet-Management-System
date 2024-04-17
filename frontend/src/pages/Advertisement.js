import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/advertisement.css';

const Advertisement = () => {
    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        // Fetch data from the confirmedads endpoint
        axios.get('http://localhost:9000/confirmedads')
            .then(response => {
                // Set the fetched advertisements to state
                setAdvertisements(response.data);
            })
            .catch(error => {
                console.error('Error fetching advertisements:', error);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="ma_button-container">
                <Link to="/AddAdvertisement" className="ma_add_button">Add a new advertisement</Link>
                <Link to="/MyAdvertisements" className="ma_add_button">My advertisements</Link>
            </div>
            <div className="ma_advertisement-container">
                {advertisements.map(advertisement => (
                    <div key={advertisement._id} className="ma_advertisement-card">
                        <img src={`http://localhost:9000/${advertisement.filePath.replace(/\\/g, '/')}`} alt={advertisement.title} 
                        style={{ width: '290px', height: 'auto', cursor: 'pointer' }}
                        className="ma_advertisement-image" />
                        <div className="ma_advertisement-details">
                            <h3 className="ma_advertisement-title">{advertisement.title}</h3>
                            <p className="ma_advertisement-description">{advertisement.description}</p>
                            <p className="ma_advertisement-contact">Contact: {advertisement.contact}</p>
                            {advertisement.price && <p className="ma_advertisement-price">Price: {advertisement.price}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default Advertisement;
