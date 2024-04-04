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

  const { ownerName, address, contact, dogName, breed, age, file } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      await axios.post("http://localhost:9000/training/insert", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

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
                <div>
                  <label>Upload Image or PDF:</label>
                  <input type="file" name="file" onChange={onFileChange} />
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
