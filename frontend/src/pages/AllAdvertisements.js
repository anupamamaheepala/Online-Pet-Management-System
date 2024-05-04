import React, { useState, useEffect } from 'react';
import AdsHeader from '../components/ads components/AdsHeader';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../css/advertisement.css';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import EditAdvertisement from './EditAdvertisement';

const AllAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [confirmedads, setConfirmedAds] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editAdvertisementId, setEditAdvertisementId] = useState(null);
  const [editingAdvertisement, setEditingAdvertisement] = useState(null);
  const [advertisementid, setAdvertisementId] = useState(null);
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    pet_type: '',
    Breed: '',
    purpose: '',
    description: '',
    contact: '',
    filePath: null
  });

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

  // Function to calculate the duration in days and hours
  const calculateDuration = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInMs = now - createdDate;
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days} days, ${hours} hours`;
  };

  const handleEdit = (id) => {
    Swal.fire({
      title: 'Edit Advertisement',
      text: 'Do you want to edit this advertisement?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setEditAdvertisementId(id);
      }
    });
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
        advertisement.pet_type,
        advertisement.Breed,
        advertisement.purpose,
        advertisement.description
      ]);

      doc.setFontSize(18);
      doc.text('Published advertisements', 70, yPosition + logoWidth -15);
      doc.setFontSize(15);
      doc.autoTable({
        startY: yPosition + logoWidth + 10,
        head: [['Owner Name', 'Owner Email', 'Pet Type', 'Breed', 'Purpose', 'Description']],
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
      <AdsHeader />
      <div  style={{ textAlign: 'right' }}>
        <Link to="/ConfirmAdvertisement" className="ma_add_button">Pending advertisements</Link>
        <button className="ma_add_button"  onClick={generatePdf}>
          Download all published advertisements report
        </button>
      </div>
      <h1 className="ma_text_container"><center>All Advertisement</center></h1>
      <div className="ma_table-container_center">
      <table className="ma_advertisement-table">
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Email</th>
            <th>pet type</th>
            <th>Breed</th>
            <th>Purpose</th>
            <th>Description</th>
            <th>Pet's image</th>
            <th>Contact</th>
            <th>Duration</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {advertisements.map(advertisement => (
            <tr key={advertisement._id}>
              <td>{advertisement.ownerName}</td>
              <td>{advertisement.email}</td>
              <td>{advertisement.pet_type}</td>
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
              <td>{calculateDuration(advertisement.createdAt)}</td>
              <td>
                <div className="ma_button-container">
                  <Link to={`/EditAdvertisement/${advertisement._id}`}>
                    <button className="btn btn-warning" onClick={() => handleEdit(advertisement._id)}>Edit</button>
                  </Link>
                  &nbsp;
                  <button className="btn btn-danger" onClick={() => handleDelete(advertisement._id)}>Delete</button>
                </div>
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

export default AllAdvertisements;
