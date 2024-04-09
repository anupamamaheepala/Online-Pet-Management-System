import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/advertisement.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConfirmAdvertisement = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/ads/")
            .then((res) => {
                setAds(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });

    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Advertisement?")) {
            try {
                await axios.delete(`http://localhost:9000/ads/${id}`);
                setAds(ads.filter((ad) => ad._id !== id));
                alert('Advertisement deleted successfully');
            } catch (error) {
                alert('Failed to delete Advertisement');
            }
        } else {
            alert('Deletion cancelled.');
        }
    };

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
                        <th>Pet's image</th>
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
                            <td><img src={`http://localhost:9000/${ad.filePath}`} alt="Pet" style={{ width: '80px' }} /></td>
                            <td>{ad.contact}</td>
                            <td>
                                <div className="ma_button-container">
                                    <button className="btn btn-warning">Confirm</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(ad._id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </>
    );
}

export default ConfirmAdvertisement;
