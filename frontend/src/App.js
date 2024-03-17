import './App.css';
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
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
        <Route path="/Feedback" element={<Feedback/>} ></Route>    
       </Routes>
        
    </BrowserRouter>
    </div>
  );
}

export default App;
