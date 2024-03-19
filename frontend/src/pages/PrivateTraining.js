import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Trainingapp.css';

const PrivateTraining = () => {
  const [report, setReport] = useState(null);
  const [date, setDate] = useState('');

  const handleReportUpload = (e) => {
    const file = e.target.files[0];
    setReport(file);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('report', report); // Append the report file
    try {
      const response = await fetch('/api/training', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Training application submitted successfully.');
        // Redirect or show success message
      } else {
        console.error('Failed to submit training application.');
      }
    } catch (error) {
      console.error('Error submitting training application:', error);
    }
  };

  return (
    <div>
    <Header/>
      <div className="background-container">
        <img src="/images/pt.jpg" alt="Pet Training Header Image" className="img-fluid mb-4" />
        <div className="container">
          <div className="right-side">
            <div className="info-container">
              <h2>Training Program</h2>
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
                {/* Other form fields */}
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
      
        <Footer/>
      </div>
  );
};

export default PrivateTraining;
