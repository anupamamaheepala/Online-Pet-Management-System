import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdsHeader from '../components/ads components/AdsHeader';
import '../css/advertisement.css';
import { Link } from 'react-router-dom';


const ConfirmAdvertisement = () => {
    const [ads, setAds] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate(); 

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
                setAds(prevAds => prevAds.filter((ad) => ad._id !== id));

                alert('Advertisement deleted successfully');
            } catch (error) {
                alert('Failed to delete Advertisement');
            }
        } else {
            alert('Deletion cancelled.');
        }
    };

    const handleConfirm = async (id) => {
        try {
            // Send a PUT request to confirm the advertisement
            await axios.put(`http://localhost:9000/ads/${id}/confirm`);
            alert('Advertisement confirmed and moved successfully');
            
            // After confirmation, update the local state to remove the confirmed advertisement
            setAds(prevAds => prevAds.filter((ad) => ad._id !== id));

        } catch (error) {
            alert('Failed to confirm Advertisement');
        }
    };

    const handleImageClick = (imageURL) => {
        setSelectedImage(imageURL);
    };

    return (
        <>
            <AdsHeader />
            
            <Link to="/AllAdvertisements" className="ma_add_button">View all published advertisements list</Link>            <div className="ma_table-container_center">
            <h1 className="ma_text_container"><center>Pending Advertisement</center></h1>
            <table className="ma_advertisement-table">
                <thead>
                    <tr>
                        <th>Owner Name</th>
                        <th>Email</th>
                        <th>Pet type</th>
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
                            <td>{ad.pet_type}</td>
                            <td>{ad.Breed}</td>
                            <td>{ad.purpose}</td>
                            <td>{ad.description}</td>
                            <td>
                                <img 
                                    src={`http://localhost:9000/${ad.filePath.replace(/\\/g, '/')}`} 
                                    alt="Pet" 
                                    style={{ width: '130px', height: '130px', cursor: 'pointer' }}
                                    onClick={() => handleImageClick(`http://localhost:9000/${ad.filePath.replace(/\\/g, '/')}`)}
                                />
                            </td>
                            <td>{ad.contact}</td>
                            <td>
                                <div className="ma_button-container">
                                    <button className="btn btn-warning" style={{ marginRight: '5px' }} onClick={() => handleConfirm(ad._id)}>Confirm</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(ad._id)}>Delete</button>
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

export default ConfirmAdvertisement;
