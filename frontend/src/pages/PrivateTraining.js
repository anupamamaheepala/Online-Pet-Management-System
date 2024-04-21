import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Trainingapp.css';
import axios from 'axios';


const PrivateTraining = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    address: '',
    contact: '',
    dogName: '',
    breed: '',
    age: '',
    file: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission status

  const { ownerName, address, contact, dogName, breed, age, file } = formData;
  const [ageError, setAgeError] = useState(false); // State to track age validation error

  const onChange = e => {
    const { name, value } = e.target;
    let newValue = value;
    // Perform validation as user types
    if (name === 'ownerName' || name === 'dogName' || name === 'breed') {
      newValue = value.replace(/[^A-Za-z]/ig, '');
    } else if (name === 'contact') {
      newValue = value.replace(/[^0-9]/g, '').slice(0, 10); // Limit to 10 digits
    } else if (name === 'age') {
      // Allow any number between 1 and 20
      newValue = value.replace(/[^0-9]/g, '');
      // Check if entered value meets conditions
      if (newValue !== '') {
        const ageValue = parseInt(newValue);
        if (ageValue < 2) {
          alert("Your dog should be at least 2 years old.");
          newValue = '';
        } else if (ageValue > 12) {
          alert("Your dog is too old to get trained.");
          newValue = '';
        }
      }
    }
    setFormData({ ...formData, [name]: newValue });
  };
  const onBlurAge = () => {
    const ageValue = parseInt(formData.age);
    if (ageValue < 2 || ageValue > 12 || isNaN(ageValue)) {
      setFormData({ ...formData, age: '' });
      setAgeError(true);
    } else {
      setAgeError(false);
    }
  };


  const onFileChange = e => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('ownerName', ownerName);
        formDataToSend.append('address', address);
        formDataToSend.append('contact', contact);
        formDataToSend.append('dogName', dogName);
        formDataToSend.append('breed', breed);
        formDataToSend.append('age', age);

        const res = await axios.post("http://localhost:9000/training/insert", formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log("Response data:", res.data);

        if (res.data && res.data._id) {
            window.location.href = `/ViewApplication?id=${res.data._id}`;
        } else {
            console.error('Invalid response data:', res.data);
            // Handle the case where res.data._id is undefined or missing
        }

        // Clear form fields after successful submission
        setFormData({
            ownerName: '',
            address: '',
            contact: '',
            dogName: '',
            breed: '',
            age: '',
            file: null
        });

        // Set submission status to true
        setIsSubmitted(true);
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
                  <input type="number" id="age" name="age" value={age} onChange={onChange} onBlur={onBlurAge} min="2" max="12" />
                  {ageError && <p className="error-msg">Your dog's age should be between 2 and 12.</p>}
                </div>
                <div>
                  <label>Upload Image or PDF:</label>
                  <input type="file" name="file" onChange={onFileChange} />
                </div>
                <div className="alo-form-group">
                  <Link to="/schedule-appointment">Schedule Appointment</Link>
                </div>
                <button type="submit">Submit</button>
                {/* Display success message if submission is successful */}
                {isSubmitted && (
                  <div>
                    <p>Your application has been successfully submitted.</p>

                  </div>
                )}
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
