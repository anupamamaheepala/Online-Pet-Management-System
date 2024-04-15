import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/editpetprofile.css';

const UpdatePet = () => {
    const { petId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        petName: '',
        species: '',
        breed: '',
        age: { value: '', unit: 'years' },
        gender: '',
        weight: '',
        dateAdopted: '',
        additionalNotes: '',
        vaccinations: [],
        profilePhoto: null, 
    });
    
    const [ageError, setAgeError] = useState('');

    useEffect(() => {
        // Fetch pet data from the server using the pet ID
        const fetchPetData = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/pets/${petId}`);
                const petData = response.data;

                // Ensure the age field is an object with `value` and `unit` properties
                const { age } = petData;
                const ageData = age && typeof age === 'object' ? age : { value: '', unit: 'years' };
                
                setFormData({
                    ...petData,
                    age: ageData,
                });
            } catch (error) {
                console.error('Error fetching pet data:', error);
            }
        };

        fetchPetData();
    }, [petId]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevState) => ({
                ...prevState,
                profilePhoto: file,
            }));
        }
    };
    

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check for nested properties in formData
        if (name.includes('.')) {
            const [mainProp, subProp] = name.split('.');
            setFormData((prevState) => ({
                ...prevState,
                [mainProp]: {
                    ...prevState[mainProp],
                    [subProp]: value,
                },
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }

        // Validate age when either value or unit changes
        if (name === 'age.value' || name === 'age.unit') {
            validateAge(formData.age.value, formData.age.unit);
        }
    };

    // Function to validate age
    const validateAge = (value, unit) => {
        let valid = false;

        if (unit === 'years') {
            valid = value >= 0 && value <= 30;
        } else if (unit === 'months') {
            valid = value >= 0 && value <= 360;
        } else if (unit === 'days') {
            valid = value >= 0 && value <= 10950;
        }

        if (!valid) {
            setAgeError(`Invalid age range for ${unit}.`);
        } else {
            setAgeError('');
        }
    };

    // Handle vaccination changes
    const handleVaccinationChange = (index, field, value) => {
        const updatedVaccinations = [...formData.vaccinations];
        updatedVaccinations[index][field] = value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            vaccinations: updatedVaccinations,
        }));
    };

    // Add a new vaccination entry
    const addVaccination = () => {
        const newVaccination = {
            vaccineType: '',
            dateAdministered: '',
        };
        setFormData((prevFormData) => ({
            ...prevFormData,
            vaccinations: [...prevFormData.vaccinations, newVaccination],
        }));
    };

    // Remove a vaccination entry
    const removeVaccination = (index) => {
        const confirmed = window.confirm('Are you sure you want to delete this vaccination?');
        if (confirmed) {
            const updatedVaccinations = [...formData.vaccinations];
            updatedVaccinations.splice(index, 1);
            setFormData((prevFormData) => ({
                ...prevFormData,
                vaccinations: updatedVaccinations,
            }));
        }
    };

    // // Handle form submission
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // Validate age before submitting
    //     validateAge(formData.age.value, formData.age.unit);
    //     if (ageError) {
    //         alert(ageError);
    //         return;
    //     }

    //     try {
    //         // Send a PUT request to update the pet profile
    //         await axios.put(`http://localhost:9000/pets/${petId}`, formData);
    //         alert('Pet profile updated successfully.');
    //         navigate('/all-pets'); // Redirect to the all-pets page
    //     } catch (error) {
    //         console.error('Error updating pet profile:', error);
    //         alert('Failed to update pet profile.');
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate age before submitting
        validateAge(formData.age.value, formData.age.unit);
        if (ageError) {
            alert(ageError);
            return;
        }
    
        // Create a FormData object to handle file uploads
        const formDataObj = new FormData();
        formDataObj.append('petName', formData.petName);
        formDataObj.append('species', formData.species);
        formDataObj.append('breed', formData.breed);
        formDataObj.append('age', JSON.stringify(formData.age));
        formDataObj.append('gender', formData.gender);
        formDataObj.append('weight', formData.weight);
        formDataObj.append('dateAdopted', formData.dateAdopted);
        formDataObj.append('additionalNotes', formData.additionalNotes);
        
        // Append the profile photo if it exists
        if (formData.profilePhoto) {
            formDataObj.append('profilePhoto', formData.profilePhoto);
        }
        
        // Append the vaccinations array
        formDataObj.append('vaccinations', JSON.stringify(formData.vaccinations));
    
        try {
            // Send a PUT request to update the pet profile
            await axios.put(`http://localhost:9000/pets/${petId}`, formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Needed for file uploads
                },
            });
            alert('Pet profile updated successfully.');
            navigate('/all-pets'); // Redirect to the all-pets page
        } catch (error) {
            console.error('Error updating pet profile:', error);
            alert('Failed to update pet profile.');
        }
    };
    

    return (
        <div className="editPetProfileContainer">
            <h2>Update Pet</h2>
            <form onSubmit={handleSubmit} className="editPetProfileForm">
                {/* Form fields for pet information */}
                <label htmlFor="petName" className="editPetProfileLabel">Pet Name:</label>
                <input
                    type="text"
                    id="petName"
                    name="petName"
                    value={formData.petName}
                    onChange={handleChange}
                    className="editPetProfileInput"
                />
                <label htmlFor="profilePhoto" className="editPetProfileLabel">Profile Photo:</label>
<input
    type="file"
    id="profilePhoto"
    name="profilePhoto"
    onChange={(e) => handlePhotoChange(e)}
    className="editPetProfileInput"
/>

                <label htmlFor="species" className="editPetProfileLabel">Species:</label>
                <input
                    type="text"
                    id="species"
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    className="editPetProfileInput"
                />

                <label htmlFor="breed" className="editPetProfileLabel">Breed:</label>
                <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    className="editPetProfileInput"
                />

                {/* Age section */}
                <div className="ageInputContainer">
                    <label htmlFor="ageValue" className="editPetProfileLabel">Age:</label>
                    <input
                        type="number"
                        id="ageValue"
                        name="age.value"
                        value={formData.age.value}
                        onChange={handleChange}
                        className="editPetProfileInput"
                    />
                    <select
                        id="ageUnit"
                        name="age.unit"
                        value={formData.age.unit}
                        onChange={handleChange}
                        className="editPetProfileSelect"
                    >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                        <option value="days">Days</option>
                    </select>
                    {/* Display age error if there is one */}
                    {ageError && <span className="ageErrorText">{ageError}</span>}
                </div>

                <label htmlFor="gender" className="editPetProfileLabel">Gender:</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="editPetProfileSelect"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <label htmlFor="weight" className="editPetProfileLabel">Weight:</label>
                <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="editPetProfileInput"
                />

                <label htmlFor="dateAdopted" className="editPetProfileLabel">Date Adopted:</label>
                <input
                    type="date"
                    id="dateAdopted"
                    name="dateAdopted"
                    value={formData.dateAdopted}
                    onChange={handleChange}
                    className="editPetProfileInput"
                />

                <label htmlFor="additionalNotes" className="editPetProfileLabel">Additional Notes:</label>
                <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    className="editPetProfileTextarea"
                />

                {/* Vaccination entries */}
                <h3>Vaccinations:</h3>
                {formData.vaccinations.map((vaccination, index) => (
                    <div key={index} className="vaccinationEntry">
                        <label htmlFor={`vaccineType-${index}`} className="editPetProfileLabel">Vaccine Type:</label>
                        <input
                            type="text"
                            id={`vaccineType-${index}`}
                            name={`vaccineType-${index}`}
                            value={vaccination.vaccineType}
                            onChange={(e) => handleVaccinationChange(index, 'vaccineType', e.target.value)}
                            className="editPetProfileInput"
                        />

                        <label htmlFor={`dateAdministered-${index}`} className="editPetProfileLabel">Date Administered:</label>
                        <input
                            type="date"
                            id={`dateAdministered-${index}`}
                            name={`dateAdministered-${index}`}
                            value={vaccination.dateAdministered}
                            onChange={(e) => handleVaccinationChange(index, 'dateAdministered', e.target.value)}
                            className="editPetProfileInput"
                        />

                        <button
                            type="button"
                            onClick={() => removeVaccination(index)}
                            className="removeVaccinationButton"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addVaccination} className="addVaccinationButton">
                    Add Vaccination
                </button>

                {/* Submit button */}
                <button type="submit" className="submitButton">Update Pet</button>
            </form>
        </div>
    );
};

export default UpdatePet;
