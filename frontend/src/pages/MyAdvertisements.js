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
                <div className="ma_advertisement-column">
                    <h3>My advertisements</h3>
                    <div className="ma_advertisement-box">
                        <div className="ma_advertisement-details">
                            <p>This puppy for sale (LKR 12000)</p>
                            <p>0773641569</p>
                            <div className="ma_advertisement-buttons">
                                <Link to="/payerinfo" className="ma_add_button ma_confirm_button">Pay</Link>
                                <Link to="/EditAdvertisement" className="ma_add_button ma_confirm_button">Edit</Link>
                                <div className="ma_add_button ma_reject_button">Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MyAdvertisements;
