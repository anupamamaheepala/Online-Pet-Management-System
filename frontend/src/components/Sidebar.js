import React, { useState } from 'react';
import sidebar from '../css/sidebar.css';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="toggle-icon" onClick={toggleDrawer}>
        <img src="toggle-icon.png" alt="Toggle Icon" />
      </div>
      <ul>
        <li>
          <img src="icon1.png" alt="Icon 1" />
          <span>Item 1</span>
        </li>
        <li>
          <img src="icon2.png" alt="Icon 2" />
          <span>Item 2</span>
        </li>
        <li>
          <img src="icon3.png" alt="Icon 3" />
          <span>Item 3</span>
        </li>
        {/* Add more items as needed */}
      </ul>
    </div>
  );
}

export default Sidebar;
