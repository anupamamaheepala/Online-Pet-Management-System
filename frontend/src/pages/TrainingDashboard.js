import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Trainingdashboard.css'; // Import the CSS file

const TrainingDashboard = () => {
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = async () => {
        try {
            const response = await axios.get('http://localhost:9000/training/all');
            setTrainings(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

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
            <h2>Admin Dashboard</h2>
            <table className="alo1-table"> {/* Add className="alo1-table" */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Owner's Name</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>Dog's Name</th>
                        <th>Breed</th>
                        <th>Age</th>
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
                            <td>{training.address}</td>
                            <td>{training.contact}</td>
                            <td>{training.dogName}</td>
                            <td>{training.breed}</td>
                            <td>{training.age}</td>
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
