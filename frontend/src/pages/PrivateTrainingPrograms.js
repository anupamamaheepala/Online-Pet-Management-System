import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import '../css/Trainingprogram.css'; // Assuming the CSS file is named Trainingprogram.css
import { Link } from 'react-router-dom';

const PrivateTrainingPrograms = () => {
    // Sample data for privatetrainings
    const privatetrainings = [
        {
            id: 1,
            step: "Step 01",
            name: "PRIVATE DOG TRAINING",
            description: "Get  Stay Fit With The Best Workout Buddy Ever!",
            price: "Rs.5000.00",
            image: "/images/hd1.png"
        },
        {
            id: 2,
            step:"step 02",
            name: "PRIVATE CANINE & HUMAN FITNESS TRAINING",
            description: "A set of interactive toys to keep your cat entertained.",
            price: "Rs.15000",
            image: "/images/hd2.png"
        },
        {
            id: 3,
            step:"step 03",
            name: "PRIVATE CANINE FITNESS TRAINING",
            description: "Help Your Dog Lose Weight, Gain Strength, Burn Energy & More.",
            price: "Rs.8000.00",
            image: "/images/hd3.png"
        }
    ];

    return (
        <div>
            <Header />
            <h2 className="training-topic">Private Training Programs</h2>
            <div className="privatetraining-grid"> {/* Changed product-grid to privatetraining-grid */}
                {privatetrainings.map(privatetraining => (
                    <div key={privatetraining.id} className="privatetraining-item"> {/* Changed product-item to privatetraining-item */}
                        <h4 className="privatetraining-step">{privatetraining.step}</h4> {/* Changed product-step to privatetraining-step */}
                        <img src={privatetraining.image} alt={privatetraining.name} className="privatetraining-image" /> {/* Changed product-image to privatetraining-image */}
                        <div className="privatetraining-details"> {/* Changed product-details to privatetraining-details */}
                            <h3 className="privatetraining-name">{privatetraining.name}</h3> {/* Changed product-name to privatetraining-name */}
                            <p className="privatetraining-description">{privatetraining.description}</p> {/* Changed product-description to privatetraining-description */}
                            
                            <div className="row justify-content-center">
                                
                                <div className="col-auto">
                                    &nbsp;
                                </div>
                                <div className="col">
                                    <button className="add-button">Learn more</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                ))}
              
            </div>
            <div className="col" >
                                    <Link to='/privateTraining'>
                                        <button className="trainingadd-button">Apply</button>
                                    </Link>
                                </div>
            <Footer />
        </div>
    );
}

export default PrivateTrainingPrograms;
