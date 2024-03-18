
import '../css/advertisement.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyAdvertisements = () => {
    return (
        <>
            <Header /> 
           
            <div className="advertisement-container">
                <div className="advertisement-column">
                    <h3>Pets for sale</h3>
                    <div className="advertisement-box">
                        <img src="pet1.jpg" alt="Pet for sale" className="advertisement-photo" />
                        <div className="advertisement-details">
                            <h4>Ad Title</h4>
                            <p>Description of the pet for sale.</p>
                            <p>Price: LKRXXX</p>
                            <p>Contact details</p>
                            <div className="advertisement-buttons">
                         <div className="button-container">
        <Link to="/AddAdvertisement" className="add_button confirm_button">Edit</Link>
            
        </div>
        <div className="button-container">
            <Link to="/MyAdvertisements" className="add_button reject_button">Delete</Link>
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
