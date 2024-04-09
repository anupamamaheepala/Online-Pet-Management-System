// MyPets.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyPets = ({ customerId }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`/pets/customer/${customerId}`);
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPets();
  }, [customerId]);

  return (
    <div>
      <h2>My Pets</h2>
      <ul>
        {pets.map(pet => (
          <li key={pet._id}>
            <Link to={`/pet/${pet._id}`}>{pet.name}</Link>
          </li>

        ))}
      </ul>
      <Link to={`/addpet/${customerId}`}>Add Pet</Link>{/* Link to the page where users can add pets */}
    </div>
  );
};

export default MyPets;
