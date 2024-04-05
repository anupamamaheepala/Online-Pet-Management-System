import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/ptrainingdetails.css'; // Ensure correct path to your CSS file

const PrivateTrainingDetails = () => {
  const [training, setTraining] = useState(null);
  const [instructor, setInstructor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [modalImageUrl, setModalImageUrl] = useState(''); // State to store modal image URL
  const { id } = useParams();

  useEffect(() => {
    const fetchTrainingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/training/${id}`);
        setTraining(response.data);
        setInstructor(response.data.instructor || '');
      } catch (error) {
        console.error('Error fetching training details:', error);
      }
    };

    fetchTrainingDetails();
  }, [id]);

  const handleUpdateInstructor = async () => {
    try {
      await axios.put(`http://localhost:9000/training/updateInstructor/${id}`, { instructor });
      // Optionally, provide feedback to the user
      console.log('Instructor updated successfully');
    } catch (error) {
      console.error('Error updating instructor:', error);
    }
  };

  const handleApproveTraining = async () => {
    try {
      await axios.put(`http://localhost:9000/training/status/${id}`, { status: 'approved' });
      // Update the training status locally
      setTraining(prevTraining => ({
        ...prevTraining,
        status: 'approved'
      }));
      // Optionally, provide feedback to the user
      console.log('Training approved successfully');
    } catch (error) {
      console.error('Error approving training:', error);
    }
  };
  const handleOpenModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };


  if (!training) {
    return <div>Loading...</div>;
  }

  return (
    <div className="alo2">
      <h2>Private Training Details</h2>
      <div>
        <p><strong>Owner's Name:</strong> {training.ownerName}</p>
        <p><strong>Address:</strong> {training.address}</p>
        <p><strong>Contact Number:</strong> {training.contact}</p>
        <p><strong>Dog's Name:</strong> {training.dogName}</p>
        <p><strong>Breed:</strong> {training.breed}</p>
        <p><strong>Age:</strong> {training.age}</p>
        {training.filePath && (
  <div>
    <h3>Other Details</h3>
    {/* Check file extension to determine the type */}
    {training.filePath.endsWith('.pdf') ? (
      <embed src={`http://localhost:9000/${training.filePath}`} type="application/pdf" width="600" height="400" />
    ) : (
      <div>
        <img
          src={`http://localhost:9000/${training.filePath}`}
          alt="Uploaded File"
          onClick={() => handleOpenModal(`http://localhost:9000/${training.filePath}`)}
          style={{ cursor: 'pointer' }}
        />
        {/* Add modal */}
        {isModalOpen && (
          <div className="modal">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <img src={modalImageUrl} alt="Full Image" />
          </div>
        )}
      </div>
    )}
  </div>
)}
      </div>
      <div>
        <h3>Update Instructor</h3>
        <input
          type="text"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          placeholder="Enter new instructor's name"
          id='instructor'
        />
        <button onClick={handleUpdateInstructor}>Update Instructor</button>
      </div>
      <div>
        <h3>Actions</h3>
        <button onClick={handleApproveTraining}>Approve Training</button>
      </div>
    </div>
  );
};

export default PrivateTrainingDetails;
