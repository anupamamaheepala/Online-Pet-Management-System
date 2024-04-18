import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const AdminHeader = () => {
    return (
        <Navbar bg="light" expand="lg">
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#systemAdmin">System Admin</Nav.Link>
                    <Nav.Link href="/VetDashboard">Veterinarian</Nav.Link>
                    <Nav.Link href="#groomer">Groomer</Nav.Link>
                    <Nav.Link href="#adsCordinator">Ads Cordinator</Nav.Link>
                    <Nav.Link href="#stockManager">Stock Manager</Nav.Link>
                    <Nav.Link href="#trainingManager">Training Manager</Nav.Link>
                </Nav>
                <Button variant="outline-success" className="mr-sm-2">Sign In</Button>
                <Button variant="outline-danger">Sign Out</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AdminHeader;
