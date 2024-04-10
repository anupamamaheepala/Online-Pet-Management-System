// export default PetProfile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../css/petprofile.css';

const PetProfile = () => {
  const { petId } = useParams();
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Pet ID:', petId); // Log petId here
    const fetchPetData = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/pets/${petId}`);
        setPetData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pet data:", error);
        // Handle error
      }
    };

    fetchPetData();
  }, [petId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pet profile?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:9000/pets/${petId}`);
        // Redirect to another page or handle as needed after deletion
        alert("Deletion successful");
      } catch (error) {
        console.error("Error deleting pet profile:", error);
        // Handle error
        alert("Error deleting pet profile");
      }
    } else {
      alert("Deletion cancelled");
    }
  };
  

  return (
    <div className="PetProfileContainer">
      <h2>Pet Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className='ProfilePhotoWrapper'>
            <img src={petData.profilePhoto} alt="Profile" className="ProfilePhoto_custom" />
          </div>
          <div className='ProfilePhotoInputWrapper'>
            <input type="file" name="image" className="ProfilePhotoInput_custom" />
          </div>
          <h3>{petData.petName}</h3>
          <p>Species: {petData.species}</p>
          <p>Breed: {petData.breed}</p>
          <p>Age: {petData.age}</p>
          <p>Gender: {petData.gender}</p>
          <p>Weight: {petData.weight}</p>
          {/* Add more details as needed */}
          <Link to={`/pets/${petId}/edit`} className="EditProfileButton_custom">Edit Profile</Link>
          <button className="DeleteProfileButton_custom" onClick={handleDelete}>Delete Profile</button>
        </div>
      )}
    </div>
  );
};

export default PetProfile;
