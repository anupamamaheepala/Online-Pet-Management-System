//AllAdvertisements.js

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../css/advertisement.css';

const AllAdvertisements = () => {
    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        fetchAdvertisements();
    }, []);

    const fetchAdvertisements = async () => {
        try {
            // Mocking advertisement data
            const data = [
                {
                    id: 1,
                    type: "Pets for sale",
                    title: "Ad Title 1",
                    description: "Description of the pet for sale.",
                    price: "LKRXXX",
                    contact: "Contact details"
                },
                {
                    id: 2,
                    type: "Lost & found",
                    title: "Lost Pet Title 1",
                    description: "Description of the lost pet.",
                    contact: "Contact details"
                },
                {
                    id: 3,
                    type: "Pets for sale",
                    title: "Ad Title 1",
                    description: "Description of the pet for sale.",
                    price: "LKRXXX",
                    contact: "Contact details"
                },
                {
                    id: 4,
                    type: "Lost & found",
                    title: "Lost Pet Title 1",
                    description: "Description of the lost pet.",
                    contact: "Contact details"
                },
                // Add more advertisement data as needed
            ];
            setAdvertisements(data);
        } catch (error) {
            console.error('Error fetching advertisements:', error);
        }
    };

    return (
        <>
        <Header/>
            <div className="ma_advertisement-container">
                {advertisements.map(advertisement => (
                    <div key={advertisement.id} className="ma_advertisement-column">
                        <h3>{advertisement.type}</h3>
                        <div className="ma_advertisement-box">
                            {/* You can conditionally render an image if available */}
                            {advertisement.image && <img src={advertisement.image} alt={advertisement.title} className="ma_advertisement-photo" />}
                            <div className="ma_advertisement-details">
                                <h4>{advertisement.title}</h4>
                                <p>{advertisement.description}</p>
                                {advertisement.price && <p>Price: {advertisement.price}</p>}
                                <p>Contact details: {advertisement.contact}</p>
                                <div className="ma_advertisement-buttons">
                                    <div className="ma_button-container">
                                        <Link to="/ConfirmAdvertisement" className="ma_add_button ma_confirm_button1">Edit</Link>
                                    </div>
                                    <div className="ma_button-container">
                                        <Link to="/AllAdvertisements" className="ma_add_button ma_reject_button">Delete</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
            </>
    );
}

export default AllAdvertisements;
