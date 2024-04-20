import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const [activeLink, setActiveLink] = useState('');
  const [highlightedLink, setHighlightedLink] = useState('');

  const handleSelect = (selectedKey) => setActiveLink(selectedKey);

  const handleMouseEnter = (link) => setHighlightedLink(link);
  const handleMouseLeave = () => setHighlightedLink('');

  const activeStyle = {
    fontWeight: 'bold',
    color: 'black',
  };

  const highlightedStyle = {
    backgroundColor: '#f2f2f2',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
    color: 'black',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <Navbar bg="light" expand="lg" onSelect={handleSelect}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="mx-auto">
            <Nav.Link
              as={Link}
              to="/systemAdmin"
              eventKey="/systemAdmin"
              style={
                activeLink === '/systemAdmin'
                  ? activeStyle
                  : highlightedLink === '/systemAdmin'
                  ? highlightedStyle
                  : {}
              }
              onMouseEnter={() => handleMouseEnter('/systemAdmin')}
              onMouseLeave={handleMouseLeave}
            >
              System Admin
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/VetDashboard"
              eventKey="/VetDashboard"
              style={
                activeLink === '/VetDashboard'
                  ? activeStyle
                  : highlightedLink === '/VetDashboard'
                  ? highlightedStyle
                  : {}
              }
              onMouseEnter={() => handleMouseEnter('/VetDashboard')}
              onMouseLeave={handleMouseLeave}
            >
              Veterinarian
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/GroomeDashboard"
              eventKey="/GroomeDashboard"
              style={
                activeLink === '/GroomeDashboard'
                  ? activeStyle
                  : highlightedLink === '/GroomeDashboard'
                  ? highlightedStyle
                  : {}
              }
              onMouseEnter={() => handleMouseEnter('/GroomeDashboard')}
              onMouseLeave={handleMouseLeave}
            >
              Groomer
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/adsCordinator"
              eventKey="/adsCordinator"
              style={
                activeLink === '/adsCordinator'
                  ? activeStyle
                  : highlightedLink === '/adsCordinator'
                  ? highlightedStyle
                  : {}
              }
              onMouseEnter={() => handleMouseEnter('/adsCordinator')}
              onMouseLeave={handleMouseLeave}
            >
              Ads Cordinator
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/stockManager"
              eventKey="/stockManager"
              style={
                activeLink === '/stockManager'
                  ? activeStyle
                  : highlightedLink === '/stockManager'
                  ? highlightedStyle
                  : {}
              }
              onMouseEnter={() => handleMouseEnter('/stockManager')}
              onMouseLeave={handleMouseLeave}
            >
              Stock Manager
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/trainingManager"
              eventKey="/trainingManager"
              style={
                activeLink === '/trainingManager'
                  ? activeStyle
                  : highlightedLink === '/trainingManager'
                  ? highlightedStyle
                  : {}
              }
              onMouseEnter={() => handleMouseEnter('/trainingManager')}
              onMouseLeave={handleMouseLeave}
            >
              Training Manager
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-center">
          <Button variant="outline-success" className="mr-sm-2">
            Sign In
          </Button>
          <Button variant="outline-danger">Sign Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;