import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/allorder.css'

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/orders/all")
            .then((res) => {
                console.log(res.data);
                setOrders(res.data.map(order => ({ ...order, status: 'Pending' })));
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await axios.delete(`http://localhost:9000/orders/${id}`);
                setOrders(orders.filter((order) => order._id !== id));
                alert('Order deleted successfully');
            } catch (error) {
                alert('Failed to delete order');
            }
        } else {
            alert('Deletion cancelled.');
        }
    };

    const handleAvailability = async (id) => {
        // Find the order index
        const index = orders.findIndex(order => order._id === id);
        if (index !== -1) {
            // Update the order's status
            const updatedOrders = [...orders];
            updatedOrders[index].status = 'Confirmed';
            setOrders(updatedOrders);
        }
    };

    const handleDecline = async (id) => {
        // Find the order index
        const index = orders.findIndex(order => order._id === id);
        if (index !== -1) {
            // Update the order's status
            const updatedOrders = [...orders];
            updatedOrders[index].status = 'Declined';
            setOrders(updatedOrders);
        }
    };

    return (
        <>
            <Header />
            <h1><center>Orders</center></h1>
            <table className="ma_order-table">
                <thead>
                    <tr>
                        <th>Order Name</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.orderName}</td>
                            <td>{order.orderContactNo}</td>
                            <td>{order.orderAddress}</td>
                            <td>
                                <div className="ma_button-container">
                                    {order.status === 'Confirmed' ? (
                                        <span>Confirmed</span>
                                    ) : (
                                        <button className="btn btn-danger" onClick={() => handleDecline(order._id)}>Not Available</button>
                                    )}
                                    {order.status === 'Confirmed' || order.status === 'Declined' ? null : (
                                        <button className="btn btn-success" onClick={() => handleAvailability(order._id)}>Available</button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </>
    );
}

export default AllOrders;
