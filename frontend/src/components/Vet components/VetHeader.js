import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Badge } from 'react-bootstrap';
import { Bell } from 'react-bootstrap-icons';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import the Link component

const VetHeader = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Fetch the count of appointments where IsAccept is false
    axios
      .get('http://localhost:9000/appointment/appointments/count', {
        params: {
          IsAccept: false,
        },
      })
      .then((response) => {
        setNotificationCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching appointment count:', error);
      });
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav>
          <Nav.Link href="/AllVetAppointments">Upcoming Appointments</Nav.Link>
          <Nav.Link href="#generateReport">Generate Report</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <div style={{ marginRight: '30px' }}>
          <Link to="/VetNotifications">
            <Button variant="outline-primary" style={{ position: 'relative' }}>
              <Bell />
              <Badge pill variant="danger" className="position-absolute" style={{ top: -10, right: -10 }}>
                {notificationCount}
              </Badge>
            </Button>
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default VetHeader;