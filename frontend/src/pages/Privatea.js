import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import '../css/Trainingapp.css';

const Privatea = () => {
    const [report, setReport] = useState(null);
    const [date, setDate] = useState('');

    const handleReportUpload = (e) => {
        const file = e.target.files[0];
        setReport(file);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Report:', report);
        console.log('Date:', date);
        // Add logic here to handle form submission, such as sending data to the server
    };

    return (
        <Layout>
            <div className="background-container">
                <img src="/images/pt.jpg" alt="Pet Training Header Image" className="img-fluid mb-4" />
                <div className="container">
                    <div className="right-side">
                        <div className="info-container">
                            <h2></h2>
                            <p>Training Program information...</p>
                        </div>
                    </div>
                    <div className="left-side">
                        <div className="form-container">
                            <h2>Fill the Application</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" id="name" name="name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dogName">Dog Name:</label>
                                    <input type="text" id="dogName" name="dogName" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dogAge">Dog Age:</label>
                                    <input type="number" id="dogAge" name="dogAge" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dogBreed">Dog Breed:</label>
                                    <input type="text" id="dogBreed" name="dogBreed" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dogVaccination">Dog Vaccination:</label>
                                    <input type="text" id="dogVaccination" name="dogVaccination" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message:</label>
                                    <textarea id="message" name="message"></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="report">Health Checkup Report:</label>
                                    <input type="file" id="report" name="report" accept=".pdf,.jpg,.jpeg" onChange={handleReportUpload} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Report Date:</label>
                                    <input type="date" id="date" name="date" value={date} onChange={handleDateChange} />
                                </div>
                                <div className="form-group">
                                    <p>Why do we ask for this? We care about the safety of all pets and our trainers, and this information helps us maintain a healthy environment.</p>
                                </div>
                                <div className="form-group">
                                    <Link to="/schedule-appointment">Schedule Appointment</Link>
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Privatea;
