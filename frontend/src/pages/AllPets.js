// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../css/allpets.css';

// const AllPets = () => {
//   const [pets, setPets] = useState([]);
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/pets/all-pets");
//         setPets(response.data);
//       } catch (error) {
//         console.error('Error fetching pets:', error);
//       }
//     };

//     fetchPets();
//   }, []);

//   const handleUpdate = (petId) => {
//     navigate(`/pets/update/${petId}`); // Navigate to UpdatePet page with pet ID
//   };

//   const handleDelete = async (petId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this pet?");
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:9000/pets/${petId}`);
//         setPets(pets.filter(pet => pet._id !== petId));
//         alert("Pet deleted successfully");
//       } catch (error) {
//         console.error('Error deleting pet:', error);
//         alert("Failed to delete pet");
//       }
//     } else {
//       alert("Deletion cancelled");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="all-pets-container">
//         <h1>All Pets</h1>
//         <table className="pets-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Species</th>
//               <th>Breed</th>
//               <th>Age</th>
//               <th>Gender</th>
//               <th>Weight</th>
//               <th>Owner</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pets.map((pet, index) => (
//               <tr key={pet._id}>
//                 <td>{index + 1}</td>
//                 <td>{pet.petName}</td>
//                 <td>{pet.species}</td>
//                 <td>{pet.breed}</td>
//                 <td>{pet.age}</td>
//                 <td>{pet.gender}</td>
//                 <td>{pet.weight}</td>
//                 <td>{pet.owner.name}</td>
//                 <td>{pet.owner.email}</td>
//                 <td>
//                   <button className="update-btn" onClick={() => handleUpdate(pet._id)}>Update</button>
//                   <button className="delete-btn" onClick={() => handleDelete(pet._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AllPets;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../css/allpets.css';

// const AllPets = () => {
//   const [pets, setPets] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/pets/all-pets");
//         setPets(response.data);
//       } catch (error) {
//         console.error('Error fetching pets:', error);
//       }
//     };

//     fetchPets();
//   }, []);

//   const handleUpdate = (petId) => {
//     navigate(`/pets/update/${petId}`);
//   };

//   const handleDelete = async (petId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this pet?");
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:9000/pets/${petId}`);
//         setPets(pets.filter(pet => pet._id !== petId));
//         alert("Pet deleted successfully");
//       } catch (error) {
//         console.error('Error deleting pet:', error);
//         alert("Failed to delete pet");
//       }
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="all-pets-container">
//         <h1>All Pets</h1>
//         <table className="pets-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Species</th>
//               <th>Breed</th>
//               <th>Age</th>
//               <th>Gender</th>
//               <th>Weight</th>
//               <th>Owner</th>
//               <th>Email</th>
//               <th>Date Adopted</th>
//               <th>Additional Notes</th>
//               <th>Vaccinations</th>
//               <th>Profile Photo</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pets.map((pet, index) => (
//               <tr key={pet._id}>
//                 <td>{index + 1}</td>
//                 <td>{pet.petName}</td>
//                 <td>{pet.species}</td>
//                 <td>{pet.breed}</td>
//                 <td>{pet.age}</td>
//                 <td>{pet.gender}</td>
//                 <td>{pet.weight}</td>
//                 <td>{pet.owner.name}</td>
//                 <td>{pet.owner.email}</td>
//                 <td>{new Date(pet.dateAdopted).toLocaleDateString()}</td>
//                 <td>{pet.additionalNotes}</td>
//                 <td>
//                   {pet.vaccinations.map((vaccine, index) => (
//                     <div key={index}>
//                       <strong>{vaccine.vaccineType}:</strong> {new Date(vaccine.dateAdministered).toLocaleDateString()}
//                     </div>
//                   ))}
//                 </td>
//                 <td>
//                   <img src={pet.profilePhoto} alt={`${pet.petName}'s profile`} className="profile-photo" />
//                 </td>
//                 <td>
//                   <button className="update-btn" onClick={() => handleUpdate(pet._id)}>Update</button>
//                   <button className="delete-btn" onClick={() => handleDelete(pet._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AllPets;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../css/allpets.css';

// const AllPets = () => {
//   const [pets, setPets] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('petName'); // Default filter type
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/pets/all-pets');
//         setPets(response.data);
//       } catch (error) {
//         console.error('Error fetching pets:', error);
//       }
//     };

//     fetchPets();
//   }, []);

//   const handleUpdate = (petId) => {
//     navigate(`/pets/update/${petId}`);
//   };

//   const handleDelete = async (petId) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this pet?');
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:9000/pets/${petId}`);
//         setPets(pets.filter(pet => pet._id !== petId));
//         alert('Pet deleted successfully');
//       } catch (error) {
//         console.error('Error deleting pet:', error);
//         alert('Failed to delete pet');
//       }
//     }
//   };

//   // Function to filter pets based on search term and filter type
//   const filteredPets = pets.filter((pet) => {
//     const searchString = searchTerm.toLowerCase();

//     switch (filterType) {
//       case 'petName':
//         return pet.petName.toLowerCase().includes(searchString);
//       case 'species':
//         return pet.species.toLowerCase().includes(searchString);
//       case 'breed':
//         return pet.breed.toLowerCase().includes(searchString);
//       case 'ownerName':
//         return pet.owner.name.toLowerCase().includes(searchString);
//       case 'ownerEmail':
//         return pet.owner.email.toLowerCase().includes(searchString);
//       case 'gender':
//         return pet.gender.toLowerCase().includes(searchString);
//       case 'vaccinations':
//         // Check each vaccine type for a match
//         return pet.vaccinations.some((vaccine) => vaccine.vaccineType.toLowerCase().includes(searchString));
//       case 'vaccineDate':
//         // Check each vaccine date for a match (use the `toLocaleDateString` method to compare)
//         return pet.vaccinations.some((vaccine) => new Date(vaccine.dateAdministered).toLocaleDateString().includes(searchString));
//       default:
//         return true;
//     }
//   });

//   return (
//     <>
//       <Header />
//       <div className='all-pets-container'>
//         <h1>All Pets</h1>

//         {/* Search bar and filter dropdown */}
//         <div className='search-container'>
//           <input
//             type='text'
//             placeholder='Search...'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//             <option value='petName'>Pet Name</option>
//             <option value='species'>Species</option>
//             <option value='breed'>Breed</option>
//             <option value='ownerName'>Owner Name</option>
//             <option value='ownerEmail'>Owner Email</option>
//             <option value='gender'>Gender</option>
//             <option value='vaccinations'>Vaccine Type</option>
//             <option value='vaccineDate'>Vaccine Date</option>
//           </select>
//         </div>

//         {/* Pets table */}
//         <table className='pets-table'>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Pet Name</th>
//               <th>Species</th>
//               <th>Breed</th>
//               <th>Age</th>
//               <th>Gender</th>
//               <th>Weight</th>
//               <th>Owner</th>
//               <th>Email</th>
//               <th>Date Adopted</th>
//               <th>Additional Notes</th>
//               <th>Vaccinations</th>
//               <th>Profile Photo</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredPets.map((pet, index) => (
//               <tr key={pet._id}>
//                 <td>{index + 1}</td>
//                 <td>{pet.petName}</td>
//                 <td>{pet.species}</td>
//                 <td>{pet.breed}</td>
//                 <td>{pet.age}</td>
//                 <td>{pet.gender}</td>
//                 <td>{pet.weight}</td>
//                 <td>{pet.owner.name}</td>
//                 <td>{pet.owner.email}</td>
//                 <td>{new Date(pet.dateAdopted).toLocaleDateString()}</td>
//                 <td>{pet.additionalNotes}</td>
//                 <td>
//                   {pet.vaccinations.map((vaccine, index) => (
//                     <div key={index}>
//                       <strong>{vaccine.vaccineType}:</strong> {new Date(vaccine.dateAdministered).toLocaleDateString()}
//                     </div>
//                   ))}
//                 </td>
//                 <td>
//                   <img src={pet.profilePhoto} alt={`${pet.petName}'s profile`} className='profile-photo' />
//                 </td>
//                 <td>
//                   <button className='update-btn' onClick={() => handleUpdate(pet._id)}>Update</button>
//                   <button className='delete-btn' onClick={() => handleDelete(pet._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AllPets;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/allpets.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('petName'); // Default filter type
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:9000/pets/all-pets');
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  const handleUpdate = (petId) => {
    navigate(`/pets/update/${petId}`);
  };

  const handleDelete = async (petId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this pet?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:9000/pets/${petId}`);
        setPets(pets.filter(pet => pet._id !== petId));
        alert('Pet deleted successfully');
      } catch (error) {
        console.error('Error deleting pet:', error);
        alert('Failed to delete pet');
      }
    }
  };

  // Function to filter pets based on search term and filter type
  const filteredPets = pets.filter((pet) => {
    const searchString = searchTerm.toLowerCase();

    switch (filterType) {
      case 'petName':
        return pet.petName.toLowerCase().includes(searchString);
      case 'species':
        return pet.species.toLowerCase().includes(searchString);
      case 'breed':
        return pet.breed.toLowerCase().includes(searchString);
      case 'ownerName':
        return pet.owner.name.toLowerCase().includes(searchString);
      case 'ownerEmail':
        return pet.owner.email.toLowerCase().includes(searchString);
      case 'gender':
        return pet.gender.toLowerCase().includes(searchString);
      case 'vaccinations':
        // Check each vaccine type for a match
        return pet.vaccinations.some((vaccine) => vaccine.vaccineType.toLowerCase().includes(searchString));
      case 'vaccineDate':
        // Check each vaccine date for a match (use the `toLocaleDateString` method to compare)
        return pet.vaccinations.some((vaccine) => new Date(vaccine.dateAdministered).toLocaleDateString().includes(searchString));
      default:
        return true;
    }
  });

  // Function to download PDF report of the filtered pets
  const downloadPDFReport = () => {
    const doc = new jsPDF();

    // Add title to the PDF document
    doc.setFontSize(18);
    doc.text('Pets Report', 14, 22);

    // Define columns and data for the PDF table
    const columns = [
      { title: 'Name', dataKey: 'petName' },
      { title: 'Species', dataKey: 'species' },
      { title: 'Breed', dataKey: 'breed' },
      { title: 'Age', dataKey: 'age' },
      { title: 'Gender', dataKey: 'gender' },
      { title: 'Weight', dataKey: 'weight' },
      { title: 'Owner', dataKey: 'ownerName' },
      { title: 'Email', dataKey: 'ownerEmail' },
      { title: 'Date Adopted', dataKey: 'dateAdopted' },
      { title: 'Vaccinations', dataKey: 'vaccinations' },
    ];

    const data = filteredPets.map(pet => ({
      petName: pet.petName,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender,
      weight: pet.weight,
      ownerName: pet.owner.name,
      ownerEmail: pet.owner.email,
      dateAdopted: new Date(pet.dateAdopted).toLocaleDateString(),
      vaccinations: pet.vaccinations.map((vaccine) => `${vaccine.vaccineType} (${new Date(vaccine.dateAdministered).toLocaleDateString()})`).join(', '),
    }));

    // Create the table
    doc.autoTable({
      startY: 28,
      head: [columns],
      body: data,
    });

    // Save the PDF
    doc.save('pets_report.pdf');
  };

  return (
    <>
      <Header />
      <div className='all-pets-container'>
        <h1>All Pets</h1>

        {/* Search bar and filter dropdown */}
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value='petName'>Pet Name</option>
            <option value='species'>Species</option>
            <option value='breed'>Breed</option>
            <option value='ownerName'>Owner Name</option>
            <option value='ownerEmail'>Owner Email</option>
            <option value='gender'>Gender</option>
            <option value='vaccinations'>Vaccine Type</option>
            <option value='vaccineDate'>Vaccine Date</option>
          </select>
        </div>

        {/* Button to download PDF report */}
        <button onClick={downloadPDFReport}>Download PDF Report</button>

        {/* Pets table */}
        <table className='pets-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Pet Name</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Date Adopted</th>
              <th>Additional Notes</th>
              <th>Vaccinations</th>
              <th>Profile Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet, index) => (
              <tr key={pet._id}>
                <td>{index + 1}</td>
                <td>{pet.petName}</td>
                <td>{pet.species}</td>
                <td>{pet.breed}</td>
                <td>{pet.age}</td>
                <td>{pet.gender}</td>
                <td>{pet.weight}</td>
                <td>{pet.owner.name}</td>
                <td>{pet.owner.email}</td>
                <td>{new Date(pet.dateAdopted).toLocaleDateString()}</td>
                <td>{pet.additionalNotes}</td>
                <td>
                  {pet.vaccinations.map((vaccine, index) => (
                    <div key={index}>
                      <strong>{vaccine.vaccineType}:</strong> {new Date(vaccine.dateAdministered).toLocaleDateString()}
                    </div>
                  ))}
                </td>
                <td>
                  <img src={pet.profilePhoto} alt={`${pet.petName}'s profile`} className='profile-photo' />
                </td>
                <td>
                  <button className='update-btn' onClick={() => handleUpdate(pet._id)}>Update</button>
                  <button className='delete-btn' onClick={() => handleDelete(pet._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default AllPets;
