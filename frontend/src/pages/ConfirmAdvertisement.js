import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/advertisement.css';
import { Link } from 'react-router-dom';


const ConfirmAdvertisement = () => {
    
    return (
        <>
        <Header/>
            <div className="ma_advertisement-container">
                <div className="ma_advertisement-column">
                    <h3>Pets for sale</h3>
                    <div className="ma_advertisement-box">
                        
                        <label htmlFor="advertisement1">Ad Title</label>
                        <p>Description of the pet for sale.</p>
                        <p>Price: LKRXXX</p>
                        <p>Contact details</p>
                        <div className="ma_advertisement-buttons">
    <div className="ma_button-container">
        <Link to="/Payerinfo" className="ma_add_button ma_confirm_button1">Calculate payment</Link>
    </div>

    <div className="ma_button-container">
        <Link to="/AllAdvertisements" className="ma_add_button ma_confirm_button">Publish</Link>
    </div>
</div>

                   
</div>
</div>
                </div>
            
                <Footer />
            </>
    );
}

export default ConfirmAdvertisement;
