import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserForm from './components/UserForm';
import AccountList from './components/AccountList';
import AccountForm from './components/AccountForm';
import AccountDetail from './components/AccountDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">ATM Application</h1>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/users/:id/edit" element={<UserForm />} />
        <Route path="/users/:id/accounts" element={<AccountList />} />
        <Route path="/users/:id/accounts/new" element={<AccountForm />} />
        <Route path="/users/:id/accounts/:acc_id" element={<AccountDetail />} />
      </Routes>
    </div>
  );
}

export default App;
