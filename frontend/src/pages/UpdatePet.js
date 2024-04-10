// UpdatePet.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdatePet = ({ petId, onUpdateSuccess, onCancel }) => {
  const [updateData, setUpdateData] = useState({
    // Initialize with empty values or fetch the existing pet data
    petName: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    weight: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/pets/${petId}`, updateData);
      // Call the onUpdateSuccess function passed from AllPets component
      onUpdateSuccess();
      alert('Update successful');
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  return (
    <div>
    <h2>Update Pet</h2>
    <form onSubmit={handleSubmit}>
    <label>
          Pet Name:
          <input type="text" name="petName" value="pettName" onChange={handleChange} />
        </label>
      {/* Add input fields for updating pet data */}
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  </div>
  );
};

export default UpdatePet;
