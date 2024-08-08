import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import '../static/UserDetail.css';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/users/${id}`)
            .then(response => setUser(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            api.delete(`/users/${id}`)
                .then(() => {
                    navigate('/users'); // Redirect to the user list after deletion
                })
                .catch(error => console.error('Error deleting user:', error));
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>User Details</h2>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={handleDelete} className="btn btn-danger mt-4">Delete User</button>
        </div>
    );
};

export default UserDetail;
