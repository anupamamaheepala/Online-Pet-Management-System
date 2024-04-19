import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Trainingdashboard.css'; // Import the CSS file
import AdminHeader from '../components/AdminHeader';
import jsPDF from 'jspdf';


const TrainingDashboard = () => {
    const [trainings, setTrainings] = useState([]);
    const[reportData, setReportData] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
      fetchTrainings();
    }, []);
  
    const fetchTrainings = async () => {
      try {
        const response = await axios.get('http://localhost:9000/training/all');
        setTrainings(response.data);
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

    const generatePDF = () => {
        const doc = new jsPDF();
        const reportTitle = 'Approved Training Applicants';
        
        // Adding logo
        const logo = new Image();
        logo.src = '/images/logo.png';

        logo.onload = function(){
            const logoWidth = 40;
            const xPosition = 10;
            const yPosition = 10;

            doc.addImage(logo, 'PNG', xPosition, yPosition, logoWidth, logoWidth);

            // Calculate title position
            const pageWidth = doc.internal.pageSize.getWidth();
            const titleWidth = doc.getStringUnitWidth(reportTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const titleXPosition = (pageWidth - titleWidth) / 2;
            const titleYPosition = yPosition + logoWidth + 10;
            
            doc.setFontSize(18);
            doc.text(reportTitle, titleXPosition, titleYPosition);

            // Generate table data
            const tableData = trainings.filter(training => training.status === 'approved').map(training => [
                training.ownerName,
                training.dogName,
                training.instructorName,
                new Date(training.submissionDateTime).toLocaleDateString()
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
            <div className="button-row">
                <a href='PrivateTrainingPrograms'>
                    <button className='alo1-button'> + Add Dog Details for Private Training</button>
                </a>
                <a href='StepForm'>
                <button className='alo1-button'> + Manage Private Programs</button>
                </a>
                <button className='alo1-button'> Manage Group Programs</button>
                <button className="report-button" onClick={generatePDF}>Download Report</button>

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
                        <th>Actions</th>
                        <th>Action</th>
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
                                {training.status === 'pending' ? 'Pending' : training.status === 'approved' ? 'Approved' : 'Rejected'}
                            </td>
                            <td>
                                <Link to={`/training/${training._id}`}>View Details</Link>
                            </td>
                            <td>
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
