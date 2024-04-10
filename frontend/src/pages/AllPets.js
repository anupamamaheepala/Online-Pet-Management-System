// // export default AllPets;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../css/allpets.css'; // Import CSS file for styling

// const AllPets = () => {
//   const [pets, setPets] = useState([]);

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

//   return (
//     <>
//       <Header />
//     <div className="all-pets-container">
//       <h1>All Pets</h1>
//       <table className="pets-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Species</th>
//             <th>Breed</th>
//             <th>Age</th>
//             <th>Gender</th>
//             <th>Weight</th>
//             <th>Owner</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pets.map((pet, index) => (
//             <tr key={pet._id}>
//               <td>{index + 1}</td>
//               <td>{pet.petName}</td>
//               <td>{pet.species}</td>
//               <td>{pet.breed}</td>
//               <td>{pet.age}</td>
//               <td>{pet.gender}</td>
//               <td>{pet.weight}</td>
//               <td>{pet.owner.name}</td>
//               <td>{pet.owner.email}</td>
//               <td>
//                 <button className="update-btn">Update</button>
//                 <button className="delete-btn">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     <Footer />
//     </>
//   );
// };

// export default AllPets;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/allpets.css'; // Import CSS file for styling

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);


  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:9000/pets/all-pets");
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);


  

  const handleDelete = async (petId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pet?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:9000/pets/${petId}`);
        setPets(pets.filter(pet => pet._id !== petId));
        alert("Pet deleted successfully");
      } catch (error) {
        console.error('Error deleting pet:', error);
        alert("Failed to delete pet");
      }
    } else {
      alert("Deletion cancelled");
    }
  };

  return (
    <>
      <Header />
      <div className="all-pets-container">
        <h1>All Pets</h1>
        <table className="pets-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet, index) => (
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
                <td>
                <button className="update-btn" >Update</button>
                  <button className="delete-btn" onClick={() => handleDelete(pet._id)}>Delete</button>
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

