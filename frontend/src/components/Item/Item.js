// Item.jsx
import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`} style={{ textDecoration: 'none' }}>
        <img src={props.image} alt="Product" /> {/* Corrected the alt attribute */}
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price">LKR {props.price}</div> {/* Added a space after LKR */}
      </div>
    </div>
  );
}

export default Item;
