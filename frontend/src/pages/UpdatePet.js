// UpdatePet.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/updatepet.css';

const UpdatePet = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    petName: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    weight: ''
  });

  useEffect(() => {
    // Fetch pet data from the server using the pet ID
    const fetchPetData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/pets/${petId}`);
        setUpdateData(response.data);
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    };
    fetchPetData();
  }, [petId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/pets/${petId}`, updateData);
      alert('Update successful');
      // After showing the success message, navigate to the "all-pets" page
      navigate('/all-pets');
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const handleCancel = () => {
    alert('Update cancelled');
    // Navigate to the "all-pets" page after showing cancellation message
    navigate('/all-pets');
  };

  return (
    <div className="update-pet-form-container">
      <h2 className="update-pet-form-header">Update Pet</h2>
      <form onSubmit={handleSubmit} className="update-pet-form">
        <label>
          Pet Name:
          <input
            type="text"
            name="petName"
            value={updateData.petName}
            onChange={handleChange}
          />
        </label>
        <label>
          Species:
          <input
            type="text"
            name="species"
            value={updateData.species}
            onChange={handleChange}
          />
        </label>
        <label>
          Breed:
          <input
            type="text"
            name="breed"
            value={updateData.breed}
            onChange={handleChange}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={updateData.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={updateData.gender}
            onChange={handleChange}
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={updateData.weight}
            onChange={handleChange}
          />
        </label>
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePet;
