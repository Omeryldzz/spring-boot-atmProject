import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import '../static/UserList.css';

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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      api.delete(`/users/${id}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(error => console.error('Error deleting user:', error));
    }
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
              <Link to={`/users/${user.id}/accounts`} className="btn btn-secondary btn-sm mr-2">Accounts</Link>
              <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateUser} className="btn btn-success mt-4">Create New User</button>
    </div>
  );
};

export default UserList;
