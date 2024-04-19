import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackadmindisplay.css';

const FeedbackAdminDisplay = () => {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/feedback/all")
            .then((res) => {
                setFeedbackList(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/feedback/${id}`);
            setFeedbackList(prevFeedbackList => prevFeedbackList.filter(feedback => feedback._id !== id));
            alert("Feedback deleted successfully!");
        } catch (error) {
            console.error("Error deleting feedback:", error);
            alert("Failed to delete feedback");
        }
    };

    const handleUpdate = (id) => {
        // Implement your update logic here
        alert(`Update feedback with ID: ${id}`);
    };

    return (
        <>
            <Header />
            <h1><center>Feedback List</center></h1>

            <div className='feedbackListContainer'>
                <table className="feedbackList-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Feedback</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Likes</th>
                            <th>Dislikes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbackList.map((feedback, index) => (
                            <tr key={feedback._id}>
                                <td>{index + 1}</td>
                                <td>{feedback.feedback}</td>
                                <td>{feedback.email}</td>
                                <td>{feedback.name}</td>
                                <td>{feedback.rating}</td>
                                <td>{feedback.likes}</td>
                                <td>{feedback.dislikes}</td>
                                <td>
                                    <button className="feedbackList-update-btn" onClick={() => handleUpdate(feedback._id)}>Update</button>
                                    <button className="feedbackList-delete-btn" onClick={() => handleDelete(feedback._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Link to Feedback page */}
            <div>
                <Link to="/feedbackDisplay">View Feedback</Link>
            </div>

            <Footer />
        </> 
    );
}

export default FeedbackAdminDisplay;
