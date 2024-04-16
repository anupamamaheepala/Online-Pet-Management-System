import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/allpets.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('petName'); // Default filter type
  const [selectedColumns, setSelectedColumns] = useState([]);

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

  const handleColumnSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedColumns([...selectedColumns, value]);
    } else {
      setSelectedColumns(selectedColumns.filter((column) => column !== value));
    }
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
      case 'vaccinations':
        // Check each vaccine type for a match
        return pet.vaccinations.some((vaccine) => vaccine.vaccineType.toLowerCase().includes(searchString));
      case 'vaccineDate':
        // Check each vaccine date for a match (use the `toLocaleDateString` method to compare)
        return pet.vaccinations.some((vaccine) =>
          new Date(vaccine.dateAdministered).toLocaleDateString().includes(searchString)
        );
      default:
        return true;
    }
  });

  // Function to download PDF report of the filtered pets
  const downloadPDFReport = () => {
    const doc = new jsPDF();

    // Add title to the PDF document
    doc.setFontSize(18);
    doc.text('Pets Report', 14, 22);

    // Define columns and data for the PDF table
    const columns = selectedColumns.map((column) => {
      if (column === 'givenVaccineTypes') {
        return { title: 'Given Vaccine Types', dataKey: 'givenVaccineTypes' };
      } else if (column === 'givenVaccineDates') {
        return { title: 'Given Vaccine Dates', dataKey: 'givenVaccineDates' };
      } else if (column === 'toBeGivenVaccineTypes') {
        return { title: 'To Be Given Vaccine Types', dataKey: 'toBeGivenVaccineTypes' };
      } else if (column === 'toBeGivenVaccineDates') {
        return { title: 'To Be Given Vaccine Dates', dataKey: 'toBeGivenVaccineDates' };
      } else {
        return {
          title: column === 'dateAdopted' ? 'Date Adopted' : column.charAt(0).toUpperCase() + column.slice(1),
          dataKey: column,
        };
      }
    });

    const data = filteredPets.map((pet) => {
      const rowData = {};
      columns.forEach((column) => {
        if (column.dataKey === 'givenVaccineTypes') {
          rowData['givenVaccineTypes'] = pet.vaccinations
            .filter((vaccine) => new Date(vaccine.dateAdministered) <= new Date())
            .map((vaccine) => vaccine.vaccineType)
            .join(', ');
        } else if (column.dataKey === 'givenVaccineDates') {
          rowData['givenVaccineDates'] = pet.vaccinations
            .filter((vaccine) => new Date(vaccine.dateAdministered) <= new Date())
            .map((vaccine) => new Date(vaccine.dateAdministered).toLocaleDateString())
            .join(', ');
        } else if (column.dataKey === 'toBeGivenVaccineTypes') {
          rowData['toBeGivenVaccineTypes'] = pet.vaccinations
            .filter((vaccine) => new Date(vaccine.dateAdministered) > new Date())
            .map((vaccine) => vaccine.vaccineType)
            .join(', ');
        } else if (column.dataKey === 'toBeGivenVaccineDates') {
          rowData['toBeGivenVaccineDates'] = pet.vaccinations
            .filter((vaccine) => new Date(vaccine.dateAdministered) > new Date())
            .map((vaccine) => new Date(vaccine.dateAdministered).toLocaleDateString())
            .join(', ');
        } else if (column.dataKey === 'ownerName') {
          rowData[column.dataKey] = pet.owner.name; // Access owner's name
        } else if (column.dataKey === 'ownerEmail') {
          rowData[column.dataKey] = pet.owner.email; // Access owner's email
        } else if (column.dataKey === 'age') {
          rowData[column.dataKey] = pet.age ? `${pet.age.value ?? 'Unknown'} ${pet.age.unit ?? ''}` : 'Unknown'; // Format age
        } else if (column.dataKey === 'weight') {
          rowData[column.dataKey] = pet.weight ? `${pet.weight} kg` : 'Unknown'; // Format weight
        } else if (column.dataKey === 'dateAdopted') {
          rowData[column.dataKey] = pet.dateAdopted ? new Date(pet.dateAdopted).toLocaleDateString() : 'N/A'; // Format dateAdopted
        } else if (column.dataKey === 'additionalNotes') {
          rowData[column.dataKey] = pet.additionalNotes ? pet.additionalNotes : 'N/A'; // Additional notes
        } else {
          rowData[column.dataKey] = pet[column.dataKey];
        }
      });
      return rowData;
    });

    // Create the table
    doc.autoTable({
      startY: 28,
      head: [columns.map((column) => column.title)], // Extract titles from columns
      body: data.map((row) => Object.values(row)), // Extract values from data
    });

    // Save the PDF
    doc.save('pets_report.pdf');
  };

  return (
    <>
      <Header />
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
            <option value='vaccinations'>Vaccine Type</option>
            <option value='vaccineDate'>Vaccine Date</option>
          </select>
        </div>

        {/* Select Columns */}
        <div className='pets-select-columns-container'>
          <h3>Select Columns:</h3>
          {[
            'petName',
            'species',
            'breed',
            'ownerName',
            'ownerEmail',
            'gender',
            'age',
            'weight',
            'dateAdopted',
            'additionalNotes',
            'givenVaccineTypes',
            'givenVaccineDates',
            'toBeGivenVaccineTypes',
            'toBeGivenVaccineDates',
          ].map((column) => (
            <div key={column} className='pets-column-checkbox'>
              <label>
                <input
                  type='checkbox'
                  value={column}
                  checked={selectedColumns.includes(column)}
                  onChange={handleColumnSelection}
                  className='pets-column-checkbox-input'
                />
                {column === 'vaccineDate'
                  ? 'Vaccine Date'
                  : column.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
            </div>
          ))}
        </div>

        {/* Button to download PDF report */}
        <button onClick={downloadPDFReport} className='pets-download-btn'>
          Download PDF Report
        </button>

        {/* Pets table */}
        <table className='pets-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Pet Name</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Weight (In Kg)</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Date Adopted</th>
              <th>Additional Notes</th>
              <th>Given Vaccinations</th>
              <th>To Give Vaccinations</th>
              <th>Profile Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet, index) => (
              <tr key={pet._id}>
                <td>{index + 1}</td>
                <td>{pet.petName}</td>
                <td>{pet.species}</td>
                <td>{pet.breed}</td>
                <td>{pet.age ? `${pet.age.value ?? 'Unknown'} ${pet.age.unit ?? ''}` : 'Unknown'}</td>
                <td>{pet.gender}</td>
                <td>{pet.weight}kg</td>
                <td>{pet.owner.name}</td>
                <td>{pet.owner.email}</td>
                <td>{pet.dateAdopted ? new Date(pet.dateAdopted).toLocaleDateString() : 'N/A'}</td>
                <td>{pet.additionalNotes}</td>
                <td>
                  {/* Render given vaccinations */}
                  {pet.vaccinations
                    .filter((vaccine) => new Date(vaccine.dateAdministered) <= new Date())
                    .map((vaccine, index) => (
                      <div key={index}>
                        <strong>{vaccine.vaccineType}:</strong> {new Date(vaccine.dateAdministered).toLocaleDateString()}
                      </div>
                    ))}
                </td>
                <td>
                  {/* Render to give vaccinations */}
                  {pet.vaccinations
                    .filter((vaccine) => new Date(vaccine.dateAdministered) > new Date())
                    .map((vaccine, index) => (
                      <div key={index}>
                        <strong>{vaccine.vaccineType}:</strong> {new Date(vaccine.dateAdministered).toLocaleDateString()}
                      </div>
                    ))}
                </td>
                <td>
                  <img
                    src={pet.profilePhoto}
                    alt={`${pet.petName}'s profile`}
                    style={{ width: '100px', height: '100px' }}
                    className='pets-profile-photo'
                  />
                </td>
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
