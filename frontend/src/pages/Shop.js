import React from 'react'
import Hero from '../components/Hero/Hero'
import Navbar from '../components/Navbar/Navbar';
import Popular from './../components/Popular/Popular';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewCollections from '../components/NewCollections/NewCollections';
import Offers from './../components/Offers/Offers';
import NewsLetter from '../components/NewsLetter/NewsLetter';


const Shop = () => {
  return (
    
   <>
   <Header/> 
    
    <div>
      <Navbar/>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
    
    </div>
    <Footer/>
    </>
    
    
  )
}

export default Shop
