import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/editpetprofile.css';

const EditPetProfile = () => {
    const { petId } = useParams();
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
    });
    const [loading, setLoading] = useState(true);
    const [ageError, setAgeError] = useState('');

    // Load pet data when the component mounts
    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const res = await axios.get(`http://localhost:9000/pets/${petId}`);
                const petData = res.data;
                // Split the age into value and unit
                const { age } = petData;
                setFormData({
                    ...petData,
                    ageValue: age.value,
                    ageUnit: age.unit,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pet data:', error);
            }
        };

        fetchPetData();
    }, [petId]);

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate age input when ageValue or ageUnit changes
        if (name === 'ageValue' || name === 'ageUnit') {
            validateAge(value, formData.ageUnit);
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

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (ageError) {
            alert(ageError);
            return;
        }

        try {
            // Create an object with the relevant fields to update
            const updatedData = {
                petName: formData.petName,
                species: formData.species,
                breed: formData.breed,
                age: {
                    value: formData.ageValue,
                    unit: formData.ageUnit,
                },
                gender: formData.gender,
                weight: formData.weight,
                dateAdopted: formData.dateAdopted,
                additionalNotes: formData.additionalNotes,
                vaccinations: formData.vaccinations,
            };

            // Send a PUT request to update the pet profile
            await axios.put(`http://localhost:9000/pets/${petId}`, updatedData);
            alert('Pet profile updated successfully.');
        } catch (error) {
            console.error('Error updating pet profile:', error);
            alert('Failed to update pet profile.');
        }
    };

    // Function to handle vaccination changes
    const handleVaccinationChange = (index, field, value) => {
        const updatedVaccinations = [...formData.vaccinations];
        updatedVaccinations[index][field] = value;
        setFormData({ ...formData, vaccinations: updatedVaccinations });
    };

    // Function to add a new vaccination entry
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

    // Function to remove a vaccination entry
    const removeVaccination = (index) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this vaccination?");
        if (isConfirmed) {
            const updatedVaccinations = [...formData.vaccinations];
            updatedVaccinations.splice(index, 1);
            setFormData({ ...formData, vaccinations: updatedVaccinations });
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="editPetProfileContainer">
            <h2>Edit Pet Profile</h2>
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

                {/* Age inputs */}
                <div className="ageInputGroup">
                    <label htmlFor="ageValue" className="editPetProfileLabel">Age:</label>
                    <input
                        type="number"
                        id="ageValue"
                        name="ageValue"
                        value={formData.ageValue}
                        onChange={handleChange}
                        className="editPetProfileInput"
                    />
                    <select
                        id="ageUnit"
                        name="ageUnit"
                        value={formData.ageUnit}
                        onChange={handleChange}
                        className="editPetProfileSelect"
                    >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                        <option value="days">Days</option>
                    </select>
                </div>

                {/* Display error message for invalid age */}
                {ageError && (
                    <div className="ageError">
                        {ageError}
                    </div>
                )}

                <label htmlFor="gender" className="editPetProfileLabel">Gender:</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="editPetProfileSelect"
                >
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

                        {/* Button to remove the vaccination entry */}
                        <button
                            type="button"
                            onClick={() => removeVaccination(index)}
                            className="removeVaccinationButton"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                {/* Button to add a new vaccination entry */}
                <button
                    type="button"
                    onClick={addVaccination}
                    className="addVaccinationButton"
                >
                    Add Vaccination
                </button>

                {/* Submit button */}
                <button type="submit" className="editPetProfileSubmitButton">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default EditPetProfile;
