import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../css/petprofile.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import jsPDF from 'jspdf';


const PetProfile = () => {
  const { petId } = useParams();
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/pets/${petId}`);
        setPetData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    fetchPetData();
  }, [petId]);

  
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pet profile?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:9000/pets/${petId}`);
        const customerId = response.data.customerId; // Extract customerId from the response
  
        alert("Deletion successful");
        // Navigate to MyPets page of the relevant customer after deletion
        window.location.href = `/my-pets/${customerId}`;
      } catch (error) {
        console.error("Error deleting pet profile:", error);
        alert("Error deleting pet profile");
      }
    } else {
      alert("Deletion cancelled");
    }
  };  
  

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePhoto', file);
  
    try {
      const res = await axios.put(`http://localhost:9000/pets/profile-photo/${petId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setPetData({ ...petData, profilePhoto: res.data.profilePhoto });
      alert('Profile photo uploaded successfully');
    } catch (error) {
      console.error('Failed to upload profile photo:', error);
      alert('Failed to upload profile photo');
    }
  };

  const handleDeleteProfilePhoto = async () => {
    const confirmed = window.confirm('Are you sure you want to delete the profile photo?');
  
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:9000/pets/profile-photo/${petId}`);
  
        setPetData({ ...petData, profilePhoto: '' });
        alert('Profile photo deleted successfully');

       
      } catch (error) {
        console.error('Failed to delete profile photo:', error);
        alert('Failed to delete profile photo');
      }
    } else {
      alert('Deletion cancelled.');
    }
  };
   const generatePDF = () => {
    const doc = new jsPDF();
    
    const logoURL = '/images/logo.png';
    
    // Add logo
    doc.addImage(logoURL, 'PNG', 20, 10, 30, 30);
    
  // Title - Pet Report
  const reportText = 'Pet Report';
  const textWidth = doc.getStringUnitWidth(reportText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const xCoordinate = (doc.internal.pageSize.getWidth() - textWidth) / 2;
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0); 
  doc.setFont('helvetica', 'bold'); 
  doc.text(reportText, xCoordinate, 40); 
  doc.setFont('helvetica', 'normal'); 
    
  // Pet profile details
  doc.setFontSize(18);
 
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold'); 
  doc.text(20, 70, 'Name: ');
  doc.setFont('helvetica', 'normal'); 
  doc.text(35, 70, petData.petName);
  doc.setFont('helvetica', 'bold'); 
  doc.text(20, 80, 'Species: ');
  doc.setFont('helvetica', 'normal'); 
  doc.text(38, 80, petData.species);
  doc.setFont('helvetica', 'bold'); 
  doc.text(20, 90, 'Breed: ');
  doc.setFont('helvetica', 'normal'); 
  doc.text(35, 90, petData.breed);
  doc.setFont('helvetica', 'bold'); 
  doc.text(20, 100, 'Age: ');
  doc.setFont('helvetica', 'normal'); 
  doc.text(33, 100, petData.age ? `${petData.age.value} ${petData.age.unit}` : 'N/A');
  doc.setFont('helvetica', 'bold'); 
  doc.text(20, 110, 'Gender: ');
  doc.setFont('helvetica', 'normal'); 
  doc.text(38, 110, petData.gender);
  doc.setFont('helvetica', 'bold'); 
  doc.text(20, 120, 'Weight: ');
  doc.setFont('helvetica', 'normal'); 
  doc.text(36, 120, `${petData.weight}kg`);
  doc.setFont('helvetica', 'bold'); 
  doc.text(20, 130, 'Date Adopted: ');
  doc.setFont('helvetica', 'normal'); 
  doc.text(50, 130, petData.dateAdopted ? new Date(petData.dateAdopted).toLocaleDateString() : 'N/A');
  doc.setFont('helvetica', 'bold'); 
  doc.text(20, 140, 'Additional Notes: ');
  doc.setFont('helvetica', 'normal'); 
  doc.text(55, 140, petData.additionalNotes);

    // Vaccination details
    const vaccinationStartY = 70; 
    const lineHeight = 10; 
    const vaccinesStartX = 130; 
    
    
    doc.setFont('helvetica', 'bold');
    doc.text(130, vaccinationStartY, 'Vaccination Details:');
    doc.setFont('helvetica', 'normal'); 
    
  
    doc.setFont('helvetica', 'bold');
    doc.text(130, vaccinationStartY + lineHeight, 'Given Vaccines:');
    doc.setFont('helvetica', 'normal'); 
    givenVaccines.forEach((vaccination, index) => {
        const y = vaccinationStartY + (index + 2) * lineHeight;
        doc.text(vaccinesStartX, y, `${vaccination.vaccineType} - ${new Date(vaccination.dateAdministered).toLocaleDateString()}`);
    });
  
    doc.setFont('helvetica', 'bold');
    doc.text(130, vaccinationStartY + (givenVaccines.length + 3) * lineHeight, 'Upcoming Vaccines:');
    doc.setFont('helvetica', 'normal'); 
    upcomingVaccines.forEach((vaccination, index) => {
        const y = vaccinationStartY + (givenVaccines.length + index + 4) * lineHeight;
        doc.text(vaccinesStartX, y, `${vaccination.vaccineType} - ${new Date(vaccination.dateAdministered).toLocaleDateString()}`);
    });
    
    // Save the PDF
    doc.save('pet_profile.pdf');
  };
  
  

  if (loading) {
    return <p>Loading...</p>;
  }

  // Divide vaccinations into given and upcoming
  const currentDate = new Date();
  const givenVaccines = [];
  const upcomingVaccines = [];

  petData.vaccinations.forEach(vaccine => {
    const vaccineDate = new Date(vaccine.dateAdministered);
    if (vaccineDate <= currentDate) {
      givenVaccines.push(vaccine);
    } else {
      upcomingVaccines.push(vaccine);
    }
  });

  return (
    <>
    <Header />
    <div className="pet-profile-container">
      <h2 className="pet-profile-heading">Pet Profile</h2>
      <div>
        <div className="pet-pro">
        <div className="pet-pro-con">
        <div className="pet-profile-photo-wrapper">
          <img src={petData.profilePhoto} alt="Profile" className="pet-profile-photo" />
        </div>
        <div className="profile-photo-input-wrapper">
          <input type="file" onChange={onFileChange} className="profile-photo-input" />
          <button onClick={handleDeleteProfilePhoto} className="delete-photo-button">Delete Photo</button>
          
        </div>
        </div>
        <div className="pet-pro-info">
        <h3 className="petname">{petData.petName}</h3>
        <p className="pet-profile-info"><b>Species:</b> {petData.species}</p>
        <p className="pet-profile-info"><b>Breed:</b> {petData.breed}</p>
        <p className="pet-profile-info"><b>Age:</b> {petData.age ? `${petData.age.value} ${petData.age.unit}` : 'N/A'}</p>
        <p className="pet-profile-info"><b>Gender:</b> {petData.gender}</p>
        <p className="pet-profile-info"><b>Weight(In Kg):</b> {petData.weight}kg</p>
        <p className="pet-profile-info"><b>Date Adopted:</b> {petData.dateAdopted ? new Date(petData.dateAdopted).toLocaleDateString() : 'N/A'}</p>
        <p className="pet-profile-info"><b>Additional Notes:</b> {petData.additionalNotes}</p>
        
        <div className="pet-profile-vaccine-section">
          <p className="pet-profile-info"><b>Given Vaccines:</b></p>
          <ul>
            {givenVaccines.map((vaccination, index) => (
              <li key={index} className="pet-profile-info">
                {vaccination.vaccineType} - {new Date(vaccination.dateAdministered).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        <div className="pet-profile-vaccine-section">
          <p className="pet-profile-info"><b>Upcoming Vaccines:</b></p>
          <ul>
            {upcomingVaccines.map((vaccination, index) => (
              <li key={index} className="pet-profile-info">
                {vaccination.vaccineType} - {new Date(vaccination.dateAdministered).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
        </div>
        </div>
        <center>
        <div className="pet-profile-button-wrapper">   
        <Link to={`/pets/${petId}/edit`} className="pet-profile-button">Edit Profile</Link>
        &nbsp;
        &nbsp;
        <button className="delete-profile-button" onClick={handleDelete}>Delete Profile</button>      

        </div> </center>
        <div><button className="pet-download-pdf-button" onClick={generatePDF}>Download PDF</button></div>
      </div>
    </div>
    <Footer />
    <button onClick={() => window.print()}>Download PDF</button>
    </>
  );
};

export default PetProfile;

