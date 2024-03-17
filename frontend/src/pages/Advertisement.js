import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import '../cssfiles/advertisement.css';

const Advertisement = () => {
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
                            {/* You can conditionally render an image if available */}
                            {advertisement.image && <img src={advertisement.image} alt={advertisement.title} className="advertisement-photo" />}
                            <div className="advertisement-details">
                                <h4>{advertisement.title}</h4>
                                <p>{advertisement.description}</p>
                                {advertisement.price && <p>Price: {advertisement.price}</p>}
                                <p>Contact details: {advertisement.contact}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default Advertisement;
