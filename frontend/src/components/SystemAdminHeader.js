import React from 'react';
import { Dropdown, Navbar, Nav } from 'react-bootstrap';
import '../css/systemadminheader.css'; // Import the CSS file

const SystemAdminHeader = () => {
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Navbar.Brand href="/Sysmanagerhome">System Manager</Navbar.Brand>
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
              <Dropdown.Item href="/StaffRegistrationForm">Register Staff</Dropdown.Item>
              <Dropdown.Item href="/StaffList">Staff List</Dropdown.Item>
              <Dropdown.Item href="/SalaryTable">Salary Table</Dropdown.Item>
              <Dropdown.Item href="/StaffLeaveList">Staff Leave List</Dropdown.Item>
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
              <Dropdown.Item href="/feedbackadmindisplay">All Feedbacks</Dropdown.Item>
              <Dropdown.Item href="/feedbackadmininquiry">All Inquiry</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
              Services
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/Services">Add a New Service</Dropdown.Item>
              <Dropdown.Item href="/ViewServices">View Available Services</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SystemAdminHeader;
