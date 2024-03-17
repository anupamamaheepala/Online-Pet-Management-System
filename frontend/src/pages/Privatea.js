import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Trainingapp.css'; // Import your CSS file

const PrivateA = () => {
    return (
        <div className="background-container">
            <img src="/images/pt.jpg" alt="Pet Training Header Image" className="img-fluid mb-4" />
            <div className="container">
                <div className="right-side">
                    {/* Information Section */}
                    <div className="info-container">
                        <h2>Class Information</h2>
                        {/* Include your class information here */}
                        <p>This is where you display the class information...</p>
                    </div>
                </div>
                <div className="left-side">
                    {/* Form Section */}
                    <div className="form-container">
                        <h2>Enter Your Details</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <textarea id="message" name="message"></textarea>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivateA;
