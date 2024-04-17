
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import '../css/petprofile.css';

// const PetProfile = () => {
//   const { petId } = useParams();
//   const [petData, setPetData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPetData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:9000/pets/${petId}`);
//         setPetData(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching pet data:", error);
//       }
//     };

//     fetchPetData();
//   }, [petId]);

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this pet profile?");
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:9000/pets/${petId}`);
//         alert("Deletion successful");
//       } catch (error) {
//         console.error("Error deleting pet profile:", error);
//         alert("Error deleting pet profile");
//       }
//     } else {
//       alert("Deletion cancelled");
//     }
//   };

//   const onFileChange = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('profilePhoto', file);
  
//     try {
//       const res = await axios.put(`http://localhost:9000/pets/profile-photo/${petId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       setPetData({ ...petData, profilePhoto: res.data.profilePhoto });
//       alert('Profile photo uploaded successfully');
//     } catch (error) {
//       console.error('Failed to upload profile photo:', error);
//       alert('Failed to upload profile photo');
//     }
//   };
  
//   const handleDeleteProfilePhoto = async () => {
//     const confirmed = window.confirm('Are you sure you want to delete the profile photo?');
  
//     if (confirmed) {
//       try {
//         await axios.delete(`http://localhost:9000/pets/profile-photo/${petId}`);
  
//         setPetData({ ...petData, profilePhoto: '' });
//         alert('Profile photo deleted successfully');
//       } catch (error) {
//         console.error('Failed to delete profile photo:', error);
//         alert('Failed to delete profile photo');
//       }
//     } else {
//       alert('Deletion cancelled.');
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   // Divide vaccinations into given and upcoming
//   const currentDate = new Date();
//   const givenVaccines = [];
//   const upcomingVaccines = [];

//   petData.vaccinations.forEach(vaccine => {
//     const vaccineDate = new Date(vaccine.dateAdministered);
//     if (vaccineDate <= currentDate) {
//       givenVaccines.push(vaccine);
//     } else {
//       upcomingVaccines.push(vaccine);
//     }
//   });

//   return (
//     <div className="PetProfileContainer">
//       <h2>Pet Profile</h2>
//       <div>
//         <div className="ProfilePhotoWrapper">
//           <img src={petData.profilePhoto} alt="Profile" className="ProfilePhoto_custom" />
//           <button onClick={handleDeleteProfilePhoto} className="DeleteProfilePhotoButton">Delete Photo</button>
//         </div>
//         <div className="ProfilePhotoInputWrapper">
//           <input type="file" onChange={onFileChange} className="ProfilePhotoInput_custom" />
//         </div>
//         <h3>{petData.petName}</h3>
//         <p>Species: {petData.species}</p>
//         <p>Breed: {petData.breed}</p>
//         <p>Age: {petData.age}</p>
//         <p>Gender: {petData.gender}</p>
//         <p>Weight: {petData.weight}</p>
//         <p>Date Adopted: {new Date(petData.dateAdopted).toLocaleDateString()}</p>
//         <p>Additional Notes: {petData.additionalNotes}</p>
        
//         <h4>Given Vaccines:</h4>
//         <ul>
//           {givenVaccines.map((vaccination, index) => (
//             <li key={index}>
//               {vaccination.vaccineType} - {new Date(vaccination.dateAdministered).toLocaleDateString()}
//             </li>
//           ))}
//         </ul>

//         <h4>Upcoming Vaccines:</h4>
//         <ul>
//           {upcomingVaccines.map((vaccination, index) => (
//             <li key={index}>
//               {vaccination.vaccineType} - {new Date(vaccination.dateAdministered).toLocaleDateString()}
//             </li>
//           ))}
//         </ul>

//         <Link to={`/pets/${petId}/edit`} className="EditProfileButton_custom">Edit Profile</Link>
//         <button className="DeleteProfileButton_custom" onClick={handleDelete}>Delete Profile</button>
//       </div>
//     </div>
//   );
// };

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
    <div className="pet-profile-container">
      <h2 className="pet-profile-heading">Pet Profile</h2>
      <div>
        <div className="pet-profile-photo-wrapper">
          <img src={petData.profilePhoto} alt="Profile" className="pet-profile-photo" />
          <button onClick={handleDeleteProfilePhoto} className="delete-photo-button">Delete Photo</button>
        </div>
        <div className="profile-photo-input-wrapper">
          <input type="file" onChange={onFileChange} className="profile-photo-input" />
        </div>
        <h3>{petData.petName}</h3>
        <p className="pet-profile-info">Species: {petData.species}</p>
        <p className="pet-profile-info">Breed: {petData.breed}</p>
        <p className="pet-profile-info">Age: {petData.age ? `${petData.age.value} ${petData.age.unit}` : 'N/A'}</p>
        <p className="pet-profile-info">Gender: {petData.gender}</p>
        <p className="pet-profile-info">Weight(In Kg): {petData.weight}kg</p>
        <p className="pet-profile-info">Date Adopted: {petData.dateAdopted ? new Date(petData.dateAdopted).toLocaleDateString() : 'N/A'}</p>
        <p className="pet-profile-info">Additional Notes: {petData.additionalNotes}</p>
        
        <div className="pet-profile-vaccine-section">
          <h4>Given Vaccines:</h4>
          <ul>
            {givenVaccines.map((vaccination, index) => (
              <li key={index} className="pet-profile-info">
                {vaccination.vaccineType} - {new Date(vaccination.dateAdministered).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        <div className="pet-profile-vaccine-section">
          <h4>Upcoming Vaccines:</h4>
          <ul>
            {upcomingVaccines.map((vaccination, index) => (
              <li key={index} className="pet-profile-info">
                {vaccination.vaccineType} - {new Date(vaccination.dateAdministered).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        <Link to={`/pets/${petId}/edit`} className="pet-profile-button">Edit Profile</Link>
        <button className="delete-profile-button" onClick={handleDelete}>Delete Profile</button>
      </div>
    </div>
  );
};

export default PetProfile;
