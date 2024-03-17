import React from 'react';
import Layout from '../components/Layout';
import '../css/Trainingprogram.css';
import { Link } from 'react-router-dom';

const Trainingb = () => {
    // Sample data for products
    const products = [
        {
            id: 1,
            name: "PRIVATE DOG TRAINING",
            description: "Get & Stay Fit With The Best Workout Buddy Ever!",
            price: "$25",
            image: "/images/hd1.png"
        },
        {
            id: 2,
            name: "PRIVATE CANINE & HUMAN FITNESS TRAINING",
            description: "A set of interactive toys to keep your cat entertained.",
            price: "$15",
            image: "/images/hd2.png"
        },
        {
            id: 3,
            name: "PRIVATE CANINE FITNESS TRAINING",
            description: "Help Your Dog Lose Weight, Gain Strength, Burn Energy & More.",
            price: "$40",
            image: "/images/hd3.png"
        }
    ];

    return (
        <Layout>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">Price: {product.price}</p>
                            <div className="row justify-content-center"> {/* Wrap buttons in a row and center them */}
                                <div className="col">
                                    <a href='/privatea'>
                                    <button className="add-button">Apply</button>
                                    </a>
                                </div>
                                <div className="col-auto"> {/* Use col-auto to automatically size the gap */}
                                    &nbsp; {/* Add an empty space as the gap */}
                                </div>
                                <div className="col">
                                    <button className="add-button">Learn more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default Trainingb;
