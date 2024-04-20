import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../css/advertisement.css';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const AllAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingAdvertisement, setEditingAdvertisement] = useState(null);
  const [confirmedads, setAds] = useState([]);
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    title: '',
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
    } catch (error) {
      console.error('Error fetching advertisements:', error);
    }
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

  const handleImageClick = (imageURL) => {
    setSelectedImage(imageURL);
  };

  const handleEdit = (advertisement) => {
    setEditingAdvertisement(advertisement);
    setFormData({
      ownerName: advertisement.ownerName,
      email: advertisement.email,
      title: advertisement.title,
      Breed: advertisement.Breed,
      purpose: advertisement.purpose,
      description: advertisement.description,
      contact: advertisement.contact,
      filePath: advertisement.filePath
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, filePath: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await axios.put(`http://localhost:9000/confirmedads/confirmedads/${editingAdvertisement._id}`, formDataToSend);
      alert('Advertisement updated successfully');
      setEditingAdvertisement(null);
      setFormData({
        ownerName: '',
        email: '',
        title: '',
        Breed: '',
        purpose: '',
        description: '',
        contact: '',
        filePath: null
      });
      getAllConfirmedAdvertisements();
    } catch (error) {
      console.error('Error updating advertisement:', error);
      alert('Failed to update advertisement');
    }
  };

  const handleCancel = () => {
    setEditingAdvertisement(null);
    setFormData({
      ownerName: '',
      email: '',
      title: '',
      Breed: '',
      purpose: '',
      description: '',
      contact: '',
      filePath: null
    });
  };
//report
const generatePdf = () => {
    const doc = new jsPDF();
    const tableData = confirmedads.map((advertisement) => [
        advertisement.ownerName,
        advertisement.email,
        advertisement.title,
        advertisement.Breed,
        advertisement.purpose,
        advertisement.description
    ]);

    doc.setFontSize(18);
    doc.text('Published advertisements', 20, 20);
    doc.setFontSize(12);
    doc.autoTable({
      startY: 25,
      head: [['Owner Name', 'Owner Email', 'Title', 'Breed', 'Purpose', 'Description']],
      body: tableData,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [128, 128, 128],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
    });
    doc.save('published_ads.pdf');
  };
//report.

  return (
    <>
      <Header />
      <div className="ma_button-container">
      <button  onClick={generatePdf}>
            Generate Report
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
                  onClick={() => handleImageClick(`http://localhost:9000/${advertisement.filePath.replace(/\\/g, '/')}`)}
                />
              </td>
              <td>{advertisement.contact}</td>
              <td>
                <div className="ma_button-container">
                  <button onClick={() => handleEdit(advertisement)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(advertisement._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingAdvertisement && (
        <div>
          <h2>Update Advertisement</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              placeholder="Owner Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
            />
            <input
              type="text"
              name="Breed"
              value={formData.Breed}
              onChange={handleInputChange}
              placeholder="Breed"
            />
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              placeholder="Purpose"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Contact"
            />
            <input
              type="file"
              name="filePath"
              onChange={handleFileChange}
            />
            <button type="submit">Update</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AllAdvertisements;