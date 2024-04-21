
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from "./pages/Home";

import Feedback from './pages/Feedback';
import FeedbackDisplay from './pages/FeedbackDisplay';
import FeedbackAdminDisplay from './pages/FeedbackAdminDisplay';
import FeedbackInquiry from './pages/FeedbackInquiry';
import FAQselect from './pages/FAQselect';
import FeedbackRating from './pages/FeedbackRating';
import FeedbackadminInquiry from './pages/FeedbackadminInquiry';
import FeedbackReply from './pages/FeedbackReply';
import FeedbackReplyForm from './pages/FeedbackReplyForm';
import Services from './pages/Services';
import ViewServices from './pages/ViewServices';
import Vetservices from './pages/Vetservices';
import Groomservices from './pages/Groomservices';
import Makeappointment from './pages/Makeappointment';
import VetDashboard from './pages/VetDashboard';
import VetNotifications from './pages/VetNotifications';
import AllVetAppointments from './pages/AllVetAppointments';
import GenerateVetReport from './pages/GenerateVetReport';
import GroomeDashboard from './pages/GroomeDashboard';
import GroomeNotifications from './pages/GroomeNotifications';
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
import MyProfile from './pages/MyProfile';
import TrainingPrograms from './pages/TrainingPrograms';
import PrivateTrainingPrograms from './pages/PrivateTrainingPrograms';
import PrivateTraining from './pages/PrivateTraining';
import TrainingDashboard from './pages/TrainingDashboard';
import PrivateTrainingDetails from './pages/PrivateTrainingDetails';
import StepForm from './pages/StepForm';


import Shop from './pages/Shop';

import AllCustomers from './pages/AllCustomers';
import banner from './components/Assests/banner.png';
import ShopCategory from './pages/ShopCategory';
import AddedProduct from './pages/AddedProduct';
import AddingProduct from './pages/AddingProduct';
import StaffProfile from './pages/StaffProfile';
import OrderForm from './pages/OrderForm';
import AllOrders from './pages/AllOrders';
import ViewApplication from './pages/ViewApplication';
import ResetPassword from './pages/ResetPassword';
import EditProfile from './pages/EditProfile';
import Paystatus from './pages/Paystatus';
import UpdateStaff from './pages/UpdateStaff';
import Editpayinfo from './pages/Editpayinfo';
import PetProfile from './pages/PetProfile';
import MyPets from './pages/MyPets';
import AddPet from './pages/AddPet';
import Banktransadmin from './pages/Banktransadmin';
import EditPetProfile from './pages/EditPetProfile';
import AllPets from './pages/AllPets';
import Cardpaysuccess from './pages/Cardpaysuccess';
import UpdateSalary from './pages/UpdateSalary';
import SalaryTable from './pages/SalaryTable';
import { CartProvider } from './Context/CartContext';
import Cardpayadmin from './pages/Cardpayadmin';
import AddToCartPage from './pages/Cart';
import EditProduct from './pages/EditProduct';
import StaffLogin from './pages/StaffLogin';
import EditAdvertisement from './pages/EditAdvertisement';

function App() {
  return (
    <div>
      <Router>
        <CartProvider>
          <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/TrainingPrograms" element={<TrainingPrograms />} />
          <Route path="/PrivateTrainingPrograms" element={<PrivateTrainingPrograms />} />
          <Route path="/PrivateTraining" element={<PrivateTraining />} />
          <Route path="/TrainingDashboard" element={<TrainingDashboard />} />
          <Route path="/training/:id" element={<PrivateTrainingDetails />} />

          <Route path="/:id" element={<ViewApplication/>}/>
          <Route path="/StepForm" element={<StepForm/>}/>
          <Route path="/training/application:id" element={<ViewApplication/>}/>


          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/FeedbackDisplay" element={<FeedbackDisplay />} />
          <Route path="/FeedbackInquiry" element={<FeedbackInquiry />} />
          <Route path="/FeedbackAdminDisplay" element={<FeedbackAdminDisplay />} />
          <Route path="/FeedbackAdminDisplay" element={<FeedbackAdminDisplay />} /> 
          <Route path="/FAQselect" element={<FAQselect />} />
          <Route path="/FeedbackRating" element={<FeedbackRating />} />
          <Route path="/FeedbackadminInquiry" element={<FeedbackadminInquiry />} />
          <Route path="/FeedbackReply/:_id/:name/:email/:feedback" element={<FeedbackReply />} />
<<<<<<< HEAD
          <Route path="/FeedbackReplyForm" element={<FeedbackReplyForm />} />
          <Route path="/FeedbackReplyForm/:_id/:feedback" element={<FeedbackReplyForm />} />

=======

          <Route path="/FeedbackReplyForm" element={<FeedbackReplyForm />} />

          <Route path="/FeedbackReplyForm/:_id/:feedback" element={<FeedbackReplyForm />} />


>>>>>>> a972e274c2befa96e3aa246246d5fb106558bfb4
          <Route path='/Services' element = {<Services />}/>
          <Route path='/ViewServices' element = {<ViewServices />}/>
          <Route path="/Vetservices" element={<Vetservices />} />
          <Route path="/Groomservices" element={<Groomservices />} />
          <Route path="/Makeappointment" element={<Makeappointment />} />
          <Route path="/MyAppointments" element={<MyAppointments />} />
          <Route path="/VetDashboard" element={<VetDashboard />} />
          <Route path="/VetNotifications" element={<VetNotifications />} />
          <Route path="/AllVetAppointments" element={<AllVetAppointments />} />
          <Route path="/GenerateVetReport" element={<GenerateVetReport />} />
          <Route path="/GroomeDashboard" element={<GroomeDashboard />} />
          <Route path="/GroomeNotifications" element={<GroomeNotifications />} />
          <Route path="/AllGroomeAppointments" element={<AllGroomeAppointments />} />
          <Route path="/Advertisement" element={<Advertisement />} />
          <Route path="/AddAdvertisement" element={<AddAdvertisement />} />
          <Route path="/CheckAdvertisementDetails" element={<CheckAdvertisementDetails />} />
          <Route path="/ConfirmAdvertisement" element={<ConfirmAdvertisement />} />
          <Route path="/MyAdvertisements" element={<MyAdvertisements />} />
          <Route path="/AllAdvertisements" element={<AllAdvertisements />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/MyProfile/:customerId" element={<MyProfile />} />
          <Route path="/Payerinfo" element={<Payerinfo />} />
          <Route path="/Cardpay" element={<Cardpay />} />
          <Route path="/Banktrans" element={<Banktrans />} />
          <Route path="/StaffRegistrationForm" element={<StaffRegistrationForm />} />
          <Route path="/StaffList" element={<StaffList />} />
          <Route path="/StaffLeaveForm/:staffId" element={<StaffLeaveForm />} />
          <Route path="/salary/:staffId" element={<StaffSalaryForm />} />
          <Route path="/StaffLeaveList" element={<StaffLeaveList />} />
          <Route path="/AllCustomers" element={<AllCustomers />} />
          <Route path="/Store" element={<Shop />} />
          <Route path="/Foods" element={<ShopCategory banner={banner} category="Foods" />} />
          <Route path="/Medicines" element={<ShopCategory banner={banner} category="Medicines" />} />
          <Route path="/Toys And Accessories" element={<ShopCategory banner={banner} category="Toys and Accessories" />} />
          <Route path="/AddingProduct" element={<AddingProduct />} />
          <Route path="/AddedProduct" element={<AddedProduct />} />
          <Route path="/product" element={<ShopCategory />}>
          </Route>
          <Route path="/staff/profile/:id" element={<StaffProfile />} />
          <Route path="/update/:staffId" element={<UpdateStaff />} />
          <Route path="/Paystatus" element={<Paystatus />} />
          <Route path="/OrderForm" element={<OrderForm />} />
          <Route path="/AllOrders" element={<AllOrders />} />
          <Route path="/Editpayinfo" element={<Editpayinfo />} />
          <Route path="/reset-password/:customerId" element={<ResetPassword />} />
          <Route path="/edit-profile/:customerId" element={<EditProfile />} />
          <Route path="/my-pets/:customerId" element={<MyPets />} />
          <Route path="/pet-profile/:petId" element={<PetProfile />} />
          <Route path="/addpet/:customerId" element={<AddPet />} />
          <Route path="/Banktransadmin" element={<Banktransadmin />} />
          <Route path="/pets/:petId/edit" element={<EditPetProfile/>} />
          <Route path="/all-pets" element={<AllPets />} />
          <Route path="/Cardpaysuccess" element={<Cardpaysuccess />} /> 
          <Route path="/update-salary"  element={<UpdateSalary/>} />
          <Route path="/SalaryTable"  element={<SalaryTable/>} />
          <Route path="/Cardpayadmin"  element={<Cardpayadmin/>} />
          <Route path="/Cart"  element={<AddToCartPage/>} />
          <Route path="/editproduct/:productId" element={<EditProduct />} />
          <Route path="/StaffLogin" element={<StaffLogin />} />
          <Route path="/editadvertisement/:advertisementId" element={<EditAdvertisement />} />

          </Routes>
        </CartProvider>
      </Router>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;

