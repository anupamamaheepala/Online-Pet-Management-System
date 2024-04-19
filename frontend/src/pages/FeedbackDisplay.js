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

    // Filter feedback list by selected star rating
    const filteredFeedbackList = selectedStars
        ? feedbackList.filter(feedback => feedback.rating === selectedStars)
        : feedbackList;

    return (
        <>
            <Header />
            <Link to="/feedback">
                <button className="FDbuttons">Give Feedback</button>
            </Link>
            <Link to="/feedbackinquiry">
                <button className="">Make an Inquiry</button>
            </Link>
            <h1><center>Customer Feedback</center></h1>

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
                        <div className="starRating">
                            {renderStarRating(feedback.rating)}
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </>
    );
}

export default FeedbackDisplay;
