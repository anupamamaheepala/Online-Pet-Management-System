import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../css/petprofile.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PetProfile = () => {
  const { petId } = useParams();
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/pets/${petId}`);
        setPetData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    fetchPetData();
  }, [petId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pet profile?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:9000/pets/${petId}`);
        alert("Deletion successful");
      } catch (error) {
        console.error("Error deleting pet profile:", error);
        alert("Error deleting pet profile");
      }
    } else {
      alert("Deletion cancelled");
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePhoto', file);
  
    try {
      const res = await axios.put(`http://localhost:9000/pets/profile-photo/${petId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setPetData({ ...petData, profilePhoto: res.data.profilePhoto });
      alert('Profile photo uploaded successfully');
    } catch (error) {
      console.error('Failed to upload profile photo:', error);
      alert('Failed to upload profile photo');
    }
  };

  const handleDeleteProfilePhoto = async () => {
    const confirmed = window.confirm('Are you sure you want to delete the profile photo?');
  
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:9000/pets/profile-photo/${petId}`);
  
        setPetData({ ...petData, profilePhoto: '' });
        alert('Profile photo deleted successfully');
      } catch (error) {
        console.error('Failed to delete profile photo:', error);
        alert('Failed to delete profile photo');
      }
    } else {
      alert('Deletion cancelled.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // Divide vaccinations into given and upcoming
  const currentDate = new Date();
  const givenVaccines = [];
  const upcomingVaccines = [];

  petData.vaccinations.forEach(vaccine => {
    const vaccineDate = new Date(vaccine.dateAdministered);
    if (vaccineDate <= currentDate) {
      givenVaccines.push(vaccine);
    } else {
      upcomingVaccines.push(vaccine);
    }
  });

  return (
    <>
    <Header />
    <div className="pet-profile-container">
      <h2 className="pet-profile-heading">Pet Profile</h2>
      <div>
        <div className="pet-pro">
        <div className="pet-pro-con">
        <div className="pet-profile-photo-wrapper">
          <img src={petData.profilePhoto} alt="Profile" className="pet-profile-photo" />
        </div>
        <div className="profile-photo-input-wrapper">
          <input type="file" onChange={onFileChange} className="profile-photo-input" />
          <button onClick={handleDeleteProfilePhoto} className="delete-photo-button">Delete Photo</button>
          
        </div>
        </div>
        <div className="pet-pro-info">
        <h3 className="petname">{petData.petName}</h3>
        <p className="pet-profile-info"><b>Species:</b> {petData.species}</p>
        <p className="pet-profile-info"><b>Breed:</b> {petData.breed}</p>
        <p className="pet-profile-info"><b>Age:</b> {petData.age ? `${petData.age.value} ${petData.age.unit}` : 'N/A'}</p>
        <p className="pet-profile-info"><b>Gender:</b> {petData.gender}</p>
        <p className="pet-profile-info"><b>Weight(In Kg):</b> {petData.weight}kg</p>
        <p className="pet-profile-info"><b>Date Adopted:</b> {petData.dateAdopted ? new Date(petData.dateAdopted).toLocaleDateString() : 'N/A'}</p>
        <p className="pet-profile-info"><b>Additional Notes:</b> {petData.additionalNotes}</p>
        
        <div className="pet-profile-vaccine-section">
          <p className="pet-profile-info"><b>Given Vaccines:</b></p>
          <ul>
            {givenVaccines.map((vaccination, index) => (
              <li key={index} className="pet-profile-info">
                {vaccination.vaccineType} - {new Date(vaccination.dateAdministered).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        <div className="pet-profile-vaccine-section">
          <p className="pet-profile-info"><b>Upcoming Vaccines:</b></p>
          <ul>
            {upcomingVaccines.map((vaccination, index) => (
              <li key={index} className="pet-profile-info">
                {vaccination.vaccineType} - {new Date(vaccination.dateAdministered).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
        </div>
        </div>
        <center>
        <div className="pet-profile-button-wrapper">   
        <Link to={`/pets/${petId}/edit`} className="pet-profile-button">Edit Profile</Link>
        <button className="delete-profile-button" onClick={handleDelete}>Delete Profile</button>
        </div> </center>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PetProfile;
