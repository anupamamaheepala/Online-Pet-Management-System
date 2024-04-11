// // // UpdatePet.js

// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import '../css/updatepet.css';

// // const UpdatePet = () => {
// //   const { petId } = useParams();
// //   const navigate = useNavigate();
// //   const [updateData, setUpdateData] = useState({
// //     petName: '',
// //     species: '',
// //     breed: '',
// //     age: '',
// //     gender: '',
// //     weight: ''
// //   });

// //   useEffect(() => {
// //     // Fetch pet data from the server using the pet ID
// //     const fetchPetData = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:9000/pets/${petId}`);
// //         setUpdateData(response.data);
// //       } catch (error) {
// //         console.error('Error fetching pet data:', error);
// //       }
// //     };
// //     fetchPetData();
// //   }, [petId]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setUpdateData({ ...updateData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.put(`http://localhost:9000/pets/${petId}`, updateData);
// //       alert('Update successful');
// //       // After showing the success message, navigate to the "all-pets" page
// //       navigate('/all-pets');
// //     } catch (error) {
// //       console.error('Error updating pet:', error);
// //     }
// //   };

// //   const handleCancel = () => {
// //     alert('Update cancelled');
// //     // Navigate to the "all-pets" page after showing cancellation message
// //     navigate('/all-pets');
// //   };

// //   return (
// //     <div className="update-pet-form-container">
// //       <h2 className="update-pet-form-header">Update Pet</h2>
// //       <form onSubmit={handleSubmit} className="update-pet-form">
// //         <label>
// //           Pet Name:
// //           <input
// //             type="text"
// //             name="petName"
// //             value={updateData.petName}
// //             onChange={handleChange}
// //           />
// //         </label>
// //         <label>
// //           Species:
// //           <input
// //             type="text"
// //             name="species"
// //             value={updateData.species}
// //             onChange={handleChange}
// //           />
// //         </label>
// //         <label>
// //           Breed:
// //           <input
// //             type="text"
// //             name="breed"
// //             value={updateData.breed}
// //             onChange={handleChange}
// //           />
// //         </label>
// //         <label>
// //           Age:
// //           <input
// //             type="number"
// //             name="age"
// //             value={updateData.age}
// //             onChange={handleChange}
// //           />
// //         </label>
// //         <label>
// //           Gender:
// //           <input
// //             type="text"
// //             name="gender"
// //             value={updateData.gender}
// //             onChange={handleChange}
// //           />
// //         </label>
// //         <label>
// //           Weight:
// //           <input
// //             type="number"
// //             name="weight"
// //             value={updateData.weight}
// //             onChange={handleChange}
// //           />
// //         </label>
// //         <div>
// //           <button type="submit">Save</button>
// //           <button type="button" onClick={handleCancel}>Cancel</button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default UpdatePet;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom'; // Importing useParams
// import '../css/updatepet.css'; // Assuming you have a CSS file for styling

// const UpdatePet = () => {
//   const { petId } = useParams();
//   const navigate = useNavigate();
//   const [updateData, setUpdateData] = useState({
//     petName: '',
//     species: '',
//     breed: '',
//     age: '',
//     gender: '',
//     weight: '',
//     additionalNotes: '', // Include additionalNotes
//     vaccinations: [] // Include vaccinations array
//   });

//   useEffect(() => {
//     // Fetch pet data from the server using the pet ID
//     const fetchPetData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9000/pets/${petId}`);
//         setUpdateData(response.data);
//       } catch (error) {
//         console.error('Error fetching pet data:', error);
//       }
//     };
//     fetchPetData();
//   }, [petId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateData({ ...updateData, [name]: value });
//   };

//   const handleVaccinationChange = (index, field, value) => {
//     const updatedVaccinations = [...updateData.vaccinations];
//     updatedVaccinations[index][field] = value;
//     setUpdateData({ ...updateData, vaccinations: updatedVaccinations });
//   };

//   const handleAddVaccination = () => {
//     setUpdateData({
//       ...updateData,
//       vaccinations: [...updateData.vaccinations, { vaccineType: '', dateAdministered: '' }]
//     });
//   };

//   const handleRemoveVaccination = (index) => {
//     const updatedVaccinations = updateData.vaccinations.filter((_, i) => i !== index);
//     setUpdateData({ ...updateData, vaccinations: updatedVaccinations });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:9000/pets/${petId}`, updateData);
//       alert('Update successful');
//       navigate('/all-pets'); // Navigate to the "all-pets" page after updating
//     } catch (error) {
//       console.error('Error updating pet:', error);
//     }
//   };

//   const handleCancel = () => {
//     alert('Update cancelled');
//     navigate('/all-pets'); // Navigate to the "all-pets" page after cancellation
//   };

//   return (
//     <div className="update-pet-form-container">
//       <h2 className="update-pet-form-header">Update Pet</h2>
//       <form onSubmit={handleSubmit} className="update-pet-form">
//         {/* Pet details form inputs */}
//         <label>
//           Pet Name:
//           <input
//             type="text"
//             name="petName"
//             value={updateData.petName}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Species:
//           <input
//             type="text"
//             name="species"
//             value={updateData.species}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Breed:
//           <input
//             type="text"
//             name="breed"
//             value={updateData.breed}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Age:
//           <input
//             type="number"
//             name="age"
//             value={updateData.age}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Gender:
//           <input
//             type="text"
//             name="gender"
//             value={updateData.gender}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Weight:
//           <input
//             type="number"
//             name="weight"
//             value={updateData.weight}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Additional Notes:
//           <textarea
//             name="additionalNotes"
//             value={updateData.additionalNotes}
//             onChange={handleChange}
//           />
//         </label>

//         {/* Vaccinations form inputs */}
//         <h3>Vaccinations</h3>
//         {updateData.vaccinations.map((vaccine, index) => (
//           <div key={index} className="vaccination-entry">
//             <label>
//               Vaccine Type:
//               <input
//                 type="text"
//                 value={vaccine.vaccineType}
//                 onChange={(e) => handleVaccinationChange(index, 'vaccineType', e.target.value)}
//               />
//             </label>
//             <label>
//               Date Administered:
//               <input
//                 type="date"
//                 value={new Date(vaccine.dateAdministered).toISOString().substring(0, 10)}
//                 onChange={(e) => handleVaccinationChange(index, 'dateAdministered', e.target.value)}
//               />
//             </label>
//             <button type="button" onClick={() => handleRemoveVaccination(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddVaccination}>
//           Add Vaccination
//         </button>

//         {/* Form action buttons */}
//         <div>
//           <button type="submit">Save</button>
//           <button type="button" onClick={handleCancel}>Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdatePet;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/updatepet.css'; // Importing useParams

const UpdatePet = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    petName: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    weight: '',
    additionalNotes: '', // Include additionalNotes
    vaccinations: [] // Include vaccinations array
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

  const handleVaccinationChange = (index, field, value) => {
    const updatedVaccinations = [...updateData.vaccinations];
    updatedVaccinations[index][field] = value;
    setUpdateData({ ...updateData, vaccinations: updatedVaccinations });
  };

  const handleAddVaccination = () => {
    setUpdateData({
      ...updateData,
      vaccinations: [...updateData.vaccinations, { vaccineType: '', dateAdministered: '' }]
    });
  };

  const handleRemoveVaccination = (index) => {
    // Display a confirmation prompt to the user
    const confirmDelete = window.confirm('Are you sure you want to delete this vaccination?');
    
    // If the user confirms, remove the vaccination from the array
    if (confirmDelete) {
      const updatedVaccinations = updateData.vaccinations.filter((_, i) => i !== index);
      setUpdateData({ ...updateData, vaccinations: updatedVaccinations });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/pets/${petId}`, updateData);
      alert('Update successful');
      navigate('/all-pets'); // Navigate to the "all-pets" page after updating
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const handleCancel = () => {
    alert('Update cancelled');
    navigate('/all-pets'); // Navigate to the "all-pets" page after cancellation
  };

  return (
    <div className="update-pet-form-container">
      <h2 className="update-pet-form-header">Update Pet</h2>
      <form onSubmit={handleSubmit} className="update-pet-form">
        {/* Pet details form inputs */}
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
        <label>
          Additional Notes:
          <textarea
            name="additionalNotes"
            value={updateData.additionalNotes}
            onChange={handleChange}
          />
        </label>

        {/* Vaccinations form inputs */}
        <h3>Vaccinations</h3>
        {updateData.vaccinations.map((vaccine, index) => (
          <div key={index} className="vaccination-entry">
            <label>
              Vaccine Type:
              <input
                type="text"
                value={vaccine.vaccineType}
                onChange={(e) => handleVaccinationChange(index, 'vaccineType', e.target.value)}
              />
            </label>
            <label>
              Date Administered:
              <input
                type="date"
                value={vaccine.dateAdministered ? new Date(vaccine.dateAdministered).toISOString().substring(0, 10) : ''}
                onChange={(e) => handleVaccinationChange(index, 'dateAdministered', e.target.value)}
              />
            </label>
            <button type="button" onClick={() => handleRemoveVaccination(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddVaccination}>
          Add Vaccination
        </button>

        {/* Form action buttons */}
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePet;
