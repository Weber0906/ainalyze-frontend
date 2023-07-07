import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';





export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  

  const handleLogout = async () => {
    try {
      await logout();
      // Additional logic after logout if needed
      navigate('/');
    } catch (error) {
      console.log('Failed to log out:', error);
    }
  };

  
  

  return (
    <BootstrapNavbar className="d-flex fixed-top " bg="primary" expand="md">
      <BootstrapNavbar.Brand >
            <div className='d-flex mx-2 mt-2' id='logo'></div>
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="navbar-collapse" />
      
      <BootstrapNavbar.Collapse  id="navbar-collapse">
        <Nav className='mx-auto'>
          
        {currentUser && (
            <>
                <Button as={NavLink} to="/" end>
                    Home
                </Button>
                <Button as={NavLink} to="/exchanges" end>
                    Exchanges
                </Button>
                <Button as={NavLink} to="/profile">
                    Profile
                </Button>
                <Button className="mx-2" onClick={handleLogout}>
                    Logout
                </Button>
            </>
          )}
        </Nav>

        <Nav className='mx-auto'>
          {!currentUser && (
            <>
              <Button as={NavLink} to="/signup">
                Sign Up
              </Button>
              <Button as={NavLink} to="/login">
                Login
              </Button>
            </>
          )}
          
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}