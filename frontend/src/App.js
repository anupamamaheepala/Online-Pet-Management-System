import './App.css';
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Vetservices from './pages/Vetservices';
import Groomservices from './pages/Groomservices';
import ScheduleAppointment from './pages/ScheduleAppointment';
import MyAppointments from './pages/MyAppointments';
import ViewAllAppointments from './pages/ViewAllAppointments';
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
        <Route path="/Vetservices" element={<Vetservices/>} ></Route>  
        <Route path="/Groomservices" element={<Groomservices/>} ></Route>
        <Route path="/ScheduleAppointment" element={<ScheduleAppointment/>} ></Route>   
        <Route path="/MyAppointments" element={<MyAppointments/>} ></Route> 
        <Route path="/ViewAllAppointments" element={<ViewAllAppointments/>} ></Route> 
       </Routes>
        
    </BrowserRouter>
    </div>
  );
}
export default App;
