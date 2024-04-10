// // // MyPets.js
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Link } from 'react-router-dom';

// // const MyPets = ({ customerId }) => {
// //   const [pets, setPets] = useState([]);

// //   useEffect(() => {
// //     const fetchPets = async () => {
// //       try {
// //         const response = await axios.get(`/pets/customer/${customerId}`);
// //         setPets(response.data);
// //       } catch (error) {
// //         console.error('Error fetching pets:', error);
// //       }
// //     };
// //     fetchPets();
// //   }, [customerId]);

// //   return (
// //     <div>
// //       <h2>My Pets</h2>
// //       <ul>
// //         {pets.map(pet => (
// //           <li key={pet._id}>
// //             <Link to={`/pet/${pet._id}`}>{pet.name}</Link>
// //           </li>

// //         ))}
// //       </ul>
// //       <Link to={`/addpet/${customerId}`}>Add Pet</Link>{/* Link to the page where users can add pets */}
// //     </div>
// //   );
// // };

// // export default MyPets;
// // MyPets.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const MyPets = () => {
//   const { customerId } = useParams();
//   const [customerPets, setCustomerPets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCustomerPets = async () => {
//       try {
//         const res = await axios.get(`http://localhost:9000/pets/my-pets/${customerId}`);
//         setCustomerPets(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         // Handle error
//       }
//     };

//     fetchCustomerPets();
//   }, [customerId]);

//   return (
//     <div className="MyPetsContainer">
//       <h2>My Pets</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {customerPets.map(pet => (
//             <div key={pet._id}>
//               <h3>{pet.petName}</h3>
//               <p>Species: {pet.species}</p>
//               <p>Breed: {pet.breed}</p>
//               <p>Age: {pet.age}</p>
//               <p>Gender: {pet.gender}</p>
//               <p>Weight: {pet.weight}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyPets;
// MyPets.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const MyPets = () => {
  const { customerId } = useParams();
  const [customerPets, setCustomerPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerPets = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/pets/my-pets/${customerId}`);
        setCustomerPets(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchCustomerPets();
  }, [customerId]);

  return (
    <div className="MyPetsContainer">
      <h2>My Pets</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {customerPets.map(pet => (
            <div key={pet._id}>
              <Link to={`/pet-profile/${pet._id}`}>
                <h3>{pet.petName}</h3>
                <p>Species: {pet.species}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPets;
