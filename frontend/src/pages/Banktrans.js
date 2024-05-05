// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useLocation } from 'react-router-dom';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';
// // import '../css/banktrans.css';

// // const Banktrans = () => {
// //   const location = useLocation();
// //   const [payerId, setPayerId] = useState('');
// //   const [bankName, setBankName] = useState('');
// //   const [branchName, setBranchName] = useState('');
// //   const [depositSlip, setDepositSlip] = useState(null);
// //   const [errorMessage, setErrorMessage] = useState('');

// //   useEffect(() => {
// //     const searchParams = new URLSearchParams(location.search);
// //     const id = searchParams.get('payerId');
// //     if (id) {
// //       setPayerId(id);
// //     }
// //   }, [location.search]);

// //   const onInputChange = (e) => {
// //     const file = e.target.files[0];
// //     setDepositSlip(file);
// //   };

// //   const onSubmit = async (e) => {
// //     e.preventDefault();
  
// //     if (!payerId || !bankName || !branchName || !depositSlip) {
// //       setErrorMessage('Please fill in all required fields');
// //       return;
// //     }
  
// //     try {
// //       const formData = new FormData();
// //       formData.append('payerId', payerId);
// //       formData.append('bankName', bankName);
// //       formData.append('branchName', branchName);
// //       formData.append('depositSlip', depositSlip);
  
// //       const response = await axios.post(
// //         "http://localhost:9000/banktrans/bpay",
// //         formData,
// //         {
// //           headers: { 'Content-Type': 'multipart/form-data' },
// //         }
// //       );
// //       console.log('Bank transaction added: ', response.data);
      
// //       // Reset the form values after successful submission
// //       setBankName('');
// //       setBranchName('');
// //       setDepositSlip(null);
// //       setErrorMessage('');
      
// //       // Navigate to the home page
// //       window.location.href = '/';
  
// //     } catch (error) {
// //       console.error('Error adding bank transaction: ', error);
// //       // handle error...
// //     }
// //   };
  
// //   return (
// //     <>
// //       <Header />
// //       <div className="anubank-transfer">
// //         <h2>Bank Transfer</h2>
// //         <form onSubmit={onSubmit}>
// //           <div className="anubtform-group">
// //             <label>Bank Name:</label>
// //             <select type="text"
// //               id="bankName"
// //               name="bankName"
// //               value={bankName}
// //               onChange={(e) => setBankName(e.target.value)}
// //               required>
// //               <option value="" disabled>Select Bank Name</option>
// //               <option value="Bank of Ceylon">Bank of Ceylon (BOC)</option>
// //               <option value="People's Bank">People's Bank</option>
// //               <option value="National Savings Bank">National Savings Bank (NSB)</option>
// //               <option value="Hatton National Bank PLC">Hatton National Bank PLC (HNB)</option>
// //               <option value="Commercial Bank of Ceylon PLC">Commercial Bank of Ceylon PLC</option>
// //               <option value="Sampath Bank PLC">Sampath Bank PLC</option>
// //               <option value="Seylan Bank PLC">Seylan Bank PLC</option>
// //               <option value="Amana Bank PLC">Amana Bank PLC</option>
// //             </select>
// //           </div>
// //           <div className="anubtform-group">
// //             <label>Branch Name:</label>
// //             <input
// //               type="text"
// //               id="branchName"
// //               name="branchName"
// //               value={branchName}
// //               onChange={(e) => setBranchName(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="anubtform-group">
// //             <label>Upload your deposit slip (jpg, png, jpeg):</label>
// //             <input
// //               type="file"
// //               id="depositSlip"
// //               name="depositSlip"
// //               accept=".jpeg,.jpg,.png"
// //               onChange={onInputChange}
// //               required
// //             />
// //           </div>
// //           <center><div className="anubtbtn-con">
// //             <button className="anubtbutton" type="submit">
// //               Confirm Payment
// //             </button>
// //             &nbsp;
// //             &nbsp;
// //             <button className="anubtbutton" type="button" onClick={() => window.location.href = '/'}>
// //               Go to Home
// //             </button>
// //             </div></center>
// //         </form>
// //         {errorMessage && <p className="error-message">{errorMessage}</p>}
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default Banktrans;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../css/banktrans.css';

// const Banktrans = () => {
//   const location = useLocation();
//   const [payerId, setPayerId] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [branchName, setBranchName] = useState('');
//   const [depositSlip, setDepositSlip] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const id = searchParams.get('payerId');
//     if (id) {
//       setPayerId(id);
//     }
//   }, [location.search]);

//   const onInputChange = (e) => {
//     const file = e.target.files[0];
//     setDepositSlip(file);
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!payerId || !bankName || !branchName || !depositSlip) {
//       setErrorMessage('Please fill in all required fields');
//       return;
//     }
  
//     try {
//       const formData = new FormData();
//       formData.append('payerId', payerId);
//       formData.append('bankName', bankName);
//       formData.append('branchName', branchName);
//       formData.append('depositSlip', depositSlip);
  
//       const response = await axios.post(
//         "http://localhost:9000/banktrans/bpay",
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         }
//       );
//       console.log('Bank transaction added: ', response.data);
      
//       // Reset the form values after successful submission
//       setBankName('');
//       setBranchName('');
//       setDepositSlip(null);
//       setErrorMessage('');
      
//     } catch (error) {
//       console.error('Error adding bank transaction: ', error);
//       // handle error...
//     }
//   };

//   const goToHomePage = () => {
//     window.location.href = '/';
//   };
  
//   return (
//     <>
//       <Header />
//       <div className="anubank-transfer">
//         <h2>Bank Transfer</h2>
//         <form onSubmit={onSubmit}>
//           <div className="anubtform-group">
//             <label>Bank Name:</label>
//             <select type="text"
//               id="bankName"
//               name="bankName"
//               value={bankName}
//               onChange={(e) => setBankName(e.target.value)}
//               required>
//               <option value="" disabled>Select Bank Name</option>
//               <option value="Bank of Ceylon">Bank of Ceylon (BOC)</option>
//               <option value="People's Bank">People's Bank</option>
//               <option value="National Savings Bank">National Savings Bank (NSB)</option>
//               <option value="Hatton National Bank PLC">Hatton National Bank PLC (HNB)</option>
//               <option value="Commercial Bank of Ceylon PLC">Commercial Bank of Ceylon PLC</option>
//               <option value="Sampath Bank PLC">Sampath Bank PLC</option>
//               <option value="Seylan Bank PLC">Seylan Bank PLC</option>
//               <option value="Amana Bank PLC">Amana Bank PLC</option>
//             </select>
//           </div>
//           <div className="anubtform-group">
//             <label>Branch Name:</label>
//             <input
//               type="text"
//               id="branchName"
//               name="branchName"
//               value={branchName}
//               onChange={(e) => setBranchName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="anubtform-group">
//             <label>Upload your deposit slip (jpg, png, jpeg):</label>
//             <input
//               type="file"
//               id="depositSlip"
//               name="depositSlip"
//               accept=".jpeg,.jpg,.png"
//               onChange={onInputChange}
//               required
//             />
//           </div>
//           <center><div className="anubtbtn-con">
//             <button className="anubtbutton" type="submit">
//               Confirm Payment
//             </button>
//             &nbsp;
//             &nbsp;
//             <button className="anubtbutton" type="button" onClick={goToHomePage}>
//               Go to Home
//             </button>
//             </div></center>
//         </form>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Banktrans;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/banktrans.css';

const Banktrans = () => {
  const location = useLocation();
  const [payerId, setPayerId] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [depositSlip, setDepositSlip] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [purpose, setPurpose] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('payerId');
    const purpose = searchParams.get('purpose');
    if (id) {
      setPayerId(id);
    }
    if (purpose) {
      setPurpose(purpose);
    }
  }, [location.search]);

  const onInputChange = (e) => {
    const file = e.target.files[0];
    setDepositSlip(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    if (!payerId || !bankName || !branchName || !depositSlip) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('payerId', payerId);
      formData.append('bankName', bankName);
      formData.append('branchName', branchName);
      formData.append('depositSlip', depositSlip);
  
      const response = await axios.post(
        "http://localhost:9000/banktrans/bpay",
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log('Bank transaction added: ', response.data);
      
      // Reset the form values after successful submission
      setBankName('');
      setBranchName('');
      setDepositSlip(null);
      setErrorMessage('');
      
    } catch (error) {
      console.error('Error adding bank transaction: ', error);
      // handle error...
    }
  };

  const goToHomePage = () => {
    switch (purpose) {
      case 'Buy products':
        window.location.href = '/OrderForm';
        break;
      case 'Veterinary appointment':
      case 'Grooming appointment':
        window.location.href = '/MyAppointments';
        break;
      case 'Pet training appointment':
        window.location.href = '/TrainingPrograms';
        break;
      case 'Advertisement':
        window.location.href = '/MyAdvertisements';
        break;
      default:
        window.location.href = '/';
    }
  };
  
  return (
    <>
      <Header />
      <div className="anubank-transfer">
        <h2>Bank Transfer</h2>
        <form onSubmit={onSubmit}>
          <div className="anubtform-group">
            <label>Bank Name:</label>
            <select type="text"
              id="bankName"
              name="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required>
              <option value="" disabled>Select Bank Name</option>
              <option value="Bank of Ceylon">Bank of Ceylon (BOC)</option>
              <option value="People's Bank">People's Bank</option>
              <option value="National Savings Bank">National Savings Bank (NSB)</option>
              <option value="Hatton National Bank PLC">Hatton National Bank PLC (HNB)</option>
              <option value="Commercial Bank of Ceylon PLC">Commercial Bank of Ceylon PLC</option>
              <option value="Sampath Bank PLC">Sampath Bank PLC</option>
              <option value="Seylan Bank PLC">Seylan Bank PLC</option>
              <option value="Amana Bank PLC">Amana Bank PLC</option>
            </select>
          </div>
          <div className="anubtform-group">
            <label>Branch Name:</label>
            <input
              type="text"
              id="branchName"
              name="branchName"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              required
            />
          </div>
          <div className="anubtform-group">
            <label>Upload your deposit slip (jpg, png, jpeg):</label>
            <input
              type="file"
              id="depositSlip"
              name="depositSlip"
              accept=".jpeg,.jpg,.png"
              onChange={onInputChange}
              required
            />
          </div>
          <center><div className="anubtbtn-con">
            <button className="anubtbutton" type="submit">
              Confirm Payment
            </button>
            &nbsp;
            &nbsp;
            <button className="anubtbutton" type="button" onClick={goToHomePage}>
              Go to Home
            </button>
            </div></center>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <Footer />
    </>
  );
};

export default Banktrans;
