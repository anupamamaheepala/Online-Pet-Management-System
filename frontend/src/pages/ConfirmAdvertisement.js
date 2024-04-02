import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/advertisement.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConfirmAdvertisement = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/ads/")
            .then((res) => {
                console.log(res.data); // Log the data received from the API
                setAds(res.data); // Set the ads data to the state
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);
    
    return (
        <>
            <Header />
            <h1><center>Pending Advertisement</center></h1>
            <table className="ma_advertisement-table">
                <thead>
                    <tr>
                        <th>Owner Name</th>
                        <th>Email</th>
                        <th>Title</th>
                        <th>Breed</th>
                        <th>Purpose</th>
                        <th>Description</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.map((ad) => (
                        <tr key={ad._id}>
                            <td>{ad.ownerName}</td>
                            <td>{ad.email}</td>
                            <td>{ad.title}</td>
                            <td>{ad.Breed}</td>
                            <td>{ad.purpose}</td>
                            <td>{ad.description}</td>
                            <td>{ad.contact}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </>
    );
}

export default ConfirmAdvertisement;
