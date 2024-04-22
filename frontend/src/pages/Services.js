import React, { useState } from 'react';
import axios from 'axios';
import '../css/services.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import SystemAdminHeader from '../components/SystemAdminHeader'

const Services = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Veterinary Service');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/services/add', { title, type, description });

      Swal.fire({ icon: 'success',title: 'Service Added',timer: 1500, showConfirmButton: false });
      // Optionally, you can handle success here (e.g., show a success message)
      // Reset form fields
      setTitle('');
      setType('Veterinary Service');
      setDescription('');
    } catch (error) {
        toast.error("Something went wrong");
      console.error('Error creating service:', error);
      
    }
  };

  return (
    <>
    <SystemAdminHeader/>
    <div className="add-service-container">
      <h1>Add Service</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-service-form-group">
          <label htmlFor="addservicetitle_input" className="add-service-label">Title:</label>
          <input type="text" id="addservicetitle_input" className="add-service-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="add-service-form-group">
          <label htmlFor="addservice_selectservice" className="add-service-label">Type:</label>
          <select id="addservice_selectservice" className="add-service-select" value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="Veterinary Service">Veterinary Service</option>
            <option value="Groome Service">Groome Service</option>
          </select>
        </div>
        <div className="add-service-form-group">
          <label htmlFor="addservice_description" className="add-service-label">Description:</label>
          <textarea id="addservice_description" className="add-service-textarea" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit" className="add-service-submit-button">Submit</button>
      </form>
    </div>
    </>
  );
};

export default Services;
