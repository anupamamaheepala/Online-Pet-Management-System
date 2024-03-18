import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import Feedback from './pages/Feedback';
import Traininga from './pages/Traininga';
import Trainingb from './pages/Trainingb';
import Privatea from './pages/Privatea';
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
import StaffRegistrationForm from './pages/StaffRegistrationForm';
import StaffLeaveForm from './pages/StaffLeaveForm';
import StaffSalaryForm from './pages/StaffSalaryForm';
import CheckAdvertisementDetails from './pages/CheckAdvertisementDetails';
import Register from './pages/Register';
import Payerinfo from './pages/Payerinfo';
import Cardpay from './pages/Cardpay';
import Banktrans from './pages/Banktrans';

function App() {
  console.log(global);
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<StaffRegistrationForm />} />
            <Route path="/StaffLeave" element={<StaffLeaveForm />} />
            <Route path="/StaffSalary" element={<StaffSalaryForm />} />
            <Route path="/Traininga" element={<Traininga />} />
            <Route path="/Trainingb" element={<Trainingb />} />
            <Route path="/Privatea" element={<Privatea />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="/Vetservices" element={<Vetservices />} />
            <Route path="/Groomservices" element={<Groomservices />} />
            <Route path="/ScheduleAppointment" element={<ScheduleAppointment />} />
            <Route path="/MyAppointments" element={<MyAppointments />} />
            <Route path="/AllVetAppointments" element={<AllVetAppointments />} />
            <Route path="/AllGroomeAppointments" element={<AllGroomeAppointments />} />
            <Route path="/Advertisement" element={<Advertisement />} />
            <Route path="/AddAdvertisement" element={<AddAdvertisement />} />
            <Route path="/CheckAdvertisementDetails" element={<CheckAdvertisementDetails />} />
            <Route path="/ConfirmAdvertisement" element={<ConfirmAdvertisement />} />
            <Route path="/MyAdvertisements" element={<MyAdvertisements />} />
            <Route path="/AllAdvertisements" element={<AllAdvertisements />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Payerinfo" element={<Payerinfo />} />
            <Route path="/Cardpay" element={<Cardpay />} />
            <Route path="/Banktrans" element={<Banktrans />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
