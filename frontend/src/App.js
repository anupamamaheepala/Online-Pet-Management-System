import './App.css';
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Advertisement from "./pages/Advertisement";
import AddAdvertisement from './pages/AddAdvertisement';
import ConfirmAdvertisement from './pages/ConfirmAdvertisement';
import MyAdvertisements from './pages/MyAdvertisements';
import AllAdvertisements from './pages/AllAdvertisements';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from 'antd';
import CheckAdvertisementDetails from './pages/CheckAdvertisementDetails';



function App() {

  console.log(global);
  return (
    <div>
    <BrowserRouter>
    <Layout />
      <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/Advertisement" element={<Advertisement/>} ></Route>  
        <Route path="/AddAdvertisement" element={<AddAdvertisement/>} ></Route>
        <Route path="/CheckAdvertisementDetails" element={<CheckAdvertisementDetails/>} ></Route>
        <Route path="/ConfirmAdvertisement" element={<ConfirmAdvertisement/>} ></Route>
        <Route path="/MyAdvertisements" element={<MyAdvertisements/>} ></Route>
        <Route path='/AllAdvertisements' element={<AllAdvertisements/>}></Route>
       </Routes>
        
    </BrowserRouter>
    </div>
  );
}

export default App;
