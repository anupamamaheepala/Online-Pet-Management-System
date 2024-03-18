import { Layout } from 'antd';
import React from 'react';



const ProductDescription = () => {

    const products = [
        {
        id: 1,
        name: "Dog Food",
        description: "Premium quality dog food for all breeds and sizes.'Drools' is a term often used to describe a dog's anticipation and excitement for food, especially when they begin to salivate in anticipation of mealtime. It can also refer to the dribbling or dripping of saliva from a dog's mouth when they are particularly eager for food. In the context of a dog food brand called 'Dog Food Drools,' one might imagine a marketing campaign emphasizing the irresistible appeal of the food to dogs, highlighting their enthusiastic response and eager anticipation at mealtime. The brand might emphasize high-quality ingredients, appealing flavors, and nutritional benefits to further entice pet owners to choose their product for their furry companions.",
        price: "$25",
        image: "images/Drools.png"
    },
    ];

   
    return (
        <Layout>
        <div className="product-description">
        <div className="search-bar">
            <input type="text" placeholder="Search products" />
            <button className="search-button">Search</button>
            <button className="cart-button">Cart</button>
        </div>
       
        <div className="product-grid">
        {products.map(product => (
            <div key={product.id} className="product-item">
                <img  src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Price: {product.price}</p>
            
                    <button className="add-to-cart-button">Add to Cart</button>
                </div>
            </div>
        ))}
</div>
</div>
        </Layout>
    );
}

export default ProductDescription;