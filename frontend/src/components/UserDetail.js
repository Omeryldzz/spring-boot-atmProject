import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>User Details</h2>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserDetail;
