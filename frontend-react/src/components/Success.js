import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Alert
} from '@mui/material';

function Success() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Login Successful!
          </Typography>
          <Alert severity="success" sx={{ mb: 2 }}>
            ✅ Login Successful!
          </Alert>
          <Alert severity="info" sx={{ mb: 2 }}>
            🔐 Token generated and stored successfully
          </Alert>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" component="pre" sx={{ wordBreak: 'break-all' }}>
              {token}
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ mt: 3 }}
          >
            Logout
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default Success; 