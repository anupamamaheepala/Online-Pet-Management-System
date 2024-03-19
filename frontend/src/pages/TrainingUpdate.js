import React from 'react';
import '../css/Trainingprogram.css';
import Sidebar from '../components/Sidebar';


const TrainingUpdate = () => {
    return (
        <div>

        <Sidebar>

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

</div>
            </Sidebar>
            </div>
       
      
    );
}

export default TrainingUpdate;
