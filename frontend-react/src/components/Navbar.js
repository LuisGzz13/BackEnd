import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            onClick={() => navigate('/dashboard')}
            sx={{ 
              backgroundColor: location.pathname === '/dashboard' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            Items
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/success')}
            sx={{ 
              backgroundColor: location.pathname === '/success' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            Success
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 