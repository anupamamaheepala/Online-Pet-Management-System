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
        <div className="anupstcontainer">
            <h2 className="anupstheading">Payment Status</h2>
            {loading ? (
                <p className="anupstmessage">Loading...</p>
            ) : (
                <div className="anupstpayerstatus">
                    <p className="anupstitem"><span className="anupstlabel">Name :</span><span className="anupstvalue">{payerInfo.name}</span></p>
                    <p className="anupstitem"><span className="anupstlabel">Email :</span><span className="anupstvalue">{payerInfo.email}</span></p>
                    <p className="anupstitem"><span className="anupstlabel">Phone Number :</span><span className="anupstvalue">{payerInfo.phonenumber}</span></p>
                    <p className="anupstitem"><span className="anupstlabel">Address :</span><span className="anupstvalue">{payerInfo.address}</span></p>
                    <p className="anupstitem"><span className="anupstlabel">Purpose :</span><span className="anupstvalue">{payerInfo.purpose}</span></p>
                    <p className="anupstitem"><span className="anupstlabel">Amount :</span><span className="anupstvalue">{payerInfo.amount}</span></p>
                </div>
            )}
        </div>
        <Footer/>
        </>
    );
}

export default Paystatus;

