import './App.css';
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import VetServices from "./pages/vetservices"; 
import GroomServices from "./pages/groomeservices"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from 'antd';

function App() {
  console.log(global);
  return (
    <div>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<Home/>} ></Route>  
          <Route path="/vetservices" element={<VetServices/>} ></Route>  
          <Route path="/groomeservices" element={<GroomServices/>} ></Route>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
