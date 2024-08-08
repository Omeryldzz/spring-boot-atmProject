import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../static/AppNavbar.css';  // Correct the import path

const AppNavbar = () => {
  const location = useLocation();
  const isUserRoute = location.pathname.startsWith('/users');

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Brand as={Link} to="/">ATM Application</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!isUserRoute && (
              <>
                <Nav.Link as={Link} to="/users">Users</Nav.Link>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
              </>
            )}
            {isUserRoute && (
              <>
                <Nav.Link as={Link} to={`${location.pathname}/accounts`}>Accounts</Nav.Link>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
