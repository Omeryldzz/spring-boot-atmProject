// src/components/Home.js

import React from 'react';
import '../static/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="jumbotron text-center">
        <h1 className="display-4">Welcome to the User Management System</h1>
        <p className="lead">Manage your users and their accounts efficiently.</p>
        <hr className="my-4" />
        <p>Use the navigation bar to access different features.</p>
        <a className="btn btn-primary btn-lg" href="/users" role="button">View Users</a>
      </div>
    </div>
  );
};

export default Home;
