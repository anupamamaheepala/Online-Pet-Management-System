import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/advertisement.css';

const Advertisement = () => {
    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/confirmedAds")
            .then((res) => {
                setAdvertisements(res.data);
            })
            .catch((err) => {
                alert(err.message);
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
                    <div key={advertisement._id} className="ma_advertisement-column">
                        <h3>{advertisement.type}</h3>
                        <div className="ma_advertisement-box">
                            <label htmlFor={advertisement._id}>{advertisement.title}</label>
                            {advertisement.image && <img src={`http://localhost:9000/${advertisement.filePath.replace(/\\/g, '/')}`} alt={advertisement.title} className="ma_advertisement-photo" />}
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

export default Advertisement;
