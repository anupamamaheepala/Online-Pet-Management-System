
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/addpet.css';

const AddPet = () => {
    const { customerId } = useParams();

    // Initialize form data with default values
    const [formData, setFormData] = useState({
        petName: '',
        species: '',
        breed: '',
        ageValue: '', 
        ageUnit: 'years', 
        gender: '',
        weight: 'kg',
        dateAdopted: '',
        additionalNotes: '',
        profileImage: '' 
    });

    // Initialize error state for age validation
    const [ageError, setAgeError] = useState('');

    // Handle form field changes
    // Handle form field changes
    const onChange = (e) => {
    const { name, value } = e.target;

    // Validate input for petName and species fields
    if (name === 'petName' || name === 'species') {
        // Allow only letters (alphabetic characters)
        const onlyLetters = /^[a-zA-Z\s]*$/; // Regular expression to match only letters and spaces
        if (!onlyLetters.test(value)) {
            // If input contains any characters other than letters or spaces, don't update the state
            return;
        }
    }

    // Update form data state
    setFormData((prevData) => ({
        ...prevData,
        [name]: value
    }));

    // Validate age input when the ageValue or ageUnit changes
    if (name === 'ageValue' || name === 'ageUnit') {
        validateAge(value, formData.ageUnit);
    }
};

    const validateAge = (ageValue, ageUnit) => {
        let error = '';
    
        // Convert ageValue to a number
        const value = parseFloat(ageValue);
        
        // Check the age value range based on the age unit
        if (isNaN(value)) {
            error = 'Age value must be a valid number.';
        } else {
            switch (ageUnit) {
                case 'years':
                    if (value < 0 || value > 30) {
                        error = 'Age in years must be between 0 and 30.';
                    }
                    break;
                case 'months':
                    if (value < 0 || value > 360) {
                        error = 'Age in months must be between 0 and 360.';
                    }
                    break;
                case 'days':
                    if (value < 0 || value > 10950) {
                        error = 'Age in days must be between 0 and 10,950.';
                    }
                    break;
                default:
                    error = 'Invalid age unit.';
            }
        }
    
        // Update the state with the error message
        setAgeError(error);
    
        return error === ''; // Return true if no error, false otherwise
    };
    
    

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();

        // First, validate the age input
    if (!validateAge(formData.ageValue, formData.ageUnit)) {
        alert('Please correct the age value before submitting the form.');
        return;
    }
        
   // Convert and validate weight
    const parsedWeight = parseFloat(formData.weight);
    if (isNaN(parsedWeight) || parsedWeight <= 0 || parsedWeight >= 150) {
    alert('Please enter a valid weight between 0 and 150.');
    return;
}

    
        // Convert ageValue to a number
        const ageValueNumber = parseFloat(formData.ageValue);
    
        // Check if ageValue is a valid non-negative number
        if (isNaN(ageValueNumber) || ageValueNumber < 0) {
            alert('Please enter a valid non-negative age value.');
            return;
        }
    
        // Validate the age unit
        const validAgeUnits = ['years', 'months', 'days'];
        if (!validAgeUnits.includes(formData.ageUnit)) {
            alert('Please select a valid age unit.');
            return;
        }
    
        // Prepare the request payload
        const payload = {
            petName: formData.petName,
            species: formData.species,
            breed: formData.breed,
            ageValue: ageValueNumber, // Convert ageValue to a number
            ageUnit: formData.ageUnit,
            gender: formData.gender,
            weight: parseFloat(formData.weight),
            dateAdopted: formData.dateAdopted,
            additionalNotes: formData.additionalNotes,
            owner: customerId,
        };
    
        try {
            // Send the request payload to the server
            const res = await axios.post(`http://localhost:9000/pets/add`, payload);
            console.log('Response from server:', res.data);
    
            // Redirect back to the my-pets page
            window.location.href = `/my-pets/${customerId}`;
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving pet. Please try again.');
        }
    };
    
    return (
        <>
            <Header />
            <div className="add-pet-container">
                <center><h2>Add a Pet</h2></center>
                <form onSubmit={onSubmit}>
                    {/* Form fields */}
                    <div className="add-pet-form-group">
                        <label htmlFor="petName">Pet Name:</label>
                        <input type="text" id="petName" name="petName" value={formData.petName} onChange={onChange} required />
                    </div>
                    <div className="add-pet-form-group">
                        <label htmlFor="species">Species:</label>
                        <input type="text" id="species" name="species" value={formData.species} onChange={onChange} required />
                    </div>
                    <div className="add-pet-form-group">
                        <label htmlFor="breed">Breed:</label>
                        <input type="text" id="breed" name="breed" value={formData.breed} onChange={onChange} />
                    </div>
                    <div className="add-pet-form-group">
                        <label htmlFor="ageValue">Age:</label>
                        <input type="number" id="ageValue" name="ageValue" value={formData.ageValue} onChange={onChange} required />
                        <select id="ageUnit" name="ageUnit" value={formData.ageUnit} onChange={onChange} required>
                            <option value="years">Years</option>
                            <option value="months">Months</option>
                            <option value="days">Days</option>
                        </select>
                    </div>

                    {/* Display error message for invalid age */}
                    {ageError && (
                        <div className="age-error">
                            {ageError}
                        </div>
                    )}

                    <div className="add-pet-form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" name="gender" value={formData.gender} onChange={onChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="add-pet-form-group">
                        <label htmlFor="weight">Weight(In Kg):</label>
                        <input type="number" id="weight" name="weight" value={formData.weight} onChange={onChange} />
                    </div>

                    <div className="add-pet-form-group">
                        <label htmlFor="dateAdopted">Date Adopted:</label>
                        <input type="date" id="dateAdopted" name="dateAdopted" value={formData.dateAdopted ? formData.dateAdopted : ''}  onChange={onChange} />
                    </div>
                    <div className="add-pet-form-group">
                        <label htmlFor="additionalNotes">Additional Notes:</label>
                        <textarea id="additionalNotes" name="additionalNotes" value={formData.additionalNotes} onChange={onChange}></textarea>
                    </div>
                    <center>
                        <button type="submit" className="add-pet-button">Add Pet</button>
                    </center>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default AddPet;
