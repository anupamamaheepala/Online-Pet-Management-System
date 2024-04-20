import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../css/advertisement.css';

const AllAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [confirmedads, setConfirmedAds] = useState([]);

  useEffect(() => {
    getAllConfirmedAdvertisements();
  }, []);

  const getAllConfirmedAdvertisements = async () => {
    try {
      const res = await axios.get('http://localhost:9000/confirmedads/confirmedads');
      setAdvertisements(res.data);
      setConfirmedAds(res.data); // Update confirmedads with fetched data
    } catch (error) {
      console.error('Error fetching advertisements:', error);
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = '/images/logo.png';

    logo.onload = function () {
      const logoWidth = 30;
      const xPosition = 10;
      const yPosition = 10;

      doc.addImage(logo, 'PNG', xPosition, yPosition, logoWidth, logoWidth);

      const tableData = confirmedads.map((advertisement) => [
        advertisement.ownerName,
        advertisement.email,
        advertisement.title,
        advertisement.Breed,
        advertisement.purpose,
        advertisement.description
      ]);

      doc.setFontSize(18);
      doc.text('Published advertisements', 70, yPosition + logoWidth -15);
      doc.setFontSize(15);
      doc.autoTable({
        startY: yPosition + logoWidth + 10,
        head: [['Owner Name', 'Owner Email', 'Title', 'Breed', 'Purpose', 'Description']],
        body: tableData,
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
          
        },
      });
      doc.save('published_ads.pdf');
    };
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Advertisement?')) {
      try {
        await axios.delete(`http://localhost:9000/confirmedads/confirmedads/${id}`);
        setAdvertisements(prevAds => prevAds.filter(advertisement => advertisement._id !== id));
        alert('Advertisement deleted successfully');
      } catch (error) {
        console.log(error);
        alert('Failed to delete Advertisement');
      }
    } else {
      alert('Deletion cancelled.');
    }
  };

  return (
    <>
      <Header />
      <div  style={{ textAlign: 'right' }}>
        <button onClick={generatePdf}>
          Generate all published advertisements report
        </button>
      </div>
      <table className="ma_advertisement-table">
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Email</th>
            <th>Title</th>
            <th>Breed</th>
            <th>Purpose</th>
            <th>Description</th>
            <th>Pet's image</th>
            <th>Contact</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {advertisements.map(advertisement => (
            <tr key={advertisement._id}>
              <td>{advertisement.ownerName}</td>
              <td>{advertisement.email}</td>
              <td>{advertisement.title}</td>
              <td>{advertisement.Breed}</td>
              <td>{advertisement.purpose}</td>
              <td>{advertisement.description}</td>
              <td>
                <img
                  src={`http://localhost:9000/${advertisement.filePath.replace(/\\/g, '/')}`}
                  alt="Pet"
                  style={{ width: '130px', height: '130px', cursor: 'pointer' }}
                />
              </td>
              <td>{advertisement.contact}</td>
              <td>
                <div className="ma_button-container">
                  <button>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(advertisement._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </>
  );
};

export default AllAdvertisements;
