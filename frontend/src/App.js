import './App.css';
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
<<<<<<< HEAD
import Vetservices from './pages/Vetservices';
import Groomservices from './pages/Groomservices';
import ScheduleAppointment from './pages/ScheduleAppointment';
import AllVetAppointments from './pages/AllVetAppointments';     //This page visible only for vet
import AllGroomeAppointments from './pages/AllGroomeAppointments';  // This page visible only for Groomer
import MyAppointments from './pages/MyAppointments';
=======
import Advertisement from "./pages/Advertisement";
import AddAdvertisement from './pages/AddAdvertisement';
import ConfirmAdvertisement from './pages/ConfirmAdvertisement';
import MyAdvertisements from './pages/MyAdvertisements';
import AllAdvertisements from './pages/AllAdvertisements';
>>>>>>> 4ceec05d3303634f4a4fc052ee8d00e590876183
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from 'antd';
import CheckAdvertisementDetails from './pages/CheckAdvertisementDetails';


<<<<<<< HEAD
=======

>>>>>>> 4ceec05d3303634f4a4fc052ee8d00e590876183
function App() {

  console.log(global);
  return (
    <div>
    <BrowserRouter>
    <Layout />
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Home/>} ></Route>   
        <Route path="/Vetservices" element={<Vetservices/>} ></Route>  
        <Route path="/Groomservices" element={<Groomservices/>} ></Route>
        <Route path="/ScheduleAppointment" element={<ScheduleAppointment/>} ></Route>   
        <Route path="/MyAppointments" element={<MyAppointments/>} ></Route> 
        <Route path="/AllVetAppointments" element={<AllVetAppointments/>} ></Route> 
        <Route path="/AllGroomeAppointments" element={<AllGroomeAppointments/>} ></Route> 
        
        
=======
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/Advertisement" element={<Advertisement/>} ></Route>  
        <Route path="/AddAdvertisement" element={<AddAdvertisement/>} ></Route>
        <Route path="/CheckAdvertisementDetails" element={<CheckAdvertisementDetails/>} ></Route>
        <Route path="/ConfirmAdvertisement" element={<ConfirmAdvertisement/>} ></Route>
        <Route path="/MyAdvertisements" element={<MyAdvertisements/>} ></Route>
        <Route path='/AllAdvertisements' element={<AllAdvertisements/>}></Route>
>>>>>>> 4ceec05d3303634f4a4fc052ee8d00e590876183
       </Routes>
        
    </BrowserRouter>
    </div>
  );
}
export default App;
