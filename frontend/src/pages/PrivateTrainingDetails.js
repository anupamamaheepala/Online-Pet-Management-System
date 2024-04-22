import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import '../css/ptrainingdetails.css'; // Ensure correct path to your CSS file
import Header from '../components/Header';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';



const PrivateTrainingDetails = () => {
  const [training, setTraining] = useState(null);
  const [instructor, setInstructor] = useState('');
  const [status, setStatus] = useState('pending');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [modalImageUrl, setModalImageUrl] = useState(''); // State to store modal image URL
  const [selectProfession, setSelectProfession] = useState('');
  const [professionOptions, setProfessionOptions] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    fetchProfessionOptions();
  }, []);

  const fetchProfessionOptions = async () => {
    try {
      const response = await axios.get('http://localhost:9000/staff');
      const trainers = response.data.filter(
        (staff) => staff.designation === 'Pet Trainer' 
      );
      const options = trainers.map((staff) => ({
        value: staff.staffId,
        label: `${staff.sfirstname} ${staff.slastname}`
      }));
      setProfessionOptions(options);
    } catch (error) {
      console.error('Error fetching profession options:', error);
    }
  };

  useEffect(() => {
    const fetchTrainingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/training/${id}`);
        setTraining(response.data);
        setInstructor(response.data.instructor || '');
        setStatus(response.data.status || 'pending');
        
        if (location.state && location.state.instructorName) {
          setInstructor(response.data.instructorName);
        }
      } catch (error) {
        console.error('Error fetching training details:', error);
      }
    };

    fetchTrainingDetails();
  }, [id, location]);

  useEffect(() => {
    // Retrieve the instructor's name from local storage
    const storedInstructorName = localStorage.getItem('instructorName');
    if (storedInstructorName) {
      setInstructor(storedInstructorName);
    }
  }, []);
  
  const handleUpdateInstructor = async () => {
    try {
      if (!selectedTrainer) {
        window.alert('Please select a trainer');
        return;
      }
  
      await axios.put(`http://localhost:9000/training/updateInstructor/${id}`, { instructor: selectedTrainer.value },{instructor: selectedTrainer.label});
      console.log('Instructor updated successfully');
      window.alert('Instructor successfully added');
  
      // Store the instructor's name in local storage
      localStorage.setItem('instructorName', selectedTrainer.label);
      localStorage.setItem('instructorName', selectedTrainer.value);
      
      // Update the instructor state
      setInstructor(selectedTrainer.label);
    } catch (error) {
      console.error('Error updating instructor:', error);
    }
  };
  
  
  
  const handleApproveTraining = async () => {
    try {
      // Check if a trainer has been selected
      if (!selectedTrainer) {
        // Display alert message
        window.alert('Cannot approve training without assigning an instructor');
        return;
      }
  
      // Proceed with approving the training if a trainer has been selected
      await axios.put(`http://localhost:9000/training/approve/${id}`, { instructor: selectedTrainer.value });
      // Update the training object in the frontend state
      setTraining(prevTraining => ({
        ...prevTraining,
        status: 'approved',
        instructorName: selectedTrainer.label, // Update the instructor's name in the frontend state
      }));
  
      // Show SweetAlert message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Application approved and instructor added successfully',
        confirmButtonText: 'Go back to Dashboard',
      }).then((result) => {
        if (result.isConfirmed) {
          return <Link to="../pages/TrainingDashboard.js" />;
          <Link to={`/view-application?id=${id}&instructor=${selectedTrainer.label}`}>View Application</Link>
          // Redirect to Dashboard or wherever you want to go
          // You can use history.push('/dashboard') or window.location.href = '/dashboard'
        }
      });
  
      console.log('Training approved successfully');
    } catch (error) {
      console.error('Error approving training:', error);
    }
  };
  
  

  const handleRejectTraining = async () => {
    try {
      localStorage.removeItem('instructor');
      setInstructor('');
      await axios.put(`http://localhost:9000/training/reject/${id}`);
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
          <p><strong>Instructor:</strong> {selectedTrainer ? selectedTrainer.value : 'Not Assigned'}</p>
          <p><strong>Instructor's Name:</strong> {selectedTrainer ? selectedTrainer.label : 'Not Assigned'}</p>



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
            <div className="trainer-container">
              <label className="trainer-label" htmlFor="selectProfession">Select Trainer:</label>
              <select
  className="trainer_select"
  id="selectProfession"
  value={selectedTrainer ? selectedTrainer.value : ''}
  onChange={(e) => {
    const selectedOption = professionOptions.find(option => option.value === e.target.value);
    setSelectedTrainer(selectedOption);
  }}
  required
>
  <option value="">--Please select--</option>
  {professionOptions.map((option, index) => (
    <option key={index} value={option.value}>{option.label}</option>
  ))}
</select>

            </div>
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
