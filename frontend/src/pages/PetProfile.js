// // // // PetProfile.js
// // // import React from 'react';

// // // const PetProfile = ({ pet }) => {
// // //   return (
// // //     <div>
// // //       <h2>{pet.name}'s Profile</h2>
// // //       <p>Name: {pet.name}</p>
// // //       <p>Species: {pet.species}</p>
// // //       <p>Breed: {pet.breed}</p>
// // //       <p>Age: {pet.age}</p>
// // //       {/* Add more pet details as needed */}
// // //     </div>
// // //   );
// // // };

// // // export default PetProfile;
// // // PetProfile.js

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';

// // const PetProfile = () => {
// //   const { petId } = useParams();
// //   const [petData, setPetData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchPetData = async () => {
// //       try {
// //         const res = await axios.get(`http://localhost:9000/pets/${petId}`);
// //         setPetData(res.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error(error);
// //         // Handle error
// //       }
// //     };

// //     fetchPetData();
// //   }, [petId]);

// //   return (
// //     <div className="PetProfileContainer">
// //       <h2>Pet Profile</h2>
// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : (
// //         <div>
// //           <h3>{petData.petName}</h3>
// //           <p>Species: {petData.species}</p>
// //           <p>Breed: {petData.breed}</p>
// //           <p>Age: {petData.age}</p>
// //           <p>Gender: {petData.gender}</p>
// //           <p>Weight: {petData.weight}</p>
// //           {/* Add more details as needed */}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PetProfile;
// // PetProfile.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

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
//         console.error(error);
//         // Handle error
//       }
//     };

//     fetchPetData();
//   }, [petId]);

//   return (
//     <div className="PetProfileContainer">
//       <h2>Pet Profile</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <h3>{petData.petName}</h3>
//           <p>Species: {petData.species}</p>
//           <p>Breed: {petData.breed}</p>
//           <p>Age: {petData.age}</p>
//           <p>Gender: {petData.gender}</p>
//           <p>Weight: {petData.weight}</p>
//           {/* Add more details as needed */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PetProfile;
// PetProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PetProfile = () => {
  const { petId } = useParams();
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Pet ID:', petId);// Log petId here
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

  return (
    <div className="PetProfileContainer">
    <h2>Pet Profile</h2>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <h3>{petData.petName}</h3>
        <p>Species: {petData.species}</p>
        <p>Breed: {petData.breed}</p>
        <p>Age: {petData.age}</p>
        <p>Gender: {petData.gender}</p>
        <p>Weight: {petData.weight}</p>
        {/* Add more details as needed */}
      </div>
    )}
 </div>
  );
};

export default PetProfile;
