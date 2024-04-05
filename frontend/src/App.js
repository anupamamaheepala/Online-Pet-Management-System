import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./pages/Home";
import Feedback from './pages/Feedback';
import FeedbackDisplay from './pages/FeedbackDisplay';
import FeedbackAdminDisplay from './pages/FeedbackAdminDisplay';
import Vetservices from './pages/Vetservices';
import Groomservices from './pages/Groomservices';
import Makeappointment from './pages/Makeappointment';
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
import Cardpay from './pages/Cardpay';
import Banktrans from './pages/Banktrans';
import StaffRegistrationForm from './pages/StaffRegistrationForm';
import StaffList from './pages/StaffList';
import StaffLeaveForm from './pages/StaffLeaveForm';
import StaffSalaryForm from './pages/StaffSalaryForm';
import StaffLeaveList from './pages/StaffLeaveList';
import SignIn from './pages/SignIn';
import UserProfile from './pages/UserProfile';
import TrainingPrograms from './pages/TrainingPrograms';
import PrivateTrainingPrograms from './pages/PrivateTrainingPrograms';
import PrivateTraining from './pages/PrivateTraining';
import TrainingDashboard from './pages/TrainingDashboard';
import PrivateTrainingDetails from './pages/PrivateTrainingDetails';
import Shop from './pages/Shop';
import AllCustomers from './pages/AllCustomers';
import EditCustomer from './pages/EditCustomer';
import banner from './components/Assests/banner.png';
import ShopCategory from './pages/ShopCategory';
import AddedProduct from './pages/AddedProduct';
import AddingProduct from './pages/AddingProduct';
import Paystatus from './pages/Paystatus';

import OrderForm from './pages/OrderForm';


function App() {
  console.log(global);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TrainingPrograms" element={<TrainingPrograms />} />
          <Route path="/PrivateTrainingPrograms" element={<PrivateTrainingPrograms />} />
          <Route path="/PrivateTraining" element={<PrivateTraining />} />
          <Route path="/TrainingDashboard" element={<TrainingDashboard />} />
          <Route path="/training/:id" element={<PrivateTrainingDetails />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/FeedbackDisplay" element={<FeedbackDisplay />} />
          <Route path="/FeedbackAdminDisplay" element={<FeedbackAdminDisplay />} />
          <Route path="/Vetservices" element={<Vetservices />} />
          <Route path="/Groomservices" element={<Groomservices />} />
          <Route path="/Makeappointment" element={<Makeappointment />} />
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
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Payerinfo" element={<Payerinfo />} />
          <Route path="/Cardpay" element={<Cardpay />} />
          <Route path="/Banktrans" element={<Banktrans />} />
          <Route path="/StaffRegistrationForm" element={<StaffRegistrationForm />} />
          <Route path="/StaffList" element={<StaffList />} />
          <Route path="/StaffLeaveForm" element={<StaffLeaveForm />} />
          <Route path="/StaffSalaryForm" element={<StaffSalaryForm />} />
          <Route path="/StaffLeaveList" element={<StaffLeaveList />} />
          <Route path="/AllCustomers" element={<AllCustomers />} />
          <Route path="/edit/:id" element={<EditCustomer />} />
          <Route path="/EditCustomer" element={<EditCustomer />} />
          <Route path="/Store" element={<Shop />} />
          <Route path="/Foods" element={<ShopCategory banner={banner} category="Foods" />} />
          <Route path="/Medicines" element={<ShopCategory banner={banner} category="Medicines" />} />
          <Route path="/Toys and Accessories" element={<ShopCategory banner={banner} category="Toys and Accessories" />} />
          <Route path="/AddingProduct" element={<AddingProduct/>} ></Route>
          <Route path="/AddedProduct" element={<AddedProduct/>} ></Route>
          <Route path="/Paystatus" element={<Paystatus/>} ></Route>
          <Route path="/OrderForm" element={<OrderForm />} ></Route>

       </Routes>

        
    </BrowserRouter>



          
    </div>
  );
}

export default App;
