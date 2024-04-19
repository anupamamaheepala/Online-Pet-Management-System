import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../css/advertisement.css';
import axios from 'axios';

const AllAdvertisements = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        getAllConfirmedAdvertisements();
    }, []);

    const getAllConfirmedAdvertisements = async () => {
        try {
            const res = await axios.get("http://localhost:9000/confirmedads/confirmedads");
            setAdvertisements(res.data);
        } catch (error) {
            console.error('Error fetching advertisements:', error);
        }
    };

    const handleImageClick = (imageURL) => {
        setSelectedImage(imageURL);
    };

    return (
        <>
            <Header/>
            
                
                    <div>
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
                            {advertisements.map(advertisement => (
                                <tr key={advertisement._id}>
                                    <td>{advertisement.ownerName}</td>
                                    <td>{advertisement.email}</td>
                                    <td>{advertisement.title}</td>
                                    <td>{advertisement.Breed}</td>
                                    <td>{advertisement.purpose}</td>
                                    <td>{advertisement.description}</td>
                                    <td>
                                        <img 
                                            src={`http://localhost:9000/${advertisement.filePath.replace(/\\/g, '/')}`} 
                                            alt="Pet" 
                                            style={{ width: '130px', height: '130px', cursor: 'pointer' }}
                                            onClick={() => handleImageClick(`http://localhost:9000/${advertisement.filePath.replace(/\\/g, '/')}`)}
                                        />
                                    </td>
                                    <td>{advertisement.contact}</td>
                                    <td>
                                        <div className="ma_button-container">
                                            <Link to={`/edit/${advertisement._id}`} className="ma_add_button ma_confirm_button1">Edit</Link>
                                            <Link to={`/delete/${advertisement._id}`} className="ma_add_button ma_reject_button">Delete</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
               
            <Footer />
        </>
    );
}

export default AllAdvertisements;
