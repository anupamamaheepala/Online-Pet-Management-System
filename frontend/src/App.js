import './App.css';
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from 'antd';
import StaffRegistrationForm from "./pages/StaffRegistrationForm";
import StaffLeaveForm from './pages/StaffLeaveForm';
import StaffSalaryForm from './pages/StaffSalaryForm';

//import PublicRoute from "./components/publicroute";
//import { Toaster } from "react-hot-toast";

function App() {

  console.log(global);
  return (
    <div>
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} ></Route>    
        <Route path="/register" element={<StaffRegistrationForm />} />
        <Route path="/StaffLeave" element={<StaffLeaveForm />} />
        <Route path="/StaffSalary" element={<StaffSalaryForm />} />
       </Routes>
      </Layout> 
    </BrowserRouter>
    </div>
  );
}

export default App;

