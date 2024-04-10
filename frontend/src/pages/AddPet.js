// // // // // // // AddPet.js
// // // // // // import React, { useState } from 'react';
// // // // // // import axios from 'axios';

// // // // // // const AddPet = ({ customerId }) => {
// // // // // //   const [name, setName] = useState('');
// // // // // //   const [breed, setBreed] = useState('');
// // // // // //   const [age, setAge] = useState('');

// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     try {
// // // // // //       const response = await axios.post('/pets/add', {
// // // // // //         name,
// // // // // //         breed,
// // // // // //         age,
// // // // // //         ownerId: customerId
// // // // // //       });
// // // // // //       console.log('Pet added successfully:', response.data);
// // // // // //       // You can redirect or perform any action upon successful addition of pet
// // // // // //     } catch (error) {
// // // // // //       console.error('Error adding pet:', error);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <h2>Add Pet</h2>
// // // // // //       <form onSubmit={handleSubmit}>
// // // // // //         <label>Name:</label>
// // // // // //         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
// // // // // //         <label>Breed:</label>
// // // // // //         <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
// // // // // //         <label>Age:</label>
// // // // // //         <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
// // // // // //         <button type="submit">Add Pet</button>
// // // // // //       </form>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default AddPet;
// // // // // // AddPet.js
// // // // // import React, { useState } from 'react';
// // // // // import axios from 'axios';

// // // // // const AddPet = ({ customerId, setPets, handleNavigation }) => {
// // // // //   const [name, setName] = useState('');
// // // // //   const [breed, setBreed] = useState('');
// // // // //   const [age, setAge] = useState('');

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     try {
// // // // //       const response = await axios.post('/pets/add', {
// // // // //         name,
// // // // //         breed,
// // // // //         age,
// // // // //         ownerId: customerId
// // // // //       });
// // // // //       console.log('Pet added successfully:', response.data);
// // // // //       // Update pets list after adding a new pet
// // // // //       setPets(prevPets => [...prevPets, response.data]);
// // // // //       // Navigate to My Pets page
// // // // //       handleNavigation('/my-pets');
// // // // //     } catch (error) {
// // // // //       console.error('Error adding pet:', error);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <h2>Add Pet</h2>
// // // // //       <form onSubmit={handleSubmit}>
// // // // //         <label>Name:</label>
// // // // //         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
// // // // //         <label>Breed:</label>
// // // // //         <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
// // // // //         <label>Age:</label>
// // // // //         <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
// // // // //         <button type="submit">Add Pet</button>
// // // // //       </form>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default AddPet;
// // // // import React, { useState } from 'react';
// // // // import axios from 'axios';

// // // // const AddPet = ({ customerId, setPets }) => {
// // // //   const [name, setName] = useState('');
// // // //   const [breed, setBreed] = useState('');
// // // //   const [age, setAge] = useState('');

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       const response = await axios.post('/pets/add', {
// // // //         name,
// // // //         breed,
// // // //         age,
// // // //         ownerId: customerId
// // // //       });
// // // //       console.log('Pet added successfully:', response.data);
// // // //       // Update pets list after adding a new pet
// // // //       setPets(prevPets => [...prevPets, response.data]);
// // // //     } catch (error) {
// // // //       console.error('Error adding pet:', error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h2>Add Pet</h2>
// // // //       <form onSubmit={handleSubmit}>
// // // //         <label>Name:</label>
// // // //         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
// // // //         <label>Breed:</label>
// // // //         <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
// // // //         <label>Age:</label>
// // // //         <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
// // // //         <button type="submit">Add Pet</button>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AddPet;
// // // import React, { useState } from 'react';
// // // import axios from 'axios';

// // // const AddPet = ({ customerId, setPets, handleNavigation }) => {
// // //   const [name, setName] = useState('');
// // //   const [breed, setBreed] = useState('');
// // //   const [age, setAge] = useState('');

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const response = await axios.post('/pets/add', {
// // //         name,
// // //         breed,
// // //         age,
// // //         ownerId: customerId
// // //       });
// // //       console.log('Pet added successfully:', response.data);
// // //       // Update pets list after adding a new pet
// // //       setPets(prevPets => [...prevPets, response.data]);
// // //       // Navigate to My Pets page
// // //       handleNavigation('/my-pets');
// // //     } catch (error) {
// // //       console.error('Error adding pet:', error);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>Add Pet</h2>
// // //       <form onSubmit={handleSubmit}>
// // //         <label>Name:</label>
// // //         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
// // //         <label>Breed:</label>
// // //         <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
// // //         <label>Age:</label>
// // //         <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
// // //         <button type="submit">Add Pet</button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default AddPet;
// // // AddPet.js

// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const AddPet = () => {
// //   const [formData, setFormData] = useState({
// //     petName: '',
// //     species: '',
// //     breed: '',
// //     age: '',
// //     owner: '' // Assuming you need to specify the owner of the pet
// //   });

// //   const { petName, species, breed, age, owner } = formData;

// //   const handleChange = e => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async e => {
// //     e.preventDefault();

// //     try {
// //       const res = await axios.post('http://localhost:9000/pet/add', formData);
// //       console.log(res.data);
// //       // Optionally, you can redirect the user to another page after successful submission
// //       // history.push('/mypets');
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Add a Pet</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Pet Name:</label>
// //           <input type="text" name="petName" value={petName} onChange={handleChange} required />
// //         </div>
// //         <div>
// //           <label>Species:</label>
// //           <input type="text" name="species" value={species} onChange={handleChange} required />
// //         </div>
// //         <div>
// //           <label>Breed:</label>
// //           <input type="text" name="breed" value={breed} onChange={handleChange} required />
// //         </div>
// //         <div>
// //           <label>Age:</label>
// //           <input type="text" name="age" value={age} onChange={handleChange} required />
// //         </div>
// //         <div>
// //           <label>Owner:</label>
// //           <input type="text" name="owner" value={owner} onChange={handleChange} required />
// //         </div>
// //         <button type="submit">Add Pet</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddPet;
// // AddPet.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const AddPet = () => {
//   const { customerId } = useParams();

// //console.log(customerId); // Log the customerId to check if it's received correctly

// const [formData, setFormData] = useState({
//   petName: '',
//   species: '',
//   breed: '',
//   age: '',
//   gender: '',
//   weight: ''
// });

//   const { petName, species, breed, age, gender, weight } = formData;

//   const onChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async e => {
//     e.preventDefault();
  
//     //console.log(formData); // Log the formData to check if it's correct before submitting
  
//     try {
//       const res = await axios.post('http://localhost:9000/pets/add', {
//         ...formData,
//         owner: customerId
//       });
//       console.log('Response from server:',res.data);
//       window.location.href = '/MyPets';
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  

//   return (
   
//       <div>
//        <h2>Add a Pet</h2>
//        <form onSubmit={onSubmit}>
//          <div>
//            <label>Pet Name:</label>
//            <input type="text" name="petName" value={petName} onChange={onChange} required />
//          </div>
//          <div>
//            <label>Species:</label>
//            <input type="text" name="species" value={species} onChange={onChange} required />
//          </div>
//          <div>
//            <label>Breed:</label>
//           <input type="text" name="breed" value={breed} onChange={onChange} required />
//          </div>
//          <div>
//           <label>Age:</label>
//          <input type="text" name="age" value={age} onChange={onChange} required />
//        </div>
//        <div>
//           <label>Gender:</label>
//          <input type="text" name="gender" value={gender} onChange={onChange} required />
//        </div>
//        <div>
//           <label>Weight:</label>
//          <input type="text" name="weight" value={weight} onChange={onChange} required />
//        </div>
        
//          <button type="submit">Add Pet</button>
//        </form>
//      </div>
       
       
    
   
//   );
// };

// export default AddPet;

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
