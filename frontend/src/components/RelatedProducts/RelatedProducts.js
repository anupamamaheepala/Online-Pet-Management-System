import React from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import data_product from '../Assests/Data'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_product.map((item)=>{
            return <Item id={item.id} name={item.name} image={item.image}  price={item.price} />
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
