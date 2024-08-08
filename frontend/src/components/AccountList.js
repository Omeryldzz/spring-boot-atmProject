import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import '../static/AccountList.css';

const AccountList = () => {
  const { id } = useParams();
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/users/${id}/accounts`)
      .then(response => setAccounts(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleCreateAccount = () => {
    navigate(`/users/${id}/accounts/new`);
  };

  return (
    <div className="container mt-4">
      <h2>Accounts</h2>
      <ul className="list-group">
        {accounts.map(account => (
          <li key={account.acc_id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>Account ID: {account.acc_id} - Total Credit: {account.totalCredit}</span>
            <Link to={`/users/${id}/accounts/${account.acc_id}`} className="btn btn-info btn-sm">Details</Link>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateAccount} className="btn btn-success mt-4">Create New Account</button>
    </div>
  );
};

export default AccountList;
