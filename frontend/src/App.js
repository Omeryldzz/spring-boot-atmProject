import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserForm from './components/UserForm';
import AccountList from './components/AccountList';
import AccountForm from './components/AccountForm';
import AccountDetail from './components/AccountDetail';
import Home from './components/Home'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';

function App() {
  return (
    <div>
      <AppNavbar />
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/users/:id/edit" element={<UserForm />} />
        <Route path="/users/:id/accounts" element={<AccountList />} />
        <Route path="/users/:id/accounts/new" element={<AccountForm />} />
        <Route path="/users/:id/accounts/:acc_id" element={<AccountDetail />} />
      </Routes>
    </div>
  </div>
  );
}

export default App;
