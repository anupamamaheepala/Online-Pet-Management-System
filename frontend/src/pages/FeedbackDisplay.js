import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackdisplay.css';

const FeedbackDisplay = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [selectedStars, setSelectedStars] = useState(null); // State to store the selected star rating

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

    // Function to handle thumbs up button click
    const handleLike = async (feedbackId, index) => {
        try {
            const response = await axios.post(`http://localhost:9000/feedback/${feedbackId}/like`);
            const updatedFeedbackList = [...feedbackList];
            updatedFeedbackList[index] = response.data;
            setFeedbackList(updatedFeedbackList);
        } catch (error) {
            console.error('Error liking feedback:', error);
        }
    };

    // Function to handle thumbs down button click
    const handleDislike = async (feedbackId, index) => {
        try {
            const response = await axios.post(`http://localhost:9000/feedback/${feedbackId}/dislike`);
            const updatedFeedbackList = [...feedbackList];
            updatedFeedbackList[index] = response.data;
            setFeedbackList(updatedFeedbackList);
        } catch (error) {
            console.error('Error disliking feedback:', error);
        }
    };

    // Filter feedback list by selected star rating
    const filteredFeedbackList = selectedStars
        ? feedbackList.filter(feedback => feedback.rating === selectedStars)
        : feedbackList;

    return (
        <>
            <Header />
            <div className="buttonContainer">
                <Link to="/feedback">
                    <button className="FDbuttons">Give Feedback</button>
                </Link>
                <Link to="/feedbackinquiry">
                    <button className="FDBbuttons">Make an Inquiry</button>
                </Link>
            </div>
            <div className="titleContainer">
                <h1><center>Customers Feedback</center></h1>
            </div>

            {/* Star filter dropdown */}
            <div className="starFilter">
                <label htmlFor="starFilter">Filter by star rating:</label>
                <select
                    id="starFilter"
                    value={selectedStars}
                    onChange={(e) => setSelectedStars(parseInt(e.target.value))}
                >
                    <option value="">All</option>
                    {[1, 2, 3, 4, 5].map(star => (
                        <option key={star} value={star}>{renderStarRating(star)}</option>
                    ))}
                </select>
            </div>

            <div className='feedbackListContainer'>
                {filteredFeedbackList.map((feedback, index) => (
                    <div key={index} className="feedbackItem">
                        <h3>{feedback.name}</h3>
                        <p>{feedback.feedback}</p>
                        {feedback.reply !== "pending" && (
                            <div className="adminReply">
                                <strong>Pet Zone Hospital:</strong>
                                <p>{feedback.reply}</p>
                            </div>
                        )}
                        <div className="starRating">
                            {renderStarRating(feedback.rating)}
                        </div>
                        <div className="feedbackButtons">
                            <button onClick={() => handleLike(feedback._id, index)} className="likeButton">
                                &#128077; ({feedback.likes})
                            </button>
                            <button onClick={() => handleDislike(feedback._id, index)} className="dislikeButton">
                                &#128078; ({feedback.dislikes})
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </>
    );
}

export default FeedbackDisplay;
