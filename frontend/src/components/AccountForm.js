import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const AccountForm = () => {
  const { id } = useParams();
  const [totalCredit, setTotalCredit] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTotalCredit(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const account = { totalCredit };
    api.post(`/users/${id}/accounts/new`, account)
      .then(response => {
        console.log('Account created', response.data);
        setTotalCredit('');
        navigate(`/users/${id}/accounts`);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-4">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Total Credit</label>
          <input type="number" className="form-control" name="totalCredit" value={totalCredit} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
    </div>
  );
};

export default AccountForm;
