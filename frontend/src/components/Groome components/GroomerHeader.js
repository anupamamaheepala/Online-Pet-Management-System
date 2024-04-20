import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Badge, NavDropdown } from 'react-bootstrap';
import { Bell } from 'react-bootstrap-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const GroomerHeader = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [groomeAppointmentCount, setGroomeAppointmentCount] = useState(0);
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMouseInDropdown, setIsMouseInDropdown] = useState(false);

  const handleNotificationClick = () => {
    axios
      .get('http://localhost:9000/appointment/grooming-appointments', {
        params: { IsAccept: false, selectService: 'Grooming Service' },
      })
      .then((response) => {
        const pendingAppointments = response.data;

        if (pendingAppointments.length === 0) {
          MySwal.fire('No Pending Appointments', 'You have no pending grooming appointments at the moment.', 'info');
        } else {
          const appointmentList = pendingAppointments.map((appointment, index) => (
            <div key={appointment._id}>
              <p>
                {index + 1}. {appointment.ownerName} - {appointment.selectService}
              </p>
              <hr />
            </div>
          ));

          MySwal.fire({
            title: 'Pending Grooming Appointments',
            html: <div>{appointmentList}</div>,
            showCancelButton: true,
            confirmButtonText: 'View Notifications',
            cancelButtonText: 'Close',
            preConfirm: () => {
              window.location.href = '/GroomerNotifications';
            },
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching pending appointments:', error);
        MySwal.fire('Error', 'Failed to fetch pending grooming appointments.', 'error');
      });
  };

  useEffect(() => {
    // Fetch grooming appointments count
    axios
      .get('http://localhost:9000/appointment/grooming-appointments/count', {
        params: { IsAccept: false, IsPaid: false, selectService: 'Grooming Service' },
      })
      .then((response) => {
        setGroomeAppointmentCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching grooming appointment count:', error);
      });

    // Fetch notification count
    axios
      .get('http://localhost:9000/appointment/grooming-appointments/count', {
        params: { IsAccept: false, selectService: 'Grooming Service' },
      })
      .then((response) => {
        setNotificationCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching notification count:', error);
      });
  }, []);

  const handleMouseEnter = (item) => {
    setHighlightedItem(item);
    if (item === 'appointments') {
      setDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMouseInDropdown) {
      setHighlightedItem(null);
      setDropdownOpen(false);
    }
  };

  const getItemStyle = (item) => {
    if (highlightedItem === item) {
      return {
        backgroundColor: '#f2f2f2',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
        color: 'black',
        transition: 'all 0.2s ease-in-out',
      };
    }
    return { color: 'white' };
  };

  const getSubmenuItemStyle = (item) => {
    if (highlightedItem === item) {
      return {
        backgroundColor: 'black',
        color: 'white',
        transition: 'all 0.2s ease-in-out',
      };
    }
    return {};
  };

  const handleDropdownToggle = (isOpen) => {
    setDropdownOpen(isOpen);
  };

  const handleDropdownMouseEnter = () => {
    setIsMouseInDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsMouseInDropdown(false);
    setHighlightedItem(null);
    setDropdownOpen(false);
  };

  return (
    <Navbar style={{ backgroundColor: 'black', color: 'white' }} expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav>
          <NavDropdown
            title={<span style={getItemStyle('appointments')}>Appointments</span>}
            id="basic-nav-dropdown"
            show={dropdownOpen}
            onMouseEnter={() => handleMouseEnter('appointments')}
            onMouseLeave={handleMouseLeave}
            style={getItemStyle('appointments')}
            onToggle={handleDropdownToggle}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <NavDropdown.Item
              href="/GroomerNotifications"
              style={getSubmenuItemStyle('pendingAppointments')}
              onMouseEnter={() => handleMouseEnter('pendingAppointments')}
              onMouseLeave={handleMouseLeave}
            >
              Pending Appointments
            </NavDropdown.Item>
            <NavDropdown.Item
              href="/GroomeNotifications"
              style={getSubmenuItemStyle('approvedAppointments')}
              onMouseEnter={() => handleMouseEnter('approvedAppointments')}
              onMouseLeave={handleMouseLeave}
            >
              Approved Appointments
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            style={getItemStyle('schedule')}
            href="#schedule"
            onMouseEnter={() => handleMouseEnter('schedule')}
            onMouseLeave={handleMouseLeave}
          >
            Schedule
          </Nav.Link>
          <Nav.Link
            style={getItemStyle('settings')}
            href="#settings"
            onMouseEnter={() => handleMouseEnter('settings')}
            onMouseLeave={handleMouseLeave}
          >
            Settings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <div style={{ marginRight: '30px' }}>
          <Button
            variant="outline-primary"
            style={{ position: 'relative', color: 'white', borderColor: 'white' }}
            onClick={handleNotificationClick}
          >
            <Bell color="white" />
            <Badge
              pill
              variant="danger"
              className="position-absolute"
              style={{ top: -10, right: -10 }}
            >
              {notificationCount}
            </Badge>
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default GroomerHeader;