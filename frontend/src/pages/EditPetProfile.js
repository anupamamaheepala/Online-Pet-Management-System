import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import '../css/editpetprofile.css'; // Import CSS file for styling

const EditPetProfile = () => {
  const { petId } = useParams(); // Use useParams to extract petId from URL params
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/pets/${petId}`);
        setFormData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    fetchPetData();
  }, [petId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/pets/${petId}`, formData);
      // Handle success or redirect
      alert("Pet profile updated successfully");
    } catch (error) {
      console.error("Error updating pet profile:", error);
      alert("Error updating pet profile");
    }
  };

  return (
    <div className="editPetProfileContainer">
      <h2>Edit Pet Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="editPetProfileForm">
          <label htmlFor="petName" className="editPetProfileLabel">Pet Name:</label>
          <input type="text" id="petName" name="petName" value={formData.petName} onChange={handleChange} className="editPetProfileInput" />

          <label htmlFor="species" className="editPetProfileLabel">Species:</label>
          <input type="text" id="species" name="species" value={formData.species} onChange={handleChange} className="editPetProfileInput" />

          <label htmlFor="breed" className="editPetProfileLabel">Breed:</label>
          <input type="text" id="breed" name="breed" value={formData.breed} onChange={handleChange} className="editPetProfileInput" />

          <label htmlFor="age" className="editPetProfileLabel">Age:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="editPetProfileInput" />

          <label htmlFor="gender" className="editPetProfileLabel">Gender:</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="editPetProfileSelect">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="weight" className="editPetProfileLabel">Weight:</label>
          <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="editPetProfileInput" />

          <button type="submit" className="editPetProfileButton">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default EditPetProfile;
