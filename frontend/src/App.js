import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from "./pages/Home";
import Feedback from './pages/Feedback';

import TrainingPrograms from './pages/TrainingPrograms';
import PrivateTrainingPrograms from './pages/PrivateTrainingPrograms';
import PrivateTraining from './pages/PrivateTraining';
import AdminTrainingApplication from './pages/AdminTrainingApplication';


import Vetservices from './pages/Vetservices';
import Groomservices from './pages/Groomservices';
import ScheduleAppointment from './pages/ScheduleAppointment';
import AllVetAppointments from './pages/AllVetAppointments';     
import AllGroomeAppointments from './pages/AllGroomeAppointments';  
import MyAppointments from './pages/MyAppointments';
import Advertisement from './pages/Advertisement';
import AddAdvertisement from './pages/AddAdvertisement';
import ConfirmAdvertisement from './pages/ConfirmAdvertisement';
import MyAdvertisements from './pages/MyAdvertisements';
import AllAdvertisements from './pages/AllAdvertisements';

import CheckAdvertisementDetails from './pages/CheckAdvertisementDetails';
import Register from './pages/Register';
import Payerinfo from './pages/Payerinfo';
import Cardpay from './pages/Cardpay'
import Banktrans from './pages/Banktrans';


import StaffRegistrationForm from './pages/StaffRegistrationForm';
import StaffLeaveForm from './pages/StaffLeaveForm';
import StaffSalaryForm from './pages/StaffSalaryForm';
import SignIn from './pages/SignIn';
import UserProfile from './pages/UserProfile';



function App() {
  console.log(global);
  return (
    <div>

    <BrowserRouter>
    <Layout />
      <Routes>
        <Route path="/" element={<Home/>} ></Route> 

        <Route path= "/TrainingPrograms" element={<TrainingPrograms />}></Route>
        <Route path= "/PrivateTrainingPrograms" element={<PrivateTrainingPrograms />}></Route>
        <Route path="/PrivateTraining"  element={<PrivateTraining/>}></Route>
        <Route path="/AdminTrainingApplication" element={<AdminTrainingApplication/>}></Route>


    
        <Route path="/Feedback" element={<Feedback/>} ></Route>    

        <Route path="/Vetservices" element={<Vetservices/>} ></Route>  
        <Route path="/Groomservices" element={<Groomservices/>} ></Route>
        <Route path="/ScheduleAppointment" element={<ScheduleAppointment/>} ></Route>   
        <Route path="/MyAppointments" element={<MyAppointments/>} ></Route> 
        <Route path="/AllVetAppointments" element={<AllVetAppointments/>} ></Route> 
        <Route path="/AllGroomeAppointments" element={<AllGroomeAppointments/>} ></Route> 

        <Route path="/Advertisement" element={<Advertisement/>} ></Route>  
        <Route path="/AddAdvertisement" element={<AddAdvertisement/>} ></Route>
        <Route path="/CheckAdvertisementDetails" element={<CheckAdvertisementDetails/>} ></Route>
        <Route path="/ConfirmAdvertisement" element={<ConfirmAdvertisement/>} ></Route>
        <Route path="/MyAdvertisements" element={<MyAdvertisements/>} ></Route>
        <Route path='/AllAdvertisements' element={<AllAdvertisements/>}></Route>
        <Route path="/Register" element={<Register/>} ></Route>
        <Route path="/SignIn" element={<SignIn/>}></Route>
        <Route path="/UserProfile" element={<UserProfile/>}></Route>
        <Route path="/Payerinfo" element={<Payerinfo/>} ></Route>
        <Route path="/Cardpay" element={<Cardpay/>} ></Route>
        <Route path="/Banktrans" element={<Banktrans/>}></Route>
        <Route path="/StaffRegistrationForm" element={<StaffRegistrationForm/>}></Route>
        <Route path="/StaffLeaveForm" element={<StaffLeaveForm/>}></Route>
        <Route path="/StaffSalaryForm" element={<StaffSalaryForm/>}></Route>
     
       </Routes>

        
    </BrowserRouter>


    </div>
  );
}

export default App;
