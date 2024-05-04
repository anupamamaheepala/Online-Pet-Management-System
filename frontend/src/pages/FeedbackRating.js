import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const FeedbackRating = () => {
    const [ratingData, setRatingData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/feedback/rating")
            .then((res) => {
                const data = res.data;
                setRatingData(data);
            })
            .catch((err) => {
                console.error('Error fetching rating data:', err);
            });
    }, []);

    // Extract labels and ratings for the bar graph
    const labels = ratingData.map(item => item._id);
    const ratings = ratingData.map(item => item.count);

    // Data for the bar graph
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Rating Count',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: ratings
            }
        ]
    };

    // Options for the bar graph
    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    return (
        <div>
            <h2>Feedback Ratings</h2>
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
}

export default FeedbackRating;
