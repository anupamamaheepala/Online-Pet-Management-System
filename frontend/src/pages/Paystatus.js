import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/paystatus.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Paystatus = () => {
    const [payerInfo, setPayerInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                const id = searchParams.get('id');
                if (!id) {
                    console.error('No ID parameter found in URL');
                    return;
                }
                const response = await axios.get(`http://localhost:9000/payerinfo/${id}`);
                setPayerInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <Header/>
        <div className="paystatus-container">
            <h2 className="paystatus-heading">Payment Status</h2>
            {loading ? (
                <p className="loading-message">Loading...</p>
            ) : (
                <div className="payer-info">
                    <p className="payer-info-item"><span className="label">Name :</span><span className="value">{payerInfo.name}</span></p>
                    <p className="payer-info-item"><span className="label">Email :</span><span className="value">{payerInfo.email}</span></p>
                    <p className="payer-info-item"><span className="label">Phone Number :</span><span className="value">{payerInfo.phonenumber}</span></p>
                    <p className="payer-info-item"><span className="label">Address :</span><span className="value">{payerInfo.address}</span></p>
                    <p className="payer-info-item"><span className="label">Purpose :</span><span className="value">{payerInfo.purpose}</span></p>
                    <p className="payer-info-item"><span className="label">Amount :</span><span className="value">{payerInfo.amount}</span></p>
                </div>
            )}
        </div>
        <Footer/>
        </>
    );
}

export default Paystatus;

