import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

    // Function to handle edit button click
    const handleEdit = () => {
        // Implement edit functionality here
    };

    // Function to handle delete button click
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:9000/payerinfo/${payerInfo._id}`);
            // Handle success
            console.log(response.data); // or any other action upon success
            window.location.href = '/Payerinfo';
        } catch (error) {
            console.error('Error deleting data:', error);
            // Handle error
        }
    };

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

                    <div className="anupstbuttoncontainer">
                        <button onClick={handleEdit} className="btn btn-warning">Edit</button>
                        <button onClick={() => handleDelete(payerInfo._id)} className="btn btn-danger">Delete</button>
                    </div>
                    <div className="anupstbuttoncontainer">
                    <Link to="/cardpay" className="anupstpaymentlink">Card Payment</Link>
                    <Link to="/banktrans" className="anupstpaymentlink">Bank Transfer</Link>
                    </div>
                </div>
                
            )}
        </div>
        <Footer/>
        </>
    );
}

export default Paystatus;

