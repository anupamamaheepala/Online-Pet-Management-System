import './App.css';
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import Traininga from './pages/Traininga';
import Trainingb from './pages/Trainingb';
import Privatea from './pages/Privatea';
import 'bootstrap/dist/css/bootstrap.min.css';

import Vetservices from './pages/Vetservices';
import Groomservices from './pages/Groomservices';
import ScheduleAppointment from './pages/ScheduleAppointment';
import AllVetAppointments from './pages/AllVetAppointments';     //This page visible only for vet
import AllGroomeAppointments from './pages/AllGroomeAppointments';  // This page visible only for Groomer
import MyAppointments from './pages/MyAppointments';
import Advertisement from "./pages/Advertisement";
import AddAdvertisement from './pages/AddAdvertisement';
import ConfirmAdvertisement from './pages/ConfirmAdvertisement';
import MyAdvertisements from './pages/MyAdvertisements';
import AllAdvertisements from './pages/AllAdvertisements';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from 'antd';
import CheckAdvertisementDetails from './pages/CheckAdvertisementDetails';

import Register from './pages/Register';

import Payerinfo from './pages/Payerinfo';
import Cardpay from './pages/Cardpay'


function App() {

  console.log(global);
  return (
    <div>
    <BrowserRouter>
    <Layout />
      <Routes>
        <Route path="/" element={<Home/>} ></Route> 
        <Route path= "/Traininga" element={<Traininga />}></Route>
        <Route path= "/Trainingb" element={<Trainingb />}></Route>
        <Route path="/Privatea"  element={<Privatea/>}></Route>

        <Route path="/" element={<Home/>} ></Route>
        <Route path="/Feedback" element={<Feedback/>} ></Route>    


        <Route path="/" element={<Home/>} ></Route>   
        <Route path="/Vetservices" element={<Vetservices/>} ></Route>  
        <Route path="/Groomservices" element={<Groomservices/>} ></Route>
        <Route path="/ScheduleAppointment" element={<ScheduleAppointment/>} ></Route>   
        <Route path="/MyAppointments" element={<MyAppointments/>} ></Route> 
        <Route path="/AllVetAppointments" element={<AllVetAppointments/>} ></Route> 
        <Route path="/AllGroomeAppointments" element={<AllGroomeAppointments/>} ></Route> 

        <Route path="/" element={<Home/>} ></Route>
        <Route path="/Advertisement" element={<Advertisement/>} ></Route>  
        <Route path="/AddAdvertisement" element={<AddAdvertisement/>} ></Route>
        <Route path="/CheckAdvertisementDetails" element={<CheckAdvertisementDetails/>} ></Route>
        <Route path="/ConfirmAdvertisement" element={<ConfirmAdvertisement/>} ></Route>
        <Route path="/MyAdvertisements" element={<MyAdvertisements/>} ></Route>
        <Route path='/AllAdvertisements' element={<AllAdvertisements/>}></Route>


        <Route path="/Register" element={<Register/>} ></Route>
        
        <Route path="/Payerinfo" element={<Payerinfo/>} ></Route>
        <Route path="/Cardpay" element={<Cardpay/>} ></Route>

       </Routes>

        
    </BrowserRouter>
    </div>
  );
}
export default App;
