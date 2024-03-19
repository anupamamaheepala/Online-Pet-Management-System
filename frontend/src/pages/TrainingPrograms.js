import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import '../css/Trainingprogram.css';
import { Link } from 'react-router-dom';



const TrainingPrograms = () => {
    return (
        <div>
        <Header/>

            <div className="product-catalog">
                <div className="search-bar">
                    <input type="text" placeholder="Search products" />
                    <button className="search-button">Search</button>
                   
                </div>
                 
            <div style={{ position: "relative" }}>
                <img src="/images/tp1.jpg" alt="Pet Training Header Image" className="img-fluid mb-4" />

                <div style={{ position: "absolute", top: "25%", left: "20%", transform: "translate(-50%, -50%)" }}>
                    <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>Welcome to Pet Training</h1>
                    <p className="lead">Get your pet trained well!</p>
                </div>
            </div>

            <section className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <a href="/PrivateTrainingPrograms" className="btn btn-outline-primary btn-lg btn-block mb-4">
                            <img src="/images/tp6.jpg" alt="Private Training Icon" className="img-fluid" />
                            Private Training Programs
                        </a>
                    </div>
                    <div className="col-md-4 text-center">
                        <a href="#" className="btn btn-outline-primary btn-lg btn-block mb-4">
                            <img src="/images/tp3.jpg" alt="Group Training Icon" className="img-fluid" />
                            Group Training Programs
                        </a>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <a href="#" className="btn btn-outline-primary btn-lg btn-block mb-4">
                            I Have No Idea
                        </a>
                    </div>
                </div>
            </section>

            <div className="rec-row">
                <div className="info-section">
                    <img src="/images/tp1.jpg" alt="Info Image" />
                    <div className="overlay"></div>

                    <a href='/pages/trainingb' className="btn btn-light">
                        <div className="inner-rectangle" style={{ top: '50%', left: '30%' }}>
                            <h5>GET STARTED WITH PRIVATE TRAINING</h5>
                        </div>
                    </a>

                    <a href='#' className="btn btn-light">
                        <div className="inner-rectangle" style={{ top: '50%', left: '50%' }}>
                            <h5>GET STARTED WITH GROUP TRAINING</h5>
                        </div>
                    </a>

                    <a href="#" className="btn btn-light">
                        <div className="inner-rectangle" style={{ top: '50%', left: '70%' }}>
                            <h5>ABOUT AOUT TRAINERS</h5>
                        </div>
                    </a>
                </div>
            </div>

            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '400px' }}>
                <div className="row">
                    <div className="text-column">
                        <h2>Training Programs</h2>
                        <p>Description</p>
                    </div>
                    <div className="image-column">
                        <img src="/images/tp2.jpg" alt="Image" style={{ height: "300px" }} />
                    </div>
                </div>
            </div>
            </div>
        <Footer/>
        </div>
    );
}

export default TrainingPrograms;
