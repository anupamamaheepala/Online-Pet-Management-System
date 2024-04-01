import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Trainingapp.css';

const PrivateTraining = () => {
  const [report, setReport] = useState(null);
  const [date, setDate] = useState('');
  const [firstTime, setFirstTime] = useState(false);
  const [trainingCenter, setTrainingCenter] = useState('');
  const [trainingType, setTrainingType] = useState('');
  const [bringToCenter, setBringToCenter] = useState(false);
  const [additionalPayment, setAdditionalPayment] = useState(false);

  const handleReportUpload = (e) => {
    const file = e.target.files[0];
    setReport(file);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFirstTimeChange = (e) => {
    setFirstTime(e.target.value === 'yes');
  };

  const handleTrainingCenterChange = (e) => {
    setTrainingCenter(e.target.value);
  };

  const handleTrainingTypeChange = (e) => {
    setTrainingType(e.target.value);
  };

  const handleBringToCenterChange = (e) => {
    setBringToCenter(e.target.value === 'bring');
  };

  const handleAdditionalPaymentChange = (e) => {
    setAdditionalPayment(e.target.checked);
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
    <Header />
    <div className="alo-background-container">
      <img src="/images/pt.jpg" alt="Pet Training Header Image" className="img-fluid mb-4" />
      <div className="alo-container">
        <div className="alo-right-side">
          <div className="alo-info-container">
            <h2>Training Program</h2>
            <p>Training Program information...</p>
          </div>
        </div>
        <div className="alo-left-side">
          <div className="alo-form-container">
            <h2>Fill the Application</h2>
            <form onSubmit={handleSubmit}>
              <div className="alo-form-group">
                <label className="private" htmlFor="ownerName">Owner's Name:</label>
                <input type="text" id="ownerName" name="ownerName" />
              </div>
              <div className="alo-form-group">
                <label className="private" htmlFor="address">Address:</label>
                <textarea id="address" name="address"></textarea>
              </div>
              <div className="alo-form-group">
                <label className="private" htmlFor="contact">Contact Number:</label>
                <input type="tel" id="contact" name="contact" />
              </div>
              <div className="alo-form-group">
                <label className="private" htmlFor="dogName">Dog's Name:</label>
                <input type="text" id="dogName" name="dogName" />
              </div>
              <div className="alo-form-group">
                <label className="private" htmlFor="breed">Breed:</label>
                <input type="text" id="breed" name="breed" />
              </div>
              <div className="alo-form-group">
                <label className="private" htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" />
              </div>
              <div className="alo-form-group">
                <label className="private" htmlFor="lastVaccinatedDate">Last Vaccinated Date:</label>
                <input type="date" id="lastVaccinatedDate" name="lastVaccinatedDate" />
              </div>
              <div className="alo-form-group">
                <label className="private" htmlFor="vaccinationName">Vaccination Name:</label>
                <input type="text" id="vaccinationName" name="vaccinationName" />
              </div>
              <div className="alo-form-group">
                <label className="private" htmlFor="firstTime">Is this your first time for training program?</label>
                <select id="firstTime" name="firstTime" onChange={handleFirstTimeChange}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              {firstTime && (
                <div className="alo-form-group">
                  <label className="private" htmlFor="trainingCenter">Training Center Name:</label>
                  <input type="text" id="trainingCenter" name="trainingCenter" onChange={handleTrainingCenterChange} />
                </div>
              )}
              {firstTime && (
                <div className="alo-form-group">
                  <label className="private" htmlFor="trainingType">Training Type:</label>
                  <input type="text" id="trainingType" name="trainingType" onChange={handleTrainingTypeChange} />
                </div>
              )}
                {/* other form fields */}
                <div className="alo-form-group">
  <label className="private" htmlFor="bringToCenter">Will you bring your dog to the training center on the training day?</label>
  <select id="bringToCenter" name="bringToCenter" onChange={handleBringToCenterChange}>
    <option value="bring">Yes</option>
    <option value="keep">No, I'll keep my dog with you during the training period</option>
  </select>
</div>
{!bringToCenter && (
  <div className="alo-form-group">
    <div className="alo-check">
    <div className='alo-form-check'>
      
    <input type="checkbox" id="additionalPayment" name="additionalPayment" onChange={handleAdditionalPaymentChange} />
    </div>
    <label className="private" htmlFor="additionalPayment">I understand that an additional payment will apply for keeping my dog with you.</label>
    </div>
    <p>Additional charges apply for:</p>
    <ul>
      <li>High-quality, healthy food</li>
      <li>Exceptional care</li>
      <li>Dedicated attention with a separate instructor</li>
    </ul>
  </div>
)}

         <div className="alo-form-group">
                  <label htmlFor="report">Health Checkup Report:</label>
                  <input type="file" id="report" name="report" accept=".pdf,.jpg,.jpeg" onChange={handleReportUpload} />
                </div>
                <div className="alo-form-group">
                  <label className="private" htmlFor="date">Report Date:</label>
                  <input type="date" id="date" name="date" value={date} onChange={handleDateChange} />
                </div>
                <div className="alo-form-group">
                  <p>Why do we ask for this? We care about the safety of all pets and our trainers, and this information helps us maintain a healthy environment.</p>
                </div>
                <div className="alo-form-group">
                  <Link to="/schedule-appointment">Schedule Appointment</Link>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivateTraining;
