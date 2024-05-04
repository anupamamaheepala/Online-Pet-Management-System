import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyAdvertisements = ({ userId }) => {
    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        const fetchAdvertisements = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/ads/user/${userId}`);
                setAdvertisements(response.data);
            } catch (error) {
                console.error('Error fetching advertisements:', error);
            }
        };

        if (userId) {
            fetchAdvertisements();
        }
    }, [userId]);

    return (
        <>
            <Header /> 
            <div className="ma_advertisement-container">
                {advertisements.map(advertisement => (
                    <div key={advertisement._id} className="ma_advertisement-column">
                        <h3>{advertisement.purpose}</h3>
                        <div className="ma_advertisement-box">
                            <img src={`http://localhost:9000/${advertisement.filePath}`} alt="Pet for sale" className="ma_advertisement-photo" />
                            <div className="ma_advertisement-details">
                                <p>{advertisement.description}</p>
                                <p>Contact details: {advertisement.contact}</p>
                                <div className="ma_advertisement-buttons">
                                    <Link to={`/pay/${advertisement._id}`} className="ma_add_button ma_confirm_button">Pay</Link>
                                    <Link to={`/edit/${advertisement._id}`} className="ma_add_button ma_confirm_button">Edit</Link>
                                    <Link to={`/delete/${advertisement._id}`} className="ma_add_button ma_reject_button">Delete</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default MyAdvertisements;
