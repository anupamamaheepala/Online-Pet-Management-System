// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Paystatus = () => {
//     const [payerInfo, setPayerInfo] = useState({});
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const searchParams = new URLSearchParams(window.location.search);
//                 const id = searchParams.get('id');
//                 if (!id) {
//                     console.error('No ID parameter found in URL');
//                     return;
//                 }
//                 const response = await axios.get(`http://localhost:9000/payerinfo/${id}`);
//                 setPayerInfo(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div>
//             <h2>Payment Status</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     <p><strong>Name:</strong> {payerInfo.name}</p>
//                     <p><strong>Email:</strong> {payerInfo.email}</p>
//                     <p><strong>Phone Number:</strong> {payerInfo.phonenumber}</p>
//                     <p><strong>Address:</strong> {payerInfo.address}</p>
//                 </>
//             )}
//         </div>
//     );
// }

// export default Paystatus;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Paystatus = () => {
    const [payerInfo, setPayerInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                const id = searchParams.get('id');
                if (!id) {
                    console.error('No ID parameter found in URL');
                    return;
                }
                const response = await axios.get(`http://localhost:9000/payerinfo/${id}`);
                setPayerInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Payment Status</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p><strong>Name:</strong> {payerInfo.name}</p>
                    <p><strong>Email:</strong> {payerInfo.email}</p>
                    <p><strong>Phone Number:</strong> {payerInfo.phonenumber}</p>
                    <p><strong>Address:</strong> {payerInfo.address}</p>
                </>
            )}
        </div>
    );
}

export default Paystatus;
