import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddingProduct from './../pages/AddingProduct';

const StockManagerHeader = () => {
  const [activeLink, setActiveLink] = useState('');
  const [highlightedLink, setHighlightedLink] = useState('');

  const handleSelect = (selectedKey) => setActiveLink(selectedKey);

  const handleMouseEnter = (link) => setHighlightedLink(link);
  const handleMouseLeave = () => setHighlightedLink('');

  return (
    <nav className={`navbar navbar-expand-lg navbar-light header-show`} style={{ backgroundColor: 'white', width: '100%', padding: '10px', transition: 'top 0.5s' }}>
      <div className="container-fluid" style={{ borderBottom: '1px solid #ccc' }}>
        <a className="navbar-brand" href="#">
          <img src="/images/logo.png" alt="Logo" style={{ maxHeight: '100px', marginRight: '10px' }} />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <h2><center>Stock Manager's dashboard</center></h2>
          <div className="offcanvas-body">
            <ul className="navbar-nav mx-auto" style={{ margin: '0 20px' }}>
              <li className="nav-item">
                <Link className={`nav-link active`} to="/AllOrders" style={{ fontSize: '20px', fontWeight: 'bold' }}>Order List</Link>
              </li>
              
            
              <li className="nav-item">
                <Link className={`nav-link`} to="/AddingProduct" style={{ fontSize: '20px', fontWeight: 'bold' }}>Adding Product</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link`} to="/AddedProduct" style={{ fontSize: '20px', fontWeight: 'bold' }}>Product List</Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              
              <div style={{ marginRight: '10px' }}>
                <a href="/"><button className="btn btn-primary me-2" style={{ fontSize: '16px', backgroundColor: 'white', color: 'black', border: '1px solid black' }}>Sign out</button></a>
              </div>
              <div className="dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="icon"></span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                  <li><a className="dropdown-item" href="/MyProfile">My Profile</a></li>
                  
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="#">Sign Out</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default StockManagerHeader;
