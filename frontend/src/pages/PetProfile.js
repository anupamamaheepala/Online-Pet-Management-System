// PetProfile.js
import React from 'react';

const PetProfile = ({ pet }) => {
  return (
    <div>
      <h2>{pet.name}'s Profile</h2>
      <p>Name: {pet.name}</p>
      <p>Species: {pet.species}</p>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>
      {/* Add more pet details as needed */}
    </div>
  );
};

export default PetProfile;
