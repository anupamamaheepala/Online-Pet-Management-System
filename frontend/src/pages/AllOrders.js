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
                setOrders(res.data);
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
                                    {/* Add Edit functionality if needed */}
                                    <button className="btn btn-danger" onClick={() => handleDelete(order._id)}>Delete</button>
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
