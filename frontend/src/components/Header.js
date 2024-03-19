import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPersonFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [showHeader, setShowHeader] = useState(true);
    const [activeMenuItem, setActiveMenuItem] = useState('Home');
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const path = location.pathname.split('/')[1]; // Extracting the first part of the path
        setActiveMenuItem(path || 'Home'); // If path is empty, set it to 'Home'
    }, [location]);

    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${showHeader ? 'header-show' : 'header-hide'}`} style={{ backgroundColor: 'white', width: '100%', padding: '10px', transition: 'top 0.5s' }}>
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
                    <div className="offcanvas-body">
                        <ul className="navbar-nav mx-auto" style={{ margin: '0 20px' }}>
                            <li className="nav-item">
                                <Link className={`nav-link ${activeMenuItem === 'Home' ? 'active' : ''}`} to="/" style={{ fontSize: '20px', fontWeight: activeMenuItem === 'Home' ? 'bold' : 'normal' }}>Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className={`nav-link dropdown-toggle ${activeMenuItem === 'Services' ? 'active' : ''}`} to="/Services" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: '20px', fontWeight: activeMenuItem === 'Services' ? 'bold' : 'normal' }}>
                                    Services
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/Vetservices">Vet Services</Link></li>
                                    <li><Link className="dropdown-item" to="/Groomservices">Groome Services</Link></li>
                                    <li><Link className="dropdown-item" to="/TrainingPrograms">Training Services</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${activeMenuItem === 'Store' ? 'active' : ''}`} to="/ProductCatalog" style={{ fontSize: '20px', fontWeight: activeMenuItem === 'Store' ? 'bold' : 'normal' }}>Store</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${activeMenuItem === 'Advertisements' ? 'active' : ''}`} to="/Advertisement" style={{ fontSize: '20px', fontWeight: activeMenuItem === 'Advertisements' ? 'bold' : 'normal' }}>Advertisements</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${activeMenuItem === 'Feedback' ? 'active' : ''}`} to="/Feedback" style={{ fontSize: '20px', fontWeight: activeMenuItem === 'Feedback' ? 'bold' : 'normal' }}>FAQ</Link>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <button className="btn btn-outline-primary me-2" style={{ fontSize: '16px' }}>Sign In</button>
                            <div style={{ marginRight: '10px' }}>
                                <button className="btn btn-primary me-2" style={{ fontSize: '16px' }}>Signup</button>
                            </div>
                            <div className="dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    <BsPersonFill size={40} style={{ border: '1px solid #ccc', borderRadius: '50%', padding: '2px' }} />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                                    <li><a className="dropdown-item" href="#">My Profile</a></li>
                                    <li><a className="dropdown-item" href="/MyAppointments">My Appointments</a></li>
                                    <li><a className="dropdown-item" href="#">My Cart</a></li>
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

export default Header;
