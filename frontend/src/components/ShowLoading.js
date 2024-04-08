import React, { useEffect, useState } from 'react';
import '../css/ShowLoading.css';

const ShowLoading = ({ children }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 2000); // Hide the loader after 2 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showLoader && (
        <div className="loading-overlay">
          <div className="loading-ball"></div>
          <div className="loading-text">Loading...</div>
        </div>
      )}
      <div className={showLoader ? 'blur-content' : ''}>
        {children}
      </div>
    </>
  );
};

export default ShowLoading;
