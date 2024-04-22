import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Badge, NavDropdown } from 'react-bootstrap';
import { Bell, PersonCircle, HouseDoorFill } from 'react-bootstrap-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const VetHeader = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMouseInDropdown, setIsMouseInDropdown] = useState(false);

  const handleNotificationClick = () => {
    axios
      .get('http://localhost:9000/appointment/appointments', {
        params: { IsAccept: false, selectService: 'Veterinary Service' },
      })
      .then((response) => {
        const pendingAppointments = response.data;

        if (pendingAppointments.length === 0) {
          MySwal.fire('No Pending Appointments', 'You have no pending veterinary appointments at the moment.', 'info');
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
            title: 'Pending Veterinary Appointments',
            html: <div>{appointmentList}</div>,
            showCancelButton: true,
            confirmButtonText: 'View Notifications',
            cancelButtonText: 'Close',
            preConfirm: () => {
              window.location.href = '/VetNotifications';
            },
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching pending appointments:', error);
        MySwal.fire('Error', 'Failed to fetch pending appointments.', 'error');
      });
  };

  useEffect(() => {
    const fetchVetAppointmentCount = async () => {
      try {
        const response = await axios.get('http://localhost:9000/appointment/appointments');
        const appointmentsData = response.data;
        const vetAppointments = appointmentsData.filter(
          (appointment) => appointment.selectService === 'Veterinary Service' && !appointment.IsAccept
        );
        setNotificationCount(vetAppointments.length);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchVetAppointmentCount();
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
          <Nav.Link
            style={getItemStyle('dashboard')}
            href="/VetDashboard"
            onMouseEnter={() => handleMouseEnter('dashboard')}
            onMouseLeave={handleMouseLeave}
          >
            <HouseDoorFill color="white" />
            {' '}
            Dashboard
          </Nav.Link>
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
              href="/VetNotifications"
              style={getSubmenuItemStyle('pendingAppointments')}
              onMouseEnter={() => handleMouseEnter('pendingAppointments')}
              onMouseLeave={handleMouseLeave}
            >
              Pending Appointments
            </NavDropdown.Item>
            <NavDropdown.Item
              href="/AllVetAppointments"
              style={getSubmenuItemStyle('approvedAppointments')}
              onMouseEnter={() => handleMouseEnter('approvedAppointments')}
              onMouseLeave={handleMouseLeave}
            >
              Approved Appointments
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            style={getItemStyle('reports')}
            href="#reports"
            onMouseEnter={() => handleMouseEnter('reports')}
            onMouseLeave={handleMouseLeave}
          >
            Reports
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
          <Button
            variant="outline-primary"
            style={{ marginLeft: '10px', color: 'white', borderColor: 'white' }}
            onClick={() => window.location.href = '/StaffProfile'}
          >
            <PersonCircle color="white" />
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default VetHeader;
