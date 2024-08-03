import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const AccountDetail = () => {
  const { id, acc_id } = useParams();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    api.get(`/users/${id}/accounts/${acc_id}`)
      .then(response => setAccount(response.data))
      .catch(error => console.error(error));
  }, [id, acc_id]);

  if (!account) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Account Details</h2>
      <p><strong>Account ID:</strong> {account.acc_id}</p>
      <p><strong>Total Credit:</strong> {account.totalCredit}</p>
    </div>
  );
};

export default AccountDetail;
