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
            await axios.post(`http://localhost:9000/feedback/${id}/like`);
            // Update the state to reflect the change in likes
            setFeedbackList(prevFeedbackList => prevFeedbackList.map(feedback => {
                if (feedback._id === id) {
                    return { ...feedback, likes: feedback.likes + 1 };
                }
                return feedback;
            }));
        } catch (error) {
            console.error("Error liking feedback:", error);
            alert("Failed to like feedback");
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
