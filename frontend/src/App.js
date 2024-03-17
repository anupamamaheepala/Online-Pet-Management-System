import './App.css';
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Traininga from "./pages/Traininga";
import Trainingb from './pages/Trainingb';
import Privatea from './pages/Privatea';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from 'antd';

//import PublicRoute from "./components/publicroute";
//import { Toaster } from "react-hot-toast";

function App() {

  console.log(global);
  return (
    <div>
    <BrowserRouter>
    <Layout />
      <Routes>
        <Route path="/" element={<Home/>} ></Route> 
        <Route path= "/services/training" element={<Traininga />}></Route>
        <Route path= "/pages/trainingb" element={<Trainingb />}></Route>
        <Route path="/pages/privatea"  element={<Privatea/>}></Route>
       </Routes>
        
    </BrowserRouter>
    </div>
  );
}

export default App;
