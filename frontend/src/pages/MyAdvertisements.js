
import '../css/advertisement.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyAdvertisements = () => {
    return (
        <>
            <Header /> 
           
            <div className="ma_advertisement-container">
                <div className="ma_advertisement-column">
                    <h3>Pets for sale</h3>
                    <div className="ma_advertisement-box">
                        <img src="pet1.jpg" alt="Pet for sale" className="ma_advertisement-photo" />
                        <div className="ma_advertisement-details">
                            <h4>Ad Title</h4>
                            <p>Description of the pet for sale.</p>
                            <p>Price: LKRXXX</p>
                            <p>Contact details</p>
                            <div className="ma_advertisement-buttons">
                         <div className="ma_button-container">
        <Link to="/AddAdvertisement" className="ma_add_button ma_confirm_button">Edit</Link>
            
        </div>
        <div className="ma_button-container">
            <Link to="/MyAdvertisements" className="ma_add_button ma_reject_button">Delete</Link>
        </div>
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
