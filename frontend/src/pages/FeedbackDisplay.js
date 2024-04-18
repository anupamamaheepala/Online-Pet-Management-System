import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackdisplay.css';

const FeedbackDisplay = () => {
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

    // Function to render star ratings
    const renderStarRating = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<span key={i} className="star">★</span>);
        }
        return stars;
    };

    const handleLike = async (id) => {
        try {
            const response = await axios.post(`http://localhost:9000/feedback/${id}/like`);
            if (response.data.success) {
                // Update feedback list with the new like count
                setFeedbackList(prevFeedbackList =>
                    prevFeedbackList.map(feedback =>
                        feedback._id === id ? { ...feedback, likes: feedback.likes + 1 } : feedback
                    )
                );
            }
        } catch (error) {
            console.error("Error liking feedback:", error);
            alert("Failed to like feedback");
        }
    };

    const handleDislike = async (id) => {
        try {
            const response = await axios.post(`http://localhost:9000/feedback/${id}/dislike`);
            if (response.data.success) {
                // Update feedback list with the new dislike count
                setFeedbackList(prevFeedbackList =>
                    prevFeedbackList.map(feedback =>
                        feedback._id === id ? { ...feedback, dislikes: feedback.dislikes + 1 } : feedback
                    )
                );
            }
        } catch (error) {
            console.error("Error disliking feedback:", error);
            alert("Failed to dislike feedback");
        }
    };

    const handleReply = (id, message) => {
        // Implement reply functionality here
        alert(`Reply to feedback with ID ${id}: ${message}`);
    };

    return (
        <>
            <Header />
            <Link to="/feedback" className="faq-button faq-button-feedback">Give Feedback</Link>
        <Link to="/feedbackinquiry" className="faq-button faq-button-inquiry">Make an Inquiry</Link>
            <h1><center>Customer Feedback</center></h1>
        
            <div className='feedbackListContainer'>
                {feedbackList.map((feedback, index) => (
                    <div key={index} className="feedbackItem">
                        <h3>{feedback.name}</h3>
                        <p>{feedback.feedback}</p>
                        <div className="starRating">
                            {renderStarRating(feedback.rating)}
                        </div>
                        <div className="actionButtons">
                            <button onClick={() => handleLike(feedback._id)}>Like ({feedback.likes || 0})</button>
                            <button onClick={() => handleDislike(feedback._id)}>Dislike ({feedback.dislikes || 0})</button>
                            <button onClick={() => handleReply(feedback._id, feedback.feedback)}>Reply</button>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </>
    );
}

export default FeedbackDisplay;
