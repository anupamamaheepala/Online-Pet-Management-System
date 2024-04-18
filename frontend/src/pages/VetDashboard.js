import React, { useState } from 'react';
import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { NotificationOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Footer from '../components/Footer';
import '../css/vetdashboard.css'; // Import your CSS file here
import AdminHeader from '../components/AdminHeader';

function VetDashboard() {
  const [notificationCount, setNotificationCount] = useState(0);

  // Function to update notification count
  const updateNotificationCount = (count) => {
    setNotificationCount(count);
  };

  return (
    <>
      <AdminHeader/>
      <div className="vet-dashboard">
        
        
        <div className="notification-icon">
          
          <Link to="/VetNotifications">
            <Badge count={notificationCount}>
              <BellOutlined style={{ fontSize: '24px', color: '#000000' }} />
            </Badge>
          </Link>
        </div>
      </div>


      <h1>VET dashboard</h1>
      <h1>VET dashboard</h1>
      <h1>VET dashboard</h1>
      <h1>VET dashboard</h1>
      <h1>VET dashboard</h1>
      <Footer />
    </>
  );
}

export default VetDashboard;
