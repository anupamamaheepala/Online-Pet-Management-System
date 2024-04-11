// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams,Link } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../css/addpet.css'; // Import CSS file

// const AddPet = () => {
//   const { customerId } = useParams();

//   const [formData, setFormData] = useState({
//     petName: '',
//     species: '',
//     breed: '',
//     age: '',
//     gender: '',
//     weight: ''
//   });

//   const { petName, species, breed, age, gender, weight } = formData;

//   const onChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:9000/pets/add', {
//         ...formData,
//         owner: customerId
//       });
//       console.log('Response from server:', res.data);
//       window.location.href = '/my-pets/${customerId}';
//     } catch (error) {
//       console.error('Error:', error);

//       // Check if the error has a response property
//       if (error.response) {
//         // Server responded with a status code other than 2xx
//         const serverMessage = error.response.data.message || 'Unknown error from server';
//         alert(`Error saving pet: ${serverMessage}`);
//     } else {
//         // No response received from server
//         alert('Error: Unable to connect to server.');
//     }
//     }
//   };

//   return (
//     <>
// <Header />
//     <div className="add-pet-container"> {/* Use unique class name */}
//     <center><h2>Add a Pet</h2></center>
//       <form onSubmit={onSubmit}>
//         <div className="add-pet-form-group"> {/* Use unique class name */}
//           <label htmlFor="petName">Pet Name:</label>
//           <input type="text" id="petName" name="petName" value={petName} onChange={onChange} required />
//         </div>
//         <div className="add-pet-form-group"> {/* Use unique class name */}
//           <label htmlFor="species">Species:</label>
//           <input type="text" id="species" name="species" value={species} onChange={onChange} required />
//         </div>
//         <div className="add-pet-form-group"> {/* Use unique class name */}
//           <label htmlFor="breed">Breed:</label>
//           <input type="text" id="breed" name="breed" value={breed} onChange={onChange} required />
//         </div>
//         <div className="add-pet-form-group"> {/* Use unique class name */}
//           <label htmlFor="age">Age:</label>
//           <input type="text" id="age" name="age" value={age} onChange={onChange} required />
//         </div>
//         <div className="add-pet-form-group"> {/* Use unique class name */}
//           <label htmlFor="gender">Gender:</label>
//           <input type="text" id="gender" name="gender" value={gender} onChange={onChange} required />
//         </div>
//         <div className="add-pet-form-group"> {/* Use unique class name */}
//           <label htmlFor="weight">Weight:</label>
//           <input type="text" id="weight" name="weight" value={weight} onChange={onChange} required />
//         </div>
//                 <center><button type="submit" className="add-pet-button">Add Pet</button></center> {/* Use unique class name */}
        
//       </form>
//     </div>
//     <br></br>
// <Footer />
// </>
//   );
// };

// export default AddPet;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../css/addpet.css'; // Import CSS file

// const AddPet = () => {
//     const { customerId } = useParams();

//     const [formData, setFormData] = useState({
//         petName: '',
//         species: '',
//         breed: '',
//         age: '',
//         gender: '',
//         weight: '',
//         dateAdopted: '',
//         additionalNotes: '',
//         profileImage: '' // Include profileImage if the API expects it
//     });

//     const { petName, species, breed, age, gender, weight, dateAdopted, additionalNotes, profileImage } = formData;

//     const onChange = e => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const onSubmit = async e => {
//         e.preventDefault();

//         try {
//             // Include all necessary fields in the request payload
//             const res = await axios.post('http://localhost:9000/pets/add', {
//                 petName,
//                 species,
//                 breed,
//                 age,
//                 gender,
//                 weight,
//                 dateAdopted,
//                 additionalNotes,
//                 profileImage,
//                 owner: customerId
//             });
//             console.log('Response from server:', res.data);
            
//             // Redirect back to the my-pets page
//             window.location.href = `/my-pets/${customerId}`;
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Error saving pet. Please try again.');
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="add-pet-container">
//                 <center><h2>Add a Pet</h2></center>
//                 <form onSubmit={onSubmit}>
//                     {/* Form fields */}
//                     <div className="add-pet-form-group">
//                         <label htmlFor="petName">Pet Name:</label>
//                         <input type="text" id="petName" name="petName" value={petName} onChange={onChange} required />
//                     </div>
//                     <div className="add-pet-form-group">
//                         <label htmlFor="species">Species:</label>
//                         <input type="text" id="species" name="species" value={species} onChange={onChange} required />
//                     </div>
//                     <div className="add-pet-form-group">
//                         <label htmlFor="breed">Breed:</label>
//                         <input type="text" id="breed" name="breed" value={breed} onChange={onChange}  />
//                     </div>
//                     <div className="add-pet-form-group">
//                         <label htmlFor="age">Age:</label>
//                         <input type="number" id="age" name="age" value={age} onChange={onChange} required />
//                     </div>
//                     <div className="add-pet-form-group">
//                         <label htmlFor="gender">Gender:</label>
//                         <select id="gender" name="gender" value={gender} onChange={onChange} required>
//                             <option value="">Select Gender</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                         </select>
//                     </div>
//                     <div className="add-pet-form-group">
//                         <label htmlFor="weight">Weight:</label>
//                         <input type="number" id="weight" name="weight" value={weight} onChange={onChange} required />
//                     </div>
//                     <div className="add-pet-form-group">
//                         <label htmlFor="dateAdopted">Date Adopted:</label>
//                         <input type="date" id="dateAdopted" name="dateAdopted" value={dateAdopted} onChange={onChange}  />
//                     </div>
//                     <div className="add-pet-form-group">
//                         <label htmlFor="additionalNotes">Additional Notes:</label>
//                         <textarea id="additionalNotes" name="additionalNotes" value={additionalNotes} onChange={onChange} ></textarea>
//                     </div>
//                     <center><button type="submit" className="add-pet-button">Add Pet</button></center>
//                 </form>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default AddPet;
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/addpet.css'; // Import CSS file

const AddPet = () => {
    const { customerId } = useParams();

    // Initialize form data with null or empty values for optional fields
    const [formData, setFormData] = useState({
        petName: '',
        species: '',
        breed: null, // Optional field initialized to null
        age: null, // Optional field initialized to null
        gender: '',
        weight: null, // Optional field initialized to null
        dateAdopted: null, // Optional field initialized to null
        additionalNotes: null, // Optional field initialized to null
        profileImage: null // Optional field initialized to null
    });

    const { petName, species, breed, age, gender, weight, dateAdopted, additionalNotes, profileImage } = formData;

    const onChange = e => {
        // Handle empty string values as `null` for optional fields
        const value = e.target.value === '' ? null : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const onSubmit = async e => {
        e.preventDefault();

        try {
            // Send the form data as payload
            const res = await axios.post('http://localhost:9000/pets/add', {
                petName,
                species,
                breed,
                age,
                gender,
                weight,
                dateAdopted,
                additionalNotes,
                profileImage,
                owner: customerId
            });
            console.log('Response from server:', res.data);
            
            // Redirect back to the my-pets page
            window.location.href = `/my-pets/${customerId}`;
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving pet. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <div className="add-pet-container">
                <center><h2>Add a Pet</h2></center>
                <form onSubmit={onSubmit}>
                    {/* Form fields */}
                    <div className="add-pet-form-group">
                        <label htmlFor="petName">Pet Name:</label>
                        <input type="text" id="petName" name="petName" value={petName} onChange={onChange} required />
                    </div>
                    <div className="add-pet-form-group">
                        <label htmlFor="species">Species:</label>
                        <input type="text" id="species" name="species" value={species} onChange={onChange} required />
                    </div>
                    <div className="add-pet-form-group">
                        <label htmlFor="breed">Breed:</label>
                        <input type="text" id="breed" name="breed" value={breed} onChange={onChange} />
                    </div>
                    <div className="add-pet-form-group">
                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" name="age" value={age} onChange={onChange} />
                    </div>
                    <div className="add-pet-form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" name="gender" value={gender} onChange={onChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="add-pet-form-group">
                        <label htmlFor="weight">Weight:</label>
                        <input type="number" id="weight" name="weight" value={weight} onChange={onChange} />
                    </div>
                    <div className="add-pet-form-group">
                        <label htmlFor="dateAdopted">Date Adopted:</label>
                        <input type="date" id="dateAdopted" name="dateAdopted" value={dateAdopted} onChange={onChange} />
                    </div>
                    <div className="add-pet-form-group">
                        <label htmlFor="additionalNotes">Additional Notes:</label>
                        <textarea id="additionalNotes" name="additionalNotes" value={additionalNotes} onChange={onChange}></textarea>
                    </div>
                    <center><button type="submit" className="add-pet-button">Add Pet</button></center>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default AddPet;
