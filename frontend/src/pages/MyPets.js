// // export default MyPets;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import '../css/mypets.css';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

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
//     <>
//       <Header />
//     <div className="MyPetsContainer">
//       <h2>My Pets</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {customerPets.map(pet => (
//             <div className="PetCard" key={pet._id}>
//               <Link to={`/pet-profile/${pet._id}`}>
//                 <img src={pet.profileImage} alt={pet.petName} className="PetImage" />
//                 <div className="PetDetails">
//                   <h3 className="PetName">{pet.petName}</h3>
//                   <p className="PetSpecies">Species: {pet.species}</p>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//     <Footer />
//     </>
//   );
// };

// export default MyPets;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../css/mypets.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <>
      <Header />
      <div className="MyPetsContainer">
        <h2>My Pets</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {customerPets.map(pet => (
              <div className="PetCard" key={pet._id}>
                <Link to={`/pet-profile/${pet._id}`}>
                      <img src={pet.profilePhoto} alt={pet.petName} className="PetImage" />
                      <div className="PetDetails">
                        <h3 className="PetName">{pet.petName}</h3>
                        <p className="PetSpecies">Species: {pet.species}</p>
                      </div>
                </Link>

              </div>
            ))}
          </div>
        )}
        {/* Add Pet Button */}
        <div className="add-pet-button-container"> {/* Container for the button */}
          <Link to={`/addpet/${customerId}`}>
            <button className="add-pet-button">Add Pet</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPets;
