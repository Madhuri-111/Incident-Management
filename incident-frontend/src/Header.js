import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material'; 

import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userEmail'); 
  

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); 
    navigate('/login'); 
    
  };
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
    <Toolbar>
      <Typography variant="h7" sx={{ flexGrow: 1 }}>
        Incident Management System
      </Typography>

      {/* Conditional rendering for logout button */}
      {isLoggedIn && (
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Toolbar>
  </AppBar>
  );
};

export default Header;
