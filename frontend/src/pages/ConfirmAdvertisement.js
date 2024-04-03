// ConfirmAdvertisement.js

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
                console.log(res.data);
                setAds(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    // const confirmAd = async (id) => {
    //     try {
    //         await confirmAdvertisement(id);
    //         setAds(ads.map(ad => ad._id === id ? { ...ad, confirmed: true } : ad));
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // };

    // const rejectAd = async (id) => {
    //     try {
    //         await rejectAdvertisement(id);
    //         setAds(ads.map(ad => ad._id === id ? { ...ad, rejected: true } : ad));
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // };

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
                        <th>Manage</th>
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
                            {/* <td>
                                <div className="ma_advertisement-buttons">
                                    <div className="ma_button-container">
                                        { !ad.confirmed && !ad.rejected &&
                                            <button className="ma_add_button ma_confirm_button1" onClick={() => confirmAd(ad._id)}>Confirm</button>
                                        }
                                    </div>
                                    { !ad.confirmed && !ad.rejected &&
                                        <button className="ma_add_button ma_reject_button" onClick={() => rejectAd(ad._id)}>Reject</button>
                                    }
                                </div>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </>
    );
}

export default ConfirmAdvertisement;
