import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import '../cssfiles/advertisement.css';

const CheckAdvertisementDetails = () => {
    const [advertisements, setAdvertisements] = useState([
        {
            id: 'advertisement1',
            type: 'Pets for sale',
            title: 'Ad Title',
            description: 'Description of the pet for sale.',
            price: 'LKRXXX',
            contact: 'Contact details',
            // Add image URL for the pet
            image: 'pet1.jpg'
        },
        {
            id: 'advertisement2',
            type: 'Lost & found',
            title: 'Lost Pet Title',
            description: 'Description of the lost pet.',
            contact: 'Contact details',
            // Add image URL for the lost pet
            image: 'lostpet1.jpg'
        },
        {
            id: 'advertisement1',
            type: 'Pets for sale',
            title: 'Ad Title',
            description: 'Description of the pet for sale.',
            price: 'LKRXXX',
            contact: 'Contact details',
            // Add image URL for the pet
            image: 'pet1.jpg'
        },
        {
            id: 'advertisement2',
            type: 'Lost & found',
            title: 'Lost Pet Title',
            description: 'Description of the lost pet.',
            contact: 'Contact details',
            // Add image URL for the lost pet
            image: 'lostpet1.jpg'
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
        <Layout>
             <div className="button-container">
                <div className="advertisement-buttons">
                    <Link to="/AddAdvertisement" className="add_button">Add a new advertisement</Link>
                </div>
                <div className="advertisement-buttons">
                    <Link to="/MyAdvertisements" className="add_button">My advertisements</Link>
                </div>
            </div>
            <div className="advertisement-container">
                {advertisements.map(advertisement => (
                    <div key={advertisement.id} className="advertisement-column">
                        <h3>{advertisement.type}</h3>
                        <div className="advertisement-box">
                            <input
                                type="checkbox"
                                id={advertisement.id}
                                // Implement checked state management here
                            />
                            <label htmlFor={advertisement.id}>{advertisement.title}</label>
                            {advertisement.image && <img src={advertisement.image} alt={advertisement.title} className="advertisement-photo" />}
                            <p>{advertisement.description}</p>
                            {advertisement.price && <p>Price: {advertisement.price}</p>}
                            <p>Contact details: {advertisement.contact}</p>
                            <div className="advertisement-buttons">
                                <div className="button-container">
                                    <button onClick={() => handleConfirm(advertisement.id)} className="add_button confirm_button">Confirm</button>
                                </div>
                                <div className="button-container">
                                    <button onClick={() => handleReject(advertisement.id)} className="add_button reject_button">Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default CheckAdvertisementDetails;
