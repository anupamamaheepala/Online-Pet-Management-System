import React, { useState } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/addpet.css'; // Import CSS file

const AddPet = () => {
  const { customerId } = useParams();

  const [formData, setFormData] = useState({
    petName: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    weight: ''
  });

  const { petName, species, breed, age, gender, weight } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:9000/pets/add', {
        ...formData,
        owner: customerId
      });
      console.log('Response from server:', res.data);
      window.location.href = '/my-pets/:customerId';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
<Header />
    <div className="add-pet-container"> {/* Use unique class name */}
    <center><h2>Add a Pet</h2></center>
      <form onSubmit={onSubmit}>
        <div className="add-pet-form-group"> {/* Use unique class name */}
          <label htmlFor="petName">Pet Name:</label>
          <input type="text" id="petName" name="petName" value={petName} onChange={onChange} required />
        </div>
        <div className="add-pet-form-group"> {/* Use unique class name */}
          <label htmlFor="species">Species:</label>
          <input type="text" id="species" name="species" value={species} onChange={onChange} required />
        </div>
        <div className="add-pet-form-group"> {/* Use unique class name */}
          <label htmlFor="breed">Breed:</label>
          <input type="text" id="breed" name="breed" value={breed} onChange={onChange} required />
        </div>
        <div className="add-pet-form-group"> {/* Use unique class name */}
          <label htmlFor="age">Age:</label>
          <input type="text" id="age" name="age" value={age} onChange={onChange} required />
        </div>
        <div className="add-pet-form-group"> {/* Use unique class name */}
          <label htmlFor="gender">Gender:</label>
          <input type="text" id="gender" name="gender" value={gender} onChange={onChange} required />
        </div>
        <div className="add-pet-form-group"> {/* Use unique class name */}
          <label htmlFor="weight">Weight:</label>
          <input type="text" id="weight" name="weight" value={weight} onChange={onChange} required />
        </div>
                <center><button type="submit" className="add-pet-button">Add Pet</button></center> {/* Use unique class name */}
        
      </form>
    </div>
    <br></br>
<Footer />
</>
  );
};

export default AddPet;
