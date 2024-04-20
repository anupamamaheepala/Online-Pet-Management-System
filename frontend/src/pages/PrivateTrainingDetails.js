import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import '../css/ptrainingdetails.css'; // Ensure correct path to your CSS file
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivateTrainingDetails = () => {
  const [training, setTraining] = useState(null);
  const [instructor, setInstructor] = useState('');
  const [status, setStatus] = useState('pending');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [modalImageUrl, setModalImageUrl] = useState(''); // State to store modal image URL
  const [instructorName, setInstructorName] = useState(''); 
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchTrainingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/training/${id}`);
        setTraining(response.data);
        setInstructor(response.data.instructor || '');
        setStatus(response.data.status || 'pending');
        
        // Check if instructorName is passed from TrainingDashboard
        if (location.state && location.state.instructorName) {
          setInstructor(response.data.instructorName);
        }
      } catch (error) {
        console.error('Error fetching training details:', error);
      }
    };

    fetchTrainingDetails();
  }, [id, location]);

  const handleUpdateInstructor = async () => {
    try {
      await axios.put(`http://localhost:9000/training/updateInstructor/${id}`, { instructor });
      console.log('Instructor updated successfully');
      // Display alert after successfully adding instructor
      window.alert('Instructor successfully added');
      // Store instructor's name in local storage
      localStorage.setItem('instructorName', instructor);
      // Update the training object in the frontend state
      setTraining(prevTraining => ({
        ...prevTraining,
        instructorName: instructor,
      }));
    } catch (error) {
      console.error('Error updating instructor:', error);
    }
  };
  
  const handleApproveTraining = async () => {
    try {
      // Check if an instructor has been assigned
      if (!instructor) {
        // Display alert message
        window.alert('Cannot approve training without assigning an instructor');
        return;
      }
  
      // Proceed with approving the training if an instructor has been assigned
      await axios.put(`http://localhost:9000/training/approve/${id}`);
      setTraining(prevTraining => ({
        ...prevTraining,
        status: 'approved',
        instructorName: instructor, // Update the instructor's name in the frontend state
      }));
      window.alert('Application approved');
      console.log('Training approved successfully');
    } catch (error) {
      console.error('Error approving training:', error);
    }
  };
  

  const handleRejectTraining = async () => {
    try {
      // Clear the instructor's name from local storage
      localStorage.removeItem('instructor');
      // Clear the instructor's name from state
      setInstructor('');
      // Update the training status to 'rejected'
      await axios.put(`http://localhost:9000/training/reject/${id}`);
      setTraining(prevTraining => ({
        ...prevTraining,
        status: 'rejected'
      }));
      console.log('Training rejected successfully');
      window.alert('Application rejected');
    } catch (error) {
      console.error('Error rejecting training:', error);
    }
  }
  

  const handleOpenModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const renderActionButtons = () => {
    switch (status) {
      case 'pending':
        return (
          <div className="alo5-action-buttons" >
            <button style={{ marginRight: "40px"}} onClick={handleApproveTraining}>Approve Training</button>
            {' '}  {/* Add a space here */}
            <button style={{ backgroundColor: "red"}} onClick={handleRejectTraining}>Reject Training</button>
          </div>
        );
      case 'approved':
        return <p>Training is already approved</p>;
      case 'rejected':
        return <p>Training is already rejected</p>;
      default:
        return null;
    }
  };

  if (!training) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <Header/>
 
    <div className="alo2">
      <h2>Private Training Details</h2>
      <div>
        <p><strong>Owner's Name:</strong> {training.ownerName}</p>
        <p><strong>Address:</strong> {training.address}</p>
        <p><strong>Contact Number:</strong> {training.contact}</p>
        <p><strong>Dog's Name:</strong> {training.dogName}</p>
        <p><strong>Breed:</strong> {training.breed}</p>
        <p><strong>Age:</strong> {training.age}</p>
        <p><strong>Instructor's Name:</strong> {instructor || 'Not Assigned'}</p>
        {training.filePath && (
          <div>
            <h3>Health Checkup File</h3>
            {training.filePath ? (
              <>
                <button onClick={() => handleOpenModal(`http://localhost:9000/uploads/${id}`)}>View Health Checkup Report</button>
                {isModalOpen && (
                  <div className="modal">
                    <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                    {training.filePath.endsWith('.pdf') ? (
                      <embed src={`http://localhost:9000/uploads/${id}`} type="application/pdf" width="100%" height="100%" />
                    ) : (
                      <img
                        src={`http://localhost:9000/uploads/${id}`}
                        alt="Uploaded File"
                      />
                    )}
                  </div>
                )}
              </>
            ) : (
              <p>No health checkup file available</p>
            )}
          </div>
        )}
      </div>
      {status !== 'rejected' && (
        <div>
          <h3>Assign an Instructor</h3>
          <input
            type="text"
            value={instructor}
            onChange={(e) => {
              const value = e.target.value;
              const newValue = value.replace(/[^A-Za-z]/ig, ''); // Allow only letters
              setInstructor(newValue);
            }}
            placeholder="Enter new instructor's name"
            id='instructor'
          />
          <button onClick={handleUpdateInstructor}>Add Instructor</button>
        </div>
      )}
      <div>
        <h3>Application status</h3>
        {renderActionButtons()}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PrivateTrainingDetails;
