import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const FeedbackRating = () => {
    const [ratingData, setRatingData] = useState([]);

    useEffect(() => {
        // Fetch feedback rating data from backend
        axios.get("http://localhost:9000/feedback/rating")
            .then((res) => {
                setRatingData(res.data);
            })
            .catch((err) => {
                console.error("Error fetching feedback rating data:", err);
            });
    }, []);

    // Prepare data for chart
    const data = {
        labels: ratingData.map(item => item._id), // Assuming _id contains the rating
        datasets: [
            {
                label: 'Feedback Ratings',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: ratingData.map(item => item.count)
            }
        ]
    };

    return (
        <div>
            <h2>Feedback Ratings</h2>
            <div>
                <Bar
                    data={data}
                    options={{
                        title: {
                            display: true,
                            text: 'Feedback Ratings',
                            fontSize: 20
                        },
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default FeedbackRating;
