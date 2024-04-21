import React from 'react';
import { Dropdown, Navbar, Nav } from 'react-bootstrap';
import '../css/systemadminheader.css'; // Import the CSS file

const SystemAdminHeader = () => {
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Navbar.Brand href="#home">System Admin</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Dropdown>
            <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
              Users
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/allCustomers">All Customers</Dropdown.Item>
              <Dropdown.Item href="/all-pets">All Pets</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
              Staff
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/register-staff">Register Staff</Dropdown.Item>
              <Dropdown.Item href="#/staff-list">Staff List</Dropdown.Item>
              <Dropdown.Item href="#/salary-table">Salary Table</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
              Payments
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/Cardpayadmin">All Card Payments</Dropdown.Item>
              <Dropdown.Item href="/Banktransadmin">All Bank Transfers</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
              Feedback
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/reply-inquiry">Reply Inquiry</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
              Services
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/add-new-service">Add a New Service</Dropdown.Item>
              <Dropdown.Item href="#/view-available-services">View Available Services</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SystemAdminHeader;
