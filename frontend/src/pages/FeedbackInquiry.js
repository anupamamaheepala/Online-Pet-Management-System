// // import React, { useRef } from 'react';
// // import emailjs from '@emailjs/browser';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';
// // import '../css/feedbackinquiry.css';

// // export const FeedbackInquiry = () => {
// //   const form = useRef();

// //   const sendEmail = () => {
// //     emailjs.sendForm('service_hs3xk19', 'template_vzgks8e', form.current, {
// //       publicKey: 'J8nt0NYTxJsPNGwOp',
// //     })
// //       .then(
// //         () => {
// //           console.log('Email sent successfully!');
// //         },
// //         (error) => {
// //           console.error('Failed to send email:', error);
// //         },
// //       );
// //   };

// //   const submitForm = (e) => {
// //     e.preventDefault();
// //     console.log('Submitting form data...');
// //     const formData = new FormData(form.current);
// //     console.log('Form data:', formData);
// //     fetch('/feedback', {
// //       method: 'POST',
// //       body: formData,
// //     })
// //       .then(response => response.json())
// //       .then(data => {
// //         console.log('Form data submitted successfully!', data);
// //       })
// //       .catch(error => {
// //         console.error('Failed to submit form data:', error);
// //       });
// //   };

// //   return (
// //     <>
// //       <Header />
// //       <div className="custom-form-container">
// //         <form ref={form}>
// //           <label className="custom-form-label">Name</label>
// //           <input className="custom-form-input" type="text" name="name" />
// //           <label className="custom-form-label">Email</label>
// //           <input className="custom-form-input" type="email" name="email" />
// //           <label className="custom-form-label">Feedback</label>
// //           <textarea className="custom-form-textarea" name="feedback" />
// //           <button className="custom-form-submit" onClick={submitForm}>Send</button>
// //         </form>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default FeedbackInquiry;
// import React, { useRef } from 'react';
// import emailjs from 'emailjs-com';
// import '../css/feedbackinquiry.css';

// const FeedbackInquiry = () => {
//   const form = useRef();

//   const sendEmail = () => {
//     emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
//       .then(
//         () => {
//           console.log('Email sent successfully!');
//         },
//         (error) => {
//           console.error('Failed to send email:', error);
//         },
//       );
//   };

//   const submitForm = (e) => {
//     e.preventDefault();
//     console.log('Submitting form data...');
//     const formData = new FormData(form.current);
//     console.log('Form data:', formData);
//     fetch('/feedback', {
//       method: 'POST',
//       body: formData,
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Form data submitted successfully!', data);
//         // Optionally, you can show a success message to the user
//       })
//       .catch(error => {
//         console.error('Failed to submit form data:', error);
//         // Optionally, you can show an error message to the user
//       });
//   };

//   return (
//     <div className="custom-form-container">
//       <form ref={form}>
//         <label className="custom-form-label">Name</label>
//         <input className="custom-form-input" type="text" name="name" />
//         <label className="custom-form-label">Email</label>
//         <input className="custom-form-input" type="email" name="email" />
//         <label className="custom-form-label">Feedback</label>
//         <textarea className="custom-form-textarea" name="feedback" />
//         <button className="custom-form-submit" onClick={submitForm}>Send</button>
//       </form>
//     </div>
//   );
// };

// export default FeedbackInquiry;
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import emailjs from '@emailjs/browser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackinquiry.css';

const FeedbackInquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/feedbackinquiry/feedback", formData); // Send form data to backend endpoint
      console.log('Feedback submitted successfully');

      // Optionally, clear the form fields after successful submission
      setFormData({
        name: '',
        email: '',
        feedback: '',
               
    })
      // Optionally, you can show a success message to the user
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <>
      <Header />
      <div className="custom-form-container">
        
        <form onSubmit={handleSubmit}>
          <label className="custom-form-label">Name</label>
          <input className="custom-form-input" type="text" name="name" value={formData.name} onChange={handleChange} />
          <label className="custom-form-label">Email</label>
          <input className="custom-form-input" type="email" name="email" value={formData.email} onChange={handleChange} />
          <label className="custom-form-label">Feedback</label>
          <textarea className="custom-form-textarea" name="feedback" value={formData.feedback} onChange={handleChange} />
          <button className="custom-form-submit" type="submit">Send</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackInquiry;