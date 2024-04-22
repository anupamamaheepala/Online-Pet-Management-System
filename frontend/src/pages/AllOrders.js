import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import moment from 'moment';
import '../css/allorder.css';
import StockManagerHeader from '../components/StockManagerHeader';

// Utility function to calculate delivery date (5 working days from a given date)
const calculateDeliveryDate = (orderDate) => {
    const date = moment(orderDate);
    const weekdaysToAdd = 5;
    let count = 0;

    while (count < weekdaysToAdd) {
        date.add(1, 'days');
        const dayOfWeek = date.day(); // 0 = Sunday, 6 = Saturday
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            count++;
        }
    }

    return date.format('YYYY-MM-DD');
};

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        axios
            .get('http://localhost:9000/orders/all')
            .then((res) => {
                const initialOrders = res.data.map((order) => ({
                    ...order,
                    orderPlaced: false,
                    reportDownloaded: false,
                }));
                setOrders(initialOrders);
                setFilteredOrders(initialOrders);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleOrderPlaced = (id) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === id ? { ...order, orderPlaced: true } : order
            )
        );
        if (filter === 'lastWeek') {
            const lastWeek = moment().subtract(7, 'days');
            const filtered = orders.filter(
                (order) => moment(order.createdAt).isAfter(lastWeek)
            );
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders);
        }
    };

    const generatePDF = (order) => {
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
        });
    
        // Load the logo and add it above the box
        const logo = new Image();
        logo.src = '/images/logo.png'; // Path to your logo
    
        logo.onload = function() {
            const logoWidth = 40; // Adjust the width of the logo as needed
            const logoXPosition = (210 - logoWidth) / 2; // Center horizontally on the A4 page
            const logoYPosition = 10; // Position at the top of the page
    
            doc.addImage(logo, 'PNG', logoXPosition, logoYPosition, logoWidth, logoWidth); // Add the logo
    
            const logoBottom = logoYPosition + logoWidth; // Position where the logo ends
    
            // Adjust the box and text to avoid the logo
            const boxX = 10;
            const boxY = logoBottom + 50; // Ensure the box starts below the logo
            const boxWidth = 190;
            const boxHeight = 90;
    
            // Draw a box with a border
            doc.setDrawColor(0, 0, 0); 
            doc.setLineWidth(1);
            doc.rect(boxX, boxY, boxWidth, boxHeight);
    
            // Reposition the text to avoid the logo
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
    
            doc.text(`Order Report`, boxX + 5, boxY + 10);
            doc.text(`Name: ${order.orderName}`, boxX + 5, boxY + 20);
            doc.text(`Contact Number: ${order.orderContactNo}`, boxX + 5, boxY + 30);
            doc.text(`Address: ${order.orderAddress}`, boxX + 5, boxY + 40);
            doc.text(`Ordered Date: ${moment(order.createdAt).format('YYYY-MM-DD')}`, boxX + 5, boxY + 50);
            doc.text(`Delivery Date: ${calculateDeliveryDate(order.createdAt)}`, boxX + 5, boxY + 60);
    
            doc.setFontSize(16);
            doc.text(`Delivery Details`, 105, logoBottom + 25, null, null, 'center'); // Adjusted for the logo
    
            doc.save(`order_report_${order.orderName}.pdf`);
        };
    };
    

    const handleFilterChange = (e) => {
        const filterValue = e.target.value;
        setFilter(filterValue);

        if (filterValue === 'lastWeek') {
            const lastWeek = moment().subtract(7, 'days');
            const filtered = orders.filter(
                (order) => moment(order.createdAt).isAfter(lastWeek)
            );
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders);
        }
    };

    return (
        <>
            <StockManagerHeader />
            <div>
                <label htmlFor="orderFilter">Filter Orders:</label>
                <select id="orderFilter" onChange={handleFilterChange} value={filter}>
                    <option value="all">All Orders</option>
                    <option value="lastWeek">Last Week Orders</option>
                </select>
            </div>
            <h1>
                <center>Orders</center>
            </h1>
            <table className="ma_order-table">
                <thead>
                    <tr>
                        <th>Order Name</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th>Ordered Date</th>
                        <th>Delivery Date</th>
                        <th>Order Status</th>
                        <th>Download Report</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.orderName}</td>
                            <td>{order.orderContactNo}</td>
                            <td>{order.orderAddress}</td>
                            <td>{moment(order.createdAt).format('YYYY-MM-DD')}</td>
                            <td>{calculateDeliveryDate(order.createdAt)}</td>
                            <td>
                                {order.orderPlaced ? (
                                    '✔️'
                                ) : (
                                    <button onClick={() => handleOrderPlaced(order._id)}>
                                        Place Order
                                    </button>
                                )}
                            </td>
                            <td>
                                {order.reportDownloaded ? (
                                    '✔️'
                                ) : (
                                    <button onClick={() => generatePDF(order)}>
                                        Download Report
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AllOrders;
