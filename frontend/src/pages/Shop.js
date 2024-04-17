import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Offers from './../components/Offers/Offers';
import NewsLetter from '../components/NewsLetter/NewsLetter';


const Shop = () => {
  return (
    
   <>
   <Header/> 
    
    <div>
      <Navbar/>
     
      <Offers/>
    
      <NewsLetter/>
    
    </div>
    <Footer/>
    </>
    
    
  )
}

export default Shop
