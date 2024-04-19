import React, { useRef, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import cart_icon from '../Assests/cart_icon.png';

const Navbar = () => {
  const [menu, setMenu] = useState("Shop");
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className='nav'>
      <Link to='/' onClick={() => { setMenu("Shop") }} style={{ textDecoration: 'none' }} className="nav-logo"></Link>
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("Shop") }}><Link to='/Shop' style={{ textDecoration: 'none' }}>Shop</Link>{menu === "Shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Foods") }}><Link to='/Foods' style={{ textDecoration: 'none' }}>Foods</Link>{menu === "Foods" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Medicines") }}><Link to='/Medicines' style={{ textDecoration: 'none' }}>Medicines</Link>{menu === "Medicines" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Toys and Accessories") }}><Link to='/Toys and Accessories' style={{ textDecoration: 'none' }}>Toys and Accessories</Link>{menu === "Toys and Accessories" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ?
          <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/"); }}>Logout</button> :
          null}
        <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
      </div>
    </div>
  )
}

export default Navbar;
