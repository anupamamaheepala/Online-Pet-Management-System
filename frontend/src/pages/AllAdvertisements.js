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
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Advertisement?")) {
            try {
                await axios.delete(`http://localhost:9000/confirmedads/confirmedads/${id}`);
                setAdvertisements(prevAds => prevAds.filter((advertisement) => advertisements._id !== id));
    
                alert('Advertisement deleted successfully');
            } catch (error) {
                console.log(error)
                alert('Failed to delete Advertisement');
            }
        } else {
            alert('Deletion cancelled.');
        }
    };
    

    const handleImageClick = (imageURL) => {
        setSelectedImage(imageURL);
    };

    return (
        <>
            <Header/>
    
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
                                            <button className="btn btn-danger" onClick={() => handleDelete(advertisement._id)}>Delete</button>
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

export default AllAdvertisements;
