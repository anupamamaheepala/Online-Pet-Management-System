// FeedbackDisplay.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            // Implement like functionality here
        } catch (error) {
            console.error("Error liking feedback:", error);
            alert("Failed to like feedback");
        }
    };

    const handleDislike = async (id) => {
        try {
            // Implement dislike functionality here
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
