import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import '../css/Trainingprogram.css';
import { Link } from 'react-router-dom';

const TrainingPrograms = () => {
    return (
        <>
        <Header/>
              <div style={{ position: "relative" ,width:'90%',alignItems:'center' ,marginLeft:'100px'}}>
                <img src="/images/tp1.jpg" alt="Pet Training Header Image" className="img-fluid mb-4" />

                <div style={{ position: "absolute", top: "25%", left: "30%", transform: "translate(-50%, -50%)" }}>
                    <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>Welcome to Pet Training</h1>
                    <p className="lead">Get your pet trained well!</p>
                </div>
            </div>

            <section className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <Link to="/PrivateTrainingPrograms" className="btn btn-outline-primary btn-lg btn-block mb-4 alo55">
                            <img src="/images/ptt1.jpeg" alt="Private Training Icon" className="img-fluid" />
                            Private Training Programs
                        </Link>
                    </div>
                    <div className="col-md-4 text-center" >
                        <Link to="/GroupTrainingPrograms" className="btn btn-outline-primary btn-lg btn-block mb-4 alo55" style={{height:'273px'}}>
                            <img src="/images/grouptraining.jpg" alt="Group Training Icon" className="img-fluid"  style={{height:'220px'}}/>
                            Group Training Programs
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <Link to="/NoIdeaPage" className="btn btn-outline-primary btn-lg btn-block mb-4 alo55">
                            I Have No Idea
                        </Link>
                    </div>
                </div>
            </section>

            <div className="rec-row">
                <div className="info-section">
                    <img src="/images/tp1.jpg" alt="Info Image" />
                    <div className="overlay"></div>

                    <Link to='/pages/trainingb' className="btn btn-light alo55">
                        <div className="inner-rectangle" style={{ top: '50%', left: '30%' }}>
                            <h5>GET STARTED WITH PRIVATE TRAINING</h5>
                        </div>
                    </Link>

                    <Link to='/pages/trainingb' className="btn btn-light alo55">
                        <div className="inner-rectangle" style={{ top: '50%', left: '50%' }}>
                            <h5>GET STARTED WITH GROUP TRAINING</h5>
                        </div>
                    </Link>

                    <Link to="#" className="btn btn-light alo55">
                        <div className="inner-rectangle" style={{ top: '50%', left: '70%' }}>
                            <h5>ABOUT OUR TRAINERS</h5>
                        </div>
                    </Link>
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
        
        <Footer/>
        </>
    );
}

export default TrainingPrograms;
