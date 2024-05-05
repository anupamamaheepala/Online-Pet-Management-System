//Advertisement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/advertisement.css';
import { Link } from 'react-router-dom';

const Advertisement = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the confirmedads endpoint
        axios.get('http://localhost:9000/confirmedads/confirmedads')
            .then(response => {
                // Set the fetched advertisements to state
                setAdvertisements(response.data);
            })
            .catch(error => {
                console.error('Error fetching advertisements:', error);
                setError(error);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    if (error) {
        return (
            <>
                <Header />
                <div>Error fetching advertisements: {error.message}</div>
                <Footer />
            </>
        );
    }

    
    const filteredAdvertisements = advertisements.filter(advertisement =>
        (advertisement.pet_type && advertisement.pet_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (advertisement.purpose && advertisement.purpose.toLowerCase().includes(searchQuery.toLowerCase()))

    );

    return (
        <>
            <Header />
            
            
                <Link to="/AddAdvertisement" className="ma_add_button3">Add a new advertisement</Link>
                <Link to="/MyAdvertisements" className="ma_add_button">My advertisements</Link>
               
                <input
                
                    type="text"
                    placeholder="Search pet type..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="ma_search-input"
                />
           
            
            
           
            
            <div className="ma_advertisement-container">
                {filteredAdvertisements.map(advertisement => (
                    <div key={advertisement._id} className="ma_advertisement-card">
                        <img src={`http://localhost:9000/${advertisement.filePath.replace(/\\/g, '/')}`} alt={advertisement.title} 
                        style={{ width: '200px', height: '200px', cursor: 'pointer' }}
                        className="ma_advertisement-image" />
                        <div className="ma_advertisement-details">
                            <h3 className="ma_advertisement-description">{advertisement.Breed}</h3>
                            <p className="ma_advertisement-description">{advertisement.description}</p>
                            <p className="ma_advertisement-contact">Contact: {advertisement.contact}</p>
                            
                            
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default Advertisement;
