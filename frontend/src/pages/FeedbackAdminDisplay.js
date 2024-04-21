import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackadmindisplay.css';
import jsPDF from 'jspdf';

const FeedbackAdminDisplay = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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
        
    };

    const filteredData = feedbackList.filter(feedback => {
        const searchQueryLower = searchQuery.toLowerCase();
        return (
            feedback.name.toLowerCase().includes(searchQueryLower) ||
            feedback.email.toLowerCase().includes(searchQueryLower)
        );
    });

    const GenReport = () => {
        const doc = new jsPDF('');
        const title = "Feedback Report";
        const titleMargin = 20;
        const tableMargin = 20;
        const titleWidth = doc.getTextWidth(title);
        const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2);
    
        doc.text(title, center, titleMargin);
    
        // Create logo
        const logo = new Image();
        logo.src = '/images/logo.png';
    
        
        logo.onload = function() {
            const logoWidth = 20; // Adjust the width 
            const xPosition = 10; // left margin
            const yPosition = 10; // top margin
    
            doc.addImage(logo, 'PNG', xPosition, yPosition, logoWidth, logoWidth);
    
            //  generate the rest of the PDF
            doc.autoTable({
                head: [['Feedback', 'Email', 'Name', 'Rating', 'Likes', 'Dislikes']],
                body: filteredData.map((val, i) => [val.feedback, val.email, val.name, val.rating, val.likes, val.dislikes]),
                startY: titleMargin + tableMargin,
            });
    
            // Save the PDF 
            doc.save('Feedback Report.pdf');
        };
    };

    return (
        <>
            <Header />
            <div className="feedback-inquiry-admin-container">
                <h1><center>Feedback List</center></h1>
                <div className="ssearch">
                    <center><input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search" /></center>
                </div>
            </div>
            <div className='feedbackListContainer'>
                <table className="feedbackList-table">
                    <thead>
                        <tr>
                            <th>Feedback</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Likes</th>
                            <th>Dislikes</th>
                            <th>Reply</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((feedback) => (
                            <tr key={feedback._id}>
                                <td>{feedback.feedback}</td>
                                <td>{feedback.email}</td>
                                <td>{feedback.name}</td>
                                <td>{feedback.rating}</td>
                                <td>{feedback.likes}</td>
                                <td>{feedback.dislikes}</td>
                                <td>{feedback.reply}</td>
                                <td>
                                    <div className="action-buttons">
                                        <Link to={`/FeedbackReplyForm/${feedback._id}/${feedback.feedback}`}>
                                            <button className="btn btn-warning" onClick={() => handleUpdate(feedback._id)}>Update</button>
                                            
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(feedback._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='ggenButton'>
                    <button onClick={GenReport}>Generate Report</button>
                </div>
            </div>
            <div>
                <Link to="/feedbackDisplay">View Feedback</Link>
            </div>
            <Footer />
        </>
    );
}

export default FeedbackAdminDisplay;
