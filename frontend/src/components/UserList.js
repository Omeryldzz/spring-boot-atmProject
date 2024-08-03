import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCreateUser = () => {
    navigate('/users/new');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users</h2>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{user.firstName} {user.lastName} - {user.email}</span>
            <div>
              <Link to={`/users/${user.id}`} className="btn btn-primary btn-sm mr-2">Details</Link>
              <Link to={`/users/${user.id}/accounts`} className="btn btn-secondary btn-sm">Accounts</Link>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateUser} className="btn btn-success mt-4">Create New User</button>
    </div>
  );
};

export default UserList;
