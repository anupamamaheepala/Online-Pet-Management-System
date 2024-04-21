import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ViewServices = () => {
  const [services, setServices] = useState([]);
  const [updatedService, setUpdatedService] = useState({});
  const [editing, setEditing] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:9000/services/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleEdit = (service) => {
    setEditing(true);
    setServiceToEdit(service);
    setUpdatedService(service);
  };

  const handleUpdate = async () => {
    try {
      console.log('Service ID:', serviceToEdit._id);
      await axios.put(`http://localhost:9000/update/${serviceToEdit._id}`, updatedService);
      fetchServices();
      setUpdatedService({});
      setEditing(false);
      setServiceToEdit(null);
      Swal.fire({ icon: 'success', title: 'Service updated successfully', showConfirmButton: false, timer: 1500, });
    } catch (error) {
      console.error('Error updating service:', error);
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Failed to update the service. Please try again.'});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedService({ ...updatedService, [name]: value });
  };

  const handleCancel = () => {
    setUpdatedService({});
    setEditing(false);
    setServiceToEdit(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/services/delete/${id}`);
      fetchServices();
      Swal.fire({ icon: 'success', title: 'Service deleted', timer: 1500, showConfirmButton: false });
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h1 style={{ textAlign: 'center' }}>Services</h1>
        {services.map(service => (
          <div
            key={service._id}
            style={{
              border: '1px solid #ccc',
              padding: '20px',
              marginBottom: '20px',
              backgroundColor: '#EBE8ED',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ marginTop: 0, color: '#333' }}>{service.title}</h2>
            <p style={{ color: '#666' }}>
              <strong>Type:</strong> {service.type}
            </p>
            <p style={{ color: '#666' }}>
              <strong>Description:</strong> {service.description}
            </p>
            {editing && serviceToEdit._id === service._id ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                <input
                  type="text"
                  name="title"
                  value={updatedService.title}
                  onChange={handleChange}
                  placeholder="Enter new title"
                  style={{ padding: '8px', border: '1px solid #ccc', fontSize: '14px' }}
                />
                <input
                  type="text"
                  name="type"
                  value={updatedService.type}
                  onChange={handleChange}
                  placeholder="Enter new type"
                  style={{ padding: '8px', border: '1px solid #ccc', fontSize: '14px' }}
                />
                <textarea
                  name="description"
                  value={updatedService.description}
                  onChange={handleChange}
                  placeholder="Enter new description"
                  style={{
                    padding: '8px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
                <div>
                  <button
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      fontSize: '14px',
                      cursor: 'pointer',
                      backgroundColor: '#4caf50',
                      color: 'white',
                    }}
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <button
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      fontSize: '14px',
                      cursor: 'pointer',
                      backgroundColor: '#f44336',
                      color: 'white',
                      marginLeft: '10px',
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: '#4caf50',
                    color: 'white',
                  }}
                  onClick={() => handleEdit(service)}
                >
                  Update
                </button>
                <button
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: '#f44336',
                    color: 'white',
                  }}
                  onClick={() => handleDelete(service._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewServices;