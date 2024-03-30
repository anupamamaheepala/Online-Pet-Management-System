import Header from '../components/Header'; 
import Footer from '../components/Footer';
import '../css/advertisement.css'; 
import React, { useState } from 'react';
import axios from 'axios';

const AddAdvertisement = () => {

        const [formData, setFormData] = useState({
          title: '',
          description: ''
        });
      
        const { title, description } = formData;
      
        const onChange = e =>
          setFormData({ ...formData, [e.target.name]: e.target.value });
      
        const onSubmit = async e => {
          e.preventDefault();
          try {
            const res = await axios.post('/api/advertisement/add', formData);
            console.log(res.data); // Assuming you want to log the response
            // You can redirect or show a success message here
          } catch (err) {
            console.error(err.response.data);
            // Handle errors, show error messages, etc.
          }
        };

        
    return (
        <>
            <Header /> 
            
            <form className="ma_advertisement-form">
                <h2>Add your advertisement details here. </h2>
                <p>You should enter the pet's date of birth, health status, height, weight etc. in the description box.
                <b> If your pet is lost,</b> include those facts clearly. The time the pet went missing, last seen location etc.</p>
                
                <div className="ma_form-group">
                    <label htmlFor="ownerName">Owner Name:</label>
                    <input type="text" id="ownerName" name="ownerName" />
                </div>
                
                <div className="ma_form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                
                <div className="ma_form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" />
                </div>
                
                <div className="ma_form-group">
                    <label htmlFor="Breed">Breed:</label>
                    <input type="text" id="Breed" name="Breed" />
                </div>
                
                <div className="ma_form-group">
                    <label htmlFor="purpose">Purpose of the advertisement:</label>
                    <select id="purpose" name="purpose">
                        <option value="" disabled selected>Select Purpose</option>
                        <option value="pet_for_sale">Pet for sale</option>
                        <option value="lost_my_pet">Lost my pet</option>
                    </select>
                </div>
                
                <div className="ma_form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description"></textarea>
                </div>
                
                <div className="ma_form-group">
                    <label htmlFor="picture">Upload Picture:</label>
                    <input type="file" id="picture" name="picture" accept="image/*" />
                </div>
                
                <div className="ma_form-group">
                    <label htmlFor="price">Price(LKR):</label>
                    <input type="text" id="price" name="price" />
                </div>
                
                <div className="ma_form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input type="text" id="contact" name="contact" />
                </div>
                
                <button style={{width:'150px'}} type="submit" className="ma_submit-button">Submit</button>
            </form>
            <Footer />
        </>
    );
}

export default AddAdvertisement;
