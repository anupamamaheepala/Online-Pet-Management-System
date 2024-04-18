import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    const [activeLink, setActiveLink] = useState('');

    const handleSelect = (selectedKey) => setActiveLink(selectedKey);

    const activeStyle = {
        fontWeight: 'bold',
        color: 'black' // Change this to your desired color
    };

    return (
        <Navbar bg="light" expand="lg" onSelect={handleSelect}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/systemAdmin" eventKey="/systemAdmin" style={activeLink === "/systemAdmin" ? activeStyle : {}}>System Admin</Nav.Link>
                    <Nav.Link as={Link} to="/VetDashboard" eventKey="/VetDashboard" style={activeLink === "/VetDashboard" ? activeStyle : {}}>Veterinarian</Nav.Link>
                    <Nav.Link as={Link} to="/groomer" eventKey="/groomer" style={activeLink === "/groomer" ? activeStyle : {}}>Groomer</Nav.Link>
                    <Nav.Link as={Link} to="/adsCordinator" eventKey="/adsCordinator" style={activeLink === "/adsCordinator" ? activeStyle : {}}>Ads Cordinator</Nav.Link>
                    <Nav.Link as={Link} to="/stockManager" eventKey="/stockManager" style={activeLink === "/stockManager" ? activeStyle : {}}>Stock Manager</Nav.Link>
                    <Nav.Link as={Link} to="/trainingManager" eventKey="/trainingManager" style={activeLink === "/trainingManager" ? activeStyle : {}}>Training Manager</Nav.Link>
                </Nav>
                <Button variant="outline-success" className="mr-sm-2">Sign In</Button>
                <Button variant="outline-danger">Sign Out</Button>
            </Navbar.Collapse>
            
        </Navbar>
        
    );
}

export default AdminHeader;
