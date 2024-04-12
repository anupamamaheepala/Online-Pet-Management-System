// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom'; // Import useParams
// // import '../css/editpetprofile.css'; // Import CSS file for styling

// // const EditPetProfile = () => {
// //   const { petId } = useParams(); // Use useParams to extract petId from URL params
// //   const [formData, setFormData] = useState({});
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchPetData = async () => {
// //       try {
// //         const res = await axios.get(`http://localhost:9000/pets/${petId}`);
// //         setFormData(res.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching pet data:", error);
// //       }
// //     };

// //     fetchPetData();
// //   }, [petId]);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.put(`http://localhost:9000/pets/${petId}`, formData);
// //       // Handle success or redirect
// //       alert("Pet profile updated successfully");
// //     } catch (error) {
// //       console.error("Error updating pet profile:", error);
// //       alert("Error updating pet profile");
// //     }
// //   };

// //   return (
// //     <div className="editPetProfileContainer">
// //       <h2>Edit Pet Profile</h2>
// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : (
// //         <form onSubmit={handleSubmit} className="editPetProfileForm">
// //           <label htmlFor="petName" className="editPetProfileLabel">Pet Name:</label>
// //           <input type="text" id="petName" name="petName" value={formData.petName} onChange={handleChange} className="editPetProfileInput" />

// //           <label htmlFor="species" className="editPetProfileLabel">Species:</label>
// //           <input type="text" id="species" name="species" value={formData.species} onChange={handleChange} className="editPetProfileInput" />

// //           <label htmlFor="breed" className="editPetProfileLabel">Breed:</label>
// //           <input type="text" id="breed" name="breed" value={formData.breed} onChange={handleChange} className="editPetProfileInput" />

// //           <label htmlFor="age" className="editPetProfileLabel">Age:</label>
// //           <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="editPetProfileInput" />

// //           <label htmlFor="gender" className="editPetProfileLabel">Gender:</label>
// //           <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="editPetProfileSelect">
// //             <option value="male">Male</option>
// //             <option value="female">Female</option>
// //           </select>

// //           <label htmlFor="weight" className="editPetProfileLabel">Weight:</label>
// //           <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="editPetProfileInput" />

// //           <button type="submit" className="editPetProfileButton">Update Profile</button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // };

// // export default EditPetProfile;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import '../css/editpetprofile.css';

// const EditPetProfile = () => {
//   const { petId } = useParams();
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPetData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:9000/pets/${petId}`);
//         setFormData(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching pet data:", error);
//       }
//     };

//     fetchPetData();
//   }, [petId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleVaccinationChange = (index, field, value) => {
//     const updatedVaccinations = [...formData.vaccinations];
//     updatedVaccinations[index][field] = value;
//     setFormData({ ...formData, vaccinations: updatedVaccinations });
//   };

//   const addVaccination = () => {
//     const newVaccination = {
//       vaccineType: '',
//       dateAdministered: ''
//     };
//     setFormData({ ...formData, vaccinations: [...formData.vaccinations, newVaccination] });
//   };

//   const removeVaccination = (index) => {
//     const updatedVaccinations = [...formData.vaccinations];
//     updatedVaccinations.splice(index, 1);
//     setFormData({ ...formData, vaccinations: updatedVaccinations });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:9000/pets/${petId}`, formData);
//       // Handle success or redirect
//       alert("Pet profile updated successfully");
//     } catch (error) {
//       console.error("Error updating pet profile:", error);
//       alert("Error updating pet profile");
//     }
//   };

//   return (
//     <div className="editPetProfileContainer">
//       <h2>Edit Pet Profile</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="editPetProfileForm">
//           {/* Pet Name */}
//           <label htmlFor="petName" className="editPetProfileLabel">Pet Name:</label>
//           <input type="text" id="petName" name="petName" value={formData.petName} onChange={handleChange} className="editPetProfileInput" />

//           {/* Species */}
//           <label htmlFor="species" className="editPetProfileLabel">Species:</label>
//           <input type="text" id="species" name="species" value={formData.species} onChange={handleChange} className="editPetProfileInput" />

//           {/* Breed */}
//           <label htmlFor="breed" className="editPetProfileLabel">Breed:</label>
//           <input type="text" id="breed" name="breed" value={formData.breed} onChange={handleChange} className="editPetProfileInput" />

//           {/* Age */}
//           <label htmlFor="age" className="editPetProfileLabel">Age:</label>
//           <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="editPetProfileInput" />

//           {/* Gender */}
//           <label htmlFor="gender" className="editPetProfileLabel">Gender:</label>
//           <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="editPetProfileSelect">
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>

//           {/* Weight */}
//           <label htmlFor="weight" className="editPetProfileLabel">Weight:</label>
//           <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="editPetProfileInput" />

//           {/* Date Adopted */}
//           <label htmlFor="dateAdopted" className="editPetProfileLabel">Date Adopted:</label>
//           <input type="date" id="dateAdopted" name="dateAdopted" value={formData.dateAdopted} onChange={handleChange} className="editPetProfileInput" />

//           {/* Additional Notes */}
//           <label htmlFor="additionalNotes" className="editPetProfileLabel">Additional Notes:</label>
//           <textarea id="additionalNotes" name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} className="editPetProfileTextarea" />

//           {/* Vaccinations */}
//           <h3>Vaccinations:</h3>
//           {formData.vaccinations.map((vaccination, index) => (
//             <div key={index} className="vaccinationEntry">
//               <label htmlFor={`vaccineType-${index}`} className="editPetProfileLabel">Vaccine Type:</label>
//               <input type="text" id={`vaccineType-${index}`} name={`vaccineType-${index}`} value={vaccination.vaccineType} onChange={(e) => handleVaccinationChange(index, 'vaccineType', e.target.value)} className="editPetProfileInput" />

//               <label htmlFor={`dateAdministered-${index}`} className="editPetProfileLabel">Date Administered:</label>
//               <input type="date" id={`dateAdministered-${index}`} name={`dateAdministered-${index}`} value={vaccination.dateAdministered} onChange={(e) => handleVaccinationChange(index, 'dateAdministered', e.target.value)} className="editPetProfileInput" />

//               {/* Remove Vaccination Button */}
//               <button type="button" onClick={() => removeVaccination(index)} className="removeVaccinationButton">Remove</button>
//             </div>
//           ))}

//           {/* Add Vaccination Button */}
//           <button type="button" onClick={addVaccination} className="addVaccinationButton">Add Vaccination</button>

//           {/* Submit Button */}
//           <button type="submit" className="editPetProfileButton">Update Profile</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EditPetProfile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/editpetprofile.css';

const EditPetProfile = () => {
  const { petId } = useParams();
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVaccinationChange = (index, field, value) => {
    const updatedVaccinations = [...formData.vaccinations];
    updatedVaccinations[index][field] = value;
    setFormData({ ...formData, vaccinations: updatedVaccinations });
  };

  const addVaccination = () => {
    const newVaccination = {
      vaccineType: '',
      dateAdministered: ''
    };
    setFormData({ ...formData, vaccinations: [...formData.vaccinations, newVaccination] });
  };

  const removeVaccination = (index) => {
    // Ask for confirmation before deleting
    const isConfirmed = window.confirm("Are you sure you want to delete this vaccination?");
    if (isConfirmed) {
      // If confirmed, remove the vaccination and show success message
      const updatedVaccinations = [...formData.vaccinations];
      updatedVaccinations.splice(index, 1);
      setFormData({ ...formData, vaccinations: updatedVaccinations });
      alert("Vaccination deleted successfully.");
    } else {
      // If not confirmed, show cancellation message
      alert("Vaccination deletion canceled.");
    }
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
          {/* Pet Name */}
          <label htmlFor="petName" className="editPetProfileLabel">Pet Name:</label>
          <input type="text" id="petName" name="petName" value={formData.petName} onChange={handleChange} className="editPetProfileInput" />

          {/* Species */}
          <label htmlFor="species" className="editPetProfileLabel">Species:</label>
          <input type="text" id="species" name="species" value={formData.species} onChange={handleChange} className="editPetProfileInput" />

          {/* Breed */}
          <label htmlFor="breed" className="editPetProfileLabel">Breed:</label>
          <input type="text" id="breed" name="breed" value={formData.breed} onChange={handleChange} className="editPetProfileInput" />

          {/* Age */}
          <label htmlFor="age" className="editPetProfileLabel">Age:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="editPetProfileInput" />

          {/* Gender */}
          <label htmlFor="gender" className="editPetProfileLabel">Gender:</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="editPetProfileSelect">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Weight */}
          <label htmlFor="weight" className="editPetProfileLabel">Weight:</label>
          <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="editPetProfileInput" />

          {/* Date Adopted */}
          <label htmlFor="dateAdopted" className="editPetProfileLabel">Date Adopted:</label>
          <input type="date" id="dateAdopted" name="dateAdopted" value={formData.dateAdopted} onChange={handleChange} className="editPetProfileInput" />

          {/* Additional Notes */}
          <label htmlFor="additionalNotes" className="editPetProfileLabel">Additional Notes:</label>
          <textarea id="additionalNotes" name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} className="editPetProfileTextarea" />

          {/* Vaccinations */}
          <h3>Vaccinations:</h3>
          {formData.vaccinations.map((vaccination, index) => (
            <div key={index} className="vaccinationEntry">
              <label htmlFor={`vaccineType-${index}`} className="editPetProfileLabel">Vaccine Type:</label>
              <input type="text" id={`vaccineType-${index}`} name={`vaccineType-${index}`} value={vaccination.vaccineType} onChange={(e) => handleVaccinationChange(index, 'vaccineType', e.target.value)} className="editPetProfileInput" />

              <label htmlFor={`dateAdministered-${index}`} className="editPetProfileLabel">Date Administered:</label>
              <input type="date" id={`dateAdministered-${index}`} name={`dateAdministered-${index}`} value={vaccination.dateAdministered} onChange={(e) => handleVaccinationChange(index, 'dateAdministered', e.target.value)} className="editPetProfileInput" />

              {/* Remove Vaccination Button */}
              <button type="button" onClick={() => removeVaccination(index)} className="removeVaccinationButton">Remove</button>
            </div>
          ))}

          {/* Add Vaccination Button */}
          <button type="button" onClick={addVaccination} className="addVaccinationButton">Add Vaccination</button>

          {/* Submit Button */}
          <button type="submit" className="editPetProfileButton">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default EditPetProfile;
