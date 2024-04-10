//Advertisement.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/advertisement.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


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
        
    ]);

    

    return (
        <>
        <Header/>
             <div className="ma_button-container">
                
                    <Link to="/AddAdvertisement" className="ma_add_button">Add a new advertisement</Link>
                
                
                    <Link to="/MyAdvertisements" className="ma_add_button">My advertisements</Link>
                
            </div>
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
                            {advertisement.image && <img src={advertisement.image} alt={advertisement.title} className="ma_advertisement-photo" />}
                            <p>{advertisement.description}</p>
                            {advertisement.price && <p>Price: {advertisement.price}</p>}
                            <p>Contact details: {advertisement.contact}</p>
                            
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default CheckAdvertisementDetails;
