import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../css/advertisement.css';
import { Link } from 'react-router-dom';


const ConfirmAdvertisement = () => {
    
    return (
        <Layout>
            <div className="advertisement-container">
                <div className="advertisement-column">
                    <h3>Pets for sale</h3>
                    <div className="advertisement-box">
                        
                        <label htmlFor="advertisement1">Ad Title</label>
                        <p>Description of the pet for sale.</p>
                        <p>Price: LKRXXX</p>
                        <p>Contact details</p>
                        <div className="advertisement-buttons">
    <div className="button-container">
        <Link to="/Payerinfo" className="add_button confirm_button1">Calculate payment</Link>
    </div>

    <div className="button-container">
        <Link to="/AllAdvertisements" className="add_button confirm_button">Publish</Link>
    </div>
</div>

                   
</div>
</div>
                </div>
            
        </Layout>
    );
}

export default ConfirmAdvertisement;
