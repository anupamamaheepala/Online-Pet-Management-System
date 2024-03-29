import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../css/advertisement.css';


const CheckAdvertisementDetails = () => {
    const [advertisements, setAdvertisements] = useState([
        {
            id: 'advertisement1',
            type: 'Pets for sale',
            title: 'Ad Title',
            description: 'Description of the pet for sale.',
            price: 'LKRXXX',
            contact: 'Contact details'
        },
        {
            id: 'advertisement2',
            type: 'Lost & found',
            title: 'Lost Pet Title',
            description: 'Description of the lost pet.',
            contact: 'Contact details'
        },
        // Add more advertisement data as needed
    ]);

    const handleConfirm = (advertisementId) => {
        // Implement confirmation logic here
    };

    const handleReject = (advertisementId) => {
        // Implement rejection logic here
    };

    return (
        <>
        <Header/>
            <div className="ma_advertisement-container">
                {advertisements.map(advertisement => (
                    <div key={advertisement.id} className="ma_advertisement-column">
                        <h3>{advertisement.type}</h3>
                        <div className="ma_advertisement-box">
                            <input
                                type="checkbox"
                                id={advertisement.id}
                                // Implement checked state management here
                            />
                            <label htmlFor={advertisement.id}>{advertisement.title}</label>
                            <p>{advertisement.description}</p>
                            {advertisement.price && <p>Price: {advertisement.price}</p>}
                            <p>Contact details: {advertisement.contact}</p>
                            <div className="ma_advertisement-buttons">
                                
                                <div className="ma_button-container">
                                    <button onClick={() => handleReject(advertisement.id)} className="ma_add_button ma_reject_button">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        <Footer/>
        </>
    );
}

export default CheckAdvertisementDetails;
