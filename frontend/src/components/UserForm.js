import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../static/UserForm.css';


const UserForm = ({ user }) => {
  const [formData, setFormData] = useState(user || { firstName: '', lastName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      api.put(`/users/${user.id}`, formData)
        .then(response => {
          console.log('User updated', response.data);
          navigate('/users');
        })
        .catch(error => console.error(error));
    } else {
      api.post('/users', formData)
        .then(response => {
          console.log('User created', response.data);
          navigate('/users');
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="container mt-4">
      <h2>{user ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
