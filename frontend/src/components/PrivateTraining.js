import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../css/Trainingapp.css';
import axios from 'axios';

const PrivateTraining = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    address: '',
    contact: '',
    dogName: '',
    breed: '',
    age: ''
  });

  const { ownerName, address, contact, dogName, breed, age} = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/training/insert", formData);
      console.log(res.data);
      // Optionally, you can clear the form fields after successful submission
      setFormData({
        ownerName: '',
        address: '',
        contact: '',
        dogName: '',
        breed: '',
        age: ''
      });
    } catch (err) {
      console.error(err);
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
              <form onSubmit={onSubmit}>
                <div className="alo-form-group">
                  <label className="private" htmlFor="ownerName">Owner's Name:</label>
                  <input type="text" id="ownerName" name="ownerName" value={ownerName} onChange={onChange} />
                </div>
                <div className="alo-form-group">
                  <label className="private" htmlFor="address">Address:</label>
                  <textarea id="address" name="address" value={address} onChange={onChange}></textarea>
                </div>
                <div className="alo-form-group">
                  <label className="private" htmlFor="contact">Contact Number:</label>
                  <input type="text" id="contact" name="contact" value={contact} onChange={onChange} />
                </div>
                <div className="alo-form-group">
                  <label className="private" htmlFor="dogName">Dog's Name:</label>
                  <input type="text" id="dogName" name="dogName" value={dogName} onChange={onChange} />
                </div>
                <div className="alo-form-group">
                  <label className="private" htmlFor="breed">Breed:</label>
                  <input type="text" id="breed" name="breed" value={breed} onChange={onChange} />
                </div>
                <div className="alo-form-group">
                  <label className="private" htmlFor="age">Age:</label>
                  <input type="number" id="age" name="age" value={age} onChange={onChange} />
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


/*
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
              other form fields 
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

export default PrivateTraining;*/
