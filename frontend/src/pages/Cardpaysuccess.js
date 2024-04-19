// // import React from 'react';
// // import '../css/cardpaysuccess.css';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';

// // const Cardpaysuccess = () => {
// //   const goToCardPayReport = () => {
// //     // Navigate to the Cardpayreport page
// //     window.location.href = '/cardpayreport'; // Update the path as needed
// //   };

// //   const goToHomePage = () => {
// //     // Navigate to the homepage
// //     window.location.href = '/'; // Update the path as needed
// //   };

// //   return (
// //     <>
// //       <Header />
// //       <div className="cps-container">
// //         <div className="cps-bodycon">
// //           <h2>Payment Successful</h2>
// //           <p>Congratulations! Your payment was successful.</p>
// //         </div>
// //         <div className="cps-buttoncon">
// //           <button className="cps-button" onClick={goToCardPayReport}>Download Report</button>
// //           <button className="cps-button" onClick={goToHomePage}>Back to Home</button>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default Cardpaysuccess;

// import React from 'react';
// import '../css/cardpaysuccess.css';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// const Cardpaysuccess = () => {
//   const goToCardPayReport = () => {
//     // Navigate to the Cardpayreport page with the card payment ID
//     const searchParams = new URLSearchParams(window.location.search);
//     const id = searchParams.get('id');
//     window.location.href = `/cardpayreport?id=${id}`;
//   };

//   const goToHomePage = () => {
//     // Navigate to the homepage
//     window.location.href = '/'; // Update the path as needed
//   };

//   return (
//     <>
//       <Header />
//       <div className="cps-container">
//         <div className="cps-bodycon">
//           <h2>Payment Successful</h2>
//           <p>Congratulations! Your payment was successful.</p>
//         </div>
//         <div className="cps-buttoncon">
//           <button className="cps-button" onClick={goToCardPayReport}>Download Report</button>
//           <button className="cps-button" onClick={goToHomePage}>Back to Home</button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Cardpaysuccess;

import React from 'react';
import '../css/cardpaysuccess.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cardpaysuccess = () => {
  const goToCardPayReport = () => {
    // Retrieve the id parameter from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');

    // Navigate to the Cardpayreport page with the card payment ID
    window.location.href = `/cardpayreport?id=${id}`;
  };

  const goToHomePage = () => {
    // Navigate to the homepage
    window.location.href = '/'; // Update the path as needed
  };

  return (
    <>
      <Header />
      <div className="cps-container">
        <div className="cps-bodycon">
          <h2>Payment Successful</h2>
          <p>Congratulations! Your payment was successful.</p>
        </div>
        <div className="cps-buttoncon">
          <button className="cps-button" onClick={goToCardPayReport}>Download Report</button>
          <button className="cps-button" onClick={goToHomePage}>Back to Home</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cardpaysuccess;