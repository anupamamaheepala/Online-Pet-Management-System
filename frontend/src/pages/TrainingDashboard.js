import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Trainingdashboard.css';
import AdminHeader from '../components/AdminHeader';
import jsPDF from 'jspdf';

const TrainingDashboard = () => {
  const [trainings, setTrainings] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    fetchTrainings();
  }, []);

  useEffect(() => {
    updateCounts(trainings);
  }, [trainings]);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('http://localhost:9000/training/all');
      const data = response.data;
      setTrainings(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateCounts = (trainings) => {
    const pending = trainings.filter((training) => training.status === 'pending').length;
    const approved = trainings.filter((training) => training.status === 'approved').length;
    const rejected = trainings.filter((training) => training.status === 'rejected').length;
    setPendingCount(pending);
    setApprovedCount(approved);
    setRejectedCount(rejected);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
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
      doc.text(reportTitle, 70, yPosition + logoWidth - 15);

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
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
      });

      doc.save('training-details.pdf');
    };
  };

  const handleDownloadReport = () => {
    generatePDF();
  };

  const filteredTrainings = trainings.filter((training) => {
    const ownerNameMatch = training.ownerName.toLowerCase().includes(searchQuery);
    const instructorMatch = training.instructor && training.instructor.toLowerCase().includes(searchQuery);
    const instructorIdMatch = training.instructorId && training.instructorId.toLowerCase().includes(searchQuery);
    return ownerNameMatch || instructorMatch || instructorIdMatch;
  });
  
  return (
    <div>
      <AdminHeader />
      <h2>Training Manager Dashboard</h2>
      <div className="dashboard-header">
        <div>Pending Applications: {pendingCount}</div>
        <div>Approved Applications: {approvedCount}</div>
        <div>Rejected Applications: {rejectedCount}</div>
        <div className="total-count">Total Applications: {trainings.length}</div>
      </div>
      <div className="button-row">
        <a href="PrivateTrainingPrograms">
          <button className="alo1-button">Add Dog Details for Private Training |</button>
        </a>
        <a href="StepForm">
          <button className="alo1-button">Manage Private Programs |</button>
        </a>
        <button className="alo1-button">Manage Group Programs</button>
        <button className="report-button" onClick={handleDownloadReport}>
          Download Report
        </button>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="ma_search-input"
      />
      <div className="alo_table-container">
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
            {filteredTrainings.map((training, index) => (
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
                  <Link
                    to={{
                      pathname: `/training/${training._id}`,
                      state: { instructorName: selectedTrainer ? selectedTrainer.label : '' },
                    }}
                    className="alo_view-details-button"
                  >
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
    </div>
  );
};

export default TrainingDashboard;
