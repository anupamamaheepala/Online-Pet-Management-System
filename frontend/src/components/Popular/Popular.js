import React from 'react';
import './Popular.css';
import Item from '../Item/Item';

function Popular(props) {
  return (
    <div className='popular'>
      <h1>POPULAR IN PETS</h1>
      <hr />
      <div className="popular-item">
        {props.data && Array.isArray(props.data) && props.data.map((item, i) => (
          <Item id={item.id} key={i} name={item.name} image={item.image} price={item.price} />
        ))}
      </div>
    </div>
  );
}

export default Popular;


