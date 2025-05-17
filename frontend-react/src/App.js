import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Login from './components/Login';
import Success from './components/Success';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Navbar />
                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/success" element={<Success />} />
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </Box>
                </Box>
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
