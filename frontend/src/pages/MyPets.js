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
                <Link className="mypetlink" to={`/pet-profile/${pet._id}`}>
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
        
        <div className="add-pet-button-container"> 
          <Link to={`/addpet/${customerId}`}>
            <button className="addto-pet-button">Add Pet</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPets;
