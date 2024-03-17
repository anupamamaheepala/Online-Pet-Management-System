import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import '../css/Trainingapp.css'; // Import your CSS file




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
        // You can handle form submission logic here, like sending data to the server
        console.log('Report:', report);
        console.log('Date:', date);
    };
    return (
        <Layout>
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
