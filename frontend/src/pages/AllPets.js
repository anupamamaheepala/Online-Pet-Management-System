import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SystemAdminHeader from '../components/SystemAdminHeader';
import Footer from '../components/Footer';
import '../css/allpets.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('petName');
  const [selectedColumns, setSelectedColumns] = useState({
    petName: true,
    species: true,
    breed: true,
    ownerName: true,
    ownerEmail: true,
    gender: true,
    age: true,
    weight: true,
    dateAdopted: true,
    additionalNotes: true,
    givenVaccineTypes: true,
    givenVaccineDates: true,
    toBeGivenVaccineTypes: true,
    toBeGivenVaccineDates: true,
    profilePhoto: true, 
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:9000/pets/all-pets');
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  const handleUpdate = (petId) => {
    navigate(`/pets/${petId}/edit`);
  };

  const handleDelete = async (petId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this pet?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:9000/pets/${petId}`);
        setPets(pets.filter((pet) => pet._id !== petId));
        alert('Pet deleted successfully');
      } catch (error) {
        console.error('Error deleting pet:', error);
        alert('Failed to delete pet');
      }
    }
  };


  // Function to filter pets based on search term and filter type
const filteredPets = pets.filter((pet) => {
  const searchString = searchTerm.toLowerCase();

  switch (filterType) {
    case 'petName':
      return pet.petName.toLowerCase().includes(searchString);
    case 'species':
      return pet.species.toLowerCase().includes(searchString);
    case 'breed':
      return pet.breed.toLowerCase().includes(searchString);
    case 'ownerName':
      return pet.owner.name.toLowerCase().includes(searchString);
    case 'ownerEmail':
      return pet.owner.email.toLowerCase().includes(searchString);
    case 'gender':
      return pet.gender.toLowerCase().includes(searchString);
    
    case 'givenVaccineTypes':
      // Check if any given vaccine type matches the search term
      return pet.vaccinations.some((vaccine) => vaccine.vaccineType.toLowerCase().includes(searchString));
    case 'givenVaccineDates':
      // Check if any given vaccine date matches the search term
      return pet.vaccinations.some((vaccine) =>
        new Date(vaccine.dateAdministered).toLocaleDateString().includes(searchString)
      );
    case 'toBeGivenVaccineTypes':
      // Check if any to be given vaccine type matches the search term
      return pet.toBeGivenVaccines.some((vaccine) => vaccine.vaccineType.toLowerCase().includes(searchString));
    case 'toBeGivenVaccineDates':
      // Check if any to be given vaccine date matches the search term
      return pet.toBeGivenVaccines.some((vaccine) =>
        new Date(vaccine.dateToBeGiven).toLocaleDateString().includes(searchString)
      );
    case 'weight':
      // Check if the weight matches the search term
      return pet.weight ? pet.weight.toString().includes(searchString) : false;
    default:
      return true;
  }
});
{filteredPets.map((pet, index) => (
  <tr key={pet._id}>
    {Object.keys(selectedColumns).map((key) =>
      selectedColumns[key] ? (
        <td key={key}>
          {key === 'ownerName' && pet.owner ? pet.owner.name : ''}
        </td>
      ) : null
    )}
  </tr>
))}



const downloadPDFReport = () => {
  const doc = new jsPDF('landscape');
  
  // Path to your site logo
  const logoURL = '/images/logo.png';
  
  // Add the logo to the PDF
  doc.addImage(logoURL, 'PNG', 20, 10, 30, 30); // Adjust position and size as needed
  
  // Add a title to the PDF
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0); // Set text color to black
  doc.text('Pet Report', 140, 30);

  // Generate the table
  const headers = [];
  const rows = [];

  Object.keys(selectedColumns).forEach((key) => {
    if (selectedColumns[key]) {
      headers.push(key === 'vaccineDate' ? 'Vaccine Date' : key.charAt(0).toUpperCase() + key.slice(1));
    }
  });

  filteredPets.forEach((pet, index) => {
    const row = [];
    Object.keys(selectedColumns).forEach((key) => {
      if (selectedColumns[key]) {
        if (key === 'givenVaccineTypes') {
          row.push(
            pet.vaccinations
              .filter((vaccine) => new Date(vaccine.dateAdministered) <= new Date())
              .map((vaccine) => vaccine.vaccineType)
              .join(', ')
          );
        } else if (key === 'givenVaccineDates') {
          row.push(
            pet.vaccinations
              .filter((vaccine) => new Date(vaccine.dateAdministered) <= new Date())
              .map((vaccine) => new Date(vaccine.dateAdministered).toLocaleDateString())
              .join(', ')
          );
        } else if (key === 'toBeGivenVaccineTypes') {
          row.push(
            pet.vaccinations
              .filter((vaccine) => new Date(vaccine.dateAdministered) > new Date())
              .map((vaccine) => vaccine.vaccineType)
              .join(', ')
          );
        } else if (key === 'toBeGivenVaccineDates') {
          row.push(
            pet.vaccinations
              .filter((vaccine) => new Date(vaccine.dateAdministered) > new Date())
              .map((vaccine) => new Date(vaccine.dateAdministered).toLocaleDateString())
              .join(', ')
          );
        } else if (key === 'ownerName') {
          row.push(pet.owner.name);
        } else if (key === 'ownerEmail') {
          row.push(pet.owner.email);
        } else if (key === 'age') {
          row.push(pet.age ? `${pet.age.value ?? 'Unknown'} ${pet.age.unit ?? ''}` : 'Unknown');
        } else if (key === 'weight') {
          row.push(pet.weight ? `${pet.weight} kg` : 'Unknown');
        } else if (key === 'dateAdopted') {
          row.push(pet.dateAdopted ? new Date(pet.dateAdopted).toLocaleDateString() : 'N/A');
        } else if (key === 'additionalNotes') {
          row.push(pet.additionalNotes ? pet.additionalNotes : 'N/A');
        } else if (key === 'profilePhoto') {
          row.push(pet.profilePhoto); // Push profile photo URL
        } else {
          row.push(pet[key]);
        }
      }
    });
    rows.push(row);
  });

  // Set font size and style for the table
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal'); 

  // Calculate column widths
  const columnWidths = headers.map(() => 'auto');

  // Add the table to the PDF
  doc.autoTable({
    startY: 50, 
    head: [headers],
    body: rows,
    styles: {
      fontSize: 10,
      cellPadding: 3,
      lineWidth: 0.1,
      lineColor: [0, 0, 0]
    },
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      lineColor: [255, 255, 255]
      
    },
    
    margin: { top: 45 }, // Adjust the margin to accommodate the table header
    columnWidth: columnWidths,
    didDrawCell: (data) => {
      // Draw lines between cells
      const { row, column } = data;
      if (row && column !== null) {
        doc.setDrawColor(0);
        doc.setLineWidth(0.1);
        doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height); // Vertical line
        doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Horizontal line
      }
    },
  });

  // Save the PDF
  doc.save('pets_report.pdf');
};



  const handleCheckboxChange = (e) => {
    setSelectedColumns({
      ...selectedColumns,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <>
      <SystemAdminHeader />
      <div className='all-pets-container'>
        <h1 className='page-title'>All Pets</h1>

        <div className='pets-search-container'>
  <input
    type='text'
    placeholder='Search...'
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className='search-input'
  />
  <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className='pets-filter-select'>
    <option value='petName'>Pet Name</option>
    <option value='species'>Species</option>
    <option value='breed'>Breed</option>
    <option value='ownerName'>Owner Name</option>
    <option value='ownerEmail'>Owner Email</option>
    <option value='gender'>Gender</option>
    <option value='weight'>Weight</option>
    <option value='givenVaccineTypes'>Given Vaccine Type</option>
    <option value='givenVaccineDates'>Given Vaccine Date</option>
    <option value='toBeGivenVaccineTypes'>To Be Given Vaccine Type</option>
    <option value='toBeGivenVaccineDates'>To Be Given Vaccine Date</option>
    
  </select>
</div>


        <div className='pets-select-columns-container'>
          <h3 className='sch3'>Select Columns:</h3>
          {Object.keys(selectedColumns).map((column) => (
            <div key={column} className='pets-column-checkbox'>
              <label>
                <input
                  type='checkbox'
                  name={column}
                  checked={selectedColumns[column]}
                  onChange={handleCheckboxChange}
                  className='pets-column-checkbox-input'
                />
                {column === 'vaccineDate'
                  ? 'Vaccine Date'
                  : column === 'profilePhoto'
                  ? 'Profile Photo'
                  : column.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
            </div>
          ))}
        </div>

        <button onClick={downloadPDFReport} className='pets-download-btn'>
          Download PDF Report
        </button>

        <table className='pets-table'>
          <thead>
            <tr>
              {Object.keys(selectedColumns).map(
                (key) => selectedColumns[key] && <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              )}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet, index) => (
              <tr key={pet._id}>
                {Object.keys(selectedColumns).map((key) =>
                  selectedColumns[key] ? (
                    <td key={key}>
                      {key === 'givenVaccineTypes'
                        ? pet.vaccinations
                            .filter((vaccine) => new Date(vaccine.dateAdministered) <= new Date())
                            .map((vaccine) => vaccine.vaccineType)
                            .join(', ')
                        : key === 'givenVaccineDates'
                        ? pet.vaccinations
                            .filter((vaccine) => new Date(vaccine.dateAdministered) <= new Date())
                            .map((vaccine) => new Date(vaccine.dateAdministered).toLocaleDateString())
                            .join(', ')
                        : key === 'toBeGivenVaccineTypes'
                        ? pet.vaccinations
                            .filter((vaccine) => new Date(vaccine.dateAdministered) > new Date())
                            .map((vaccine) => vaccine.vaccineType)
                            .join(', ')
                        : key === 'toBeGivenVaccineDates'
                        ? pet.vaccinations
                            .filter((vaccine) => new Date(vaccine.dateAdministered) > new Date())
                            .map((vaccine) => new Date(vaccine.dateAdministered).toLocaleDateString())
                            .join(', ')
                        : key === 'ownerName'
                        ? pet.owner.name
                        : key === 'ownerEmail'
                        ? pet.owner.email
                        : key === 'age'
                        ? pet.age ? `${pet.age.value ?? 'Unknown'} ${pet.age.unit ?? ''}` : 'Unknown'
                        : key === 'weight'
                        ? pet.weight ? `${pet.weight} kg` : 'Unknown'
                        : key === 'dateAdopted'
                        ? pet.dateAdopted ? new Date(pet.dateAdopted).toLocaleDateString() : 'N/A'
                        : key === 'additionalNotes'
                        ? pet.additionalNotes ? pet.additionalNotes : 'N/A'
                        : key === 'profilePhoto'
                        
                        ? <img src={pet.profilePhoto} alt={`${pet.petName}'s profile`} style={{ width: '100px', height: '100px' }} />

                        : pet[key]}
                    </td>
                  ) : null
                )}
                <td className='actions-btns'>
                  <button className='pets-update-btn' onClick={() => handleUpdate(pet._id)}>
                    Update
                  </button>
                  <button className='pets-delete-btn' onClick={() => handleDelete(pet._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default AllPets;
