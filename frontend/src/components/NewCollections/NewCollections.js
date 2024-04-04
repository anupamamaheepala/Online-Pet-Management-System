import React from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = (props) => {
  return (
    <div className='new-collections'>
      <h1>BEST BRANDS</h1>
      <hr />
      <div className="collections">
      {props.data && Array.isArray(props.data) && props.data.map((item, i) => (
          <Item id={item.id} key={i} name={item.name} image={item.image} price={item.price} />
        ))}
      </div>
    </div>
  )
}

export default NewCollections
