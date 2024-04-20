import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Trainingdashboard.css'; // Import the CSS file
import AdminHeader from '../components/AdminHeader';
import jsPDF from 'jspdf';

const TrainingDashboard = () => {
  const [trainings, setTrainings] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('http://localhost:9000/training/all');
      const data = response.data;
      setTrainings(data);
      // Calculate counts for each status
      setPendingCount(data.filter(training => training.status === 'pending').length);
      setApprovedCount(data.filter(training => training.status === 'approved').length);
      setRejectedCount(data.filter(training => training.status === 'rejected').length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/training/delete/${id}`);
      fetchTrainings();
    } catch (error) {
      console.error('Error deleting training:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'black';
    }
  };

  const handleApproveTraining = async (id) => {
    try {
      await axios.put(`http://localhost:9000/training/approve/${id}`);
      // Update the training object in the frontend state
      setTrainings((prevTrainings) =>
        prevTrainings.map((training) => {
          if (training._id === id) {
            return { ...training, status: 'approved' };
          }
          return training;
        })
      );
      console.log('Training approved successfully');

    // Update the approved count
    setApprovedCount(prevCount => prevCount + 1);
    // Decrease the pending count
    setPendingCount(prevCount => prevCount - 1);
  } catch (error) {
    console.error('Error approving training:', error);
  }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const reportTitle = 'Approved Training Applicants';

    // Adding logo
    const logo = new Image();
    logo.src = '/images/logo.png';

    logo.onload = function () {
      const logoWidth = 40;
      const xPosition = 10;
      const yPosition = 10;

      doc.addImage(logo, 'PNG', xPosition, yPosition, logoWidth, logoWidth);

      // Calculate title position
      const pageWidth = doc.internal.pageSize.getWidth();
      const titleWidth =
        (doc.getStringUnitWidth(reportTitle) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const titleXPosition = (pageWidth - titleWidth) / 2;
      const titleYPosition = yPosition + logoWidth + 10;

      doc.setFontSize(18);
      doc.text(reportTitle, titleXPosition, titleYPosition);

      // Generate table data
      const tableData = trainings
        .filter((training) => training.status === 'approved')
        .map((training) => [
          training.ownerName,
          training.dogName,
          training.instructor,
          new Date(training.submissionDateTime).toLocaleDateString(),
        ]);

      // Generate the rest of the PDF content
      doc.setFontSize(12);
      doc.autoTable({
        startY: titleYPosition + 10,
        head: [['Owner Name', 'Dog Name', 'Instructor Name', 'Date']],
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

      doc.save('training-details.pdf');
    };
  };

  return (
    <div>
      <AdminHeader />
      <h2>Training Manager Dashboard</h2>
      <div className="dashboard-header">
        <div>
          Pending Applications: {pendingCount}
        </div>
        <div>
          Approved Applications: {approvedCount}
        </div>
        <div>
          Rejected Applications: {rejectedCount}
        </div>
        <div className="total-count">
          Total Applications: {trainings.length}
        </div>
      </div>
      
      <div className="button-row">
        <a href="PrivateTrainingPrograms">
          <button className="alo1-button">Add Dog Details for Private Training   |</button>
        </a>
        <a href="StepForm">
          <button className="alo1-button">Manage Private Programs   |</button>
        </a>
        <button className="alo1-button">Manage Group Programs</button>
        <button className="report-button" onClick={generatePDF}>
          Download Report
        </button>
      </div>

      <table className="alo1-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Owner's Name</th>
            <th>Dog's Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Instructor's Name</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {trainings.map((training, index) => (
            <tr key={training._id}>
              <td>{index + 1}</td>
              <td>{training.ownerName}</td>
              <td>{training.dogName}</td>
              <td>{new Date(training.submissionDateTime).toLocaleDateString()}</td>
              <td>{new Date(training.submissionDateTime).toLocaleTimeString()}</td>
              <td style={{ color: getStatusColor(training.status) }}>
                {training.status === 'pending'
                  ? 'Pending'
                  : training.status === 'approved'
                  ? 'Approved'
                  : 'Rejected'}
              </td>
              <td>{training.instructor || 'Not Assigned'}</td>

              <td>
               <Link to={{
  pathname: `/training/${training._id}`,
  state: { instructorName: training.instructor},
}} className="alo_view-details-button">
  <button className="alo1-button">View Details</button>
</Link>

              &nbsp;
            <button onClick={() => handleDelete(training._id)}>Delete</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingDashboard;
