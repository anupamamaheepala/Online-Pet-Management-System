import React, { useState } from 'react';
import '../css/banktrans.css';
import Layout from '../components/Layout';

const Banktrans = ({ onNext }) => {
  const [transferInfo, setTransferInfo] = useState({
    bank: '',
    branch: '',
    depositSlip: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setTransferInfo(prevState => ({
      ...prevState,
      depositSlip: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(transferInfo);
  };

  return (
    <Layout>
    <div className="bank-transfer-container">
      <div className="tile"><h1 className='bt'>Bank Transfer</h1></div>
      <form className="bank-transfer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="bank"
            placeholder="Bank Name"
            value={transferInfo.bank}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="branch"
            placeholder="Branch Name"
            value={transferInfo.branch}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className='up' htmlFor="depositSlip">Upload your deposit slip here</label>
          <input
            type="file"
            id="depositSlip"
            name="depositSlip"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
    </Layout>
  );
};

export default Banktrans;
