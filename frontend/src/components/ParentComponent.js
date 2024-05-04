import React, { useState } from 'react';
import Header from './Header'; // Assuming Header.js is in the same directory

const ParentComponent = () => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));

    // Function to update userData when signed in or signed out
    const handleUserDataUpdate = (newUserData) => {
        setUserData(newUserData);
    };

    return (
        <div>
            <Header userData={userData} handleUserDataUpdate={handleUserDataUpdate} />
            {/* Other components */}
        </div>
    );
}

export default ParentComponent;
