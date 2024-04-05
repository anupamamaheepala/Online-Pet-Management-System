import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Trainingdashboard.css'; // Import the CSS file

const TrainingDashboard = () => {
    const [trainings, setTrainings] = useState([]);
  
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
  
    const downloadFile = async (filePath) => {
      try {
        const response = await axios.get(`http://localhost:9000/${filePath}`, {
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filePath.split('/').pop());
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    };
    const handleStatusChange = async (id, status) => {
        try {
            await axios.put(`http://localhost:9000/training/updateStatus/${id}`, { status });
            fetchTrainings();
        } catch (error) {
            console.error('Error updating status:', error);
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

    return (
        <div>
            <h2>Training Manager Dashboard</h2>
            <a href='PrivateTrainingPrograms'>
            <button className='alo1-button' > + Add Dog Detals for PrivateTraining</button>
            </a>
            <table className="alo1-table"> {/* Add className="alo1-table" */}
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Owner's Name</th>
                        <th>Dog's Name</th>
                        <th>file</th>
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
                            <td>
                <a href="#" onClick={() => downloadFile(training.filePath)}>Download</a>
              </td> 
              
                            {/*Fixed date & time*/}
                           <td>{new Date(training.submissionDateTime).toLocaleDateString()}</td> {/* Display date */}
                           <td>{new Date(training.submissionDateTime).toLocaleTimeString()}</td> {/* Display time */}
 
                            

                            <td>
                                <select onChange={(e) => handleStatusChange(training._id, e.target.value)} value={training.status}>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
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