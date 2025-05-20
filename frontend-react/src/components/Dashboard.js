import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalItems: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: ''
  });
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [userMessage, setUserMessage] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3011/items', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setStats({
            totalItems: data.length || 0,
            activeUsers: 1 // This would come from your backend
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Load items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ name: item.name, price: item.price });
    } else {
      setEditingItem(null);
      setFormData({ name: '', price: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({ name: '', price: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      // Update existing item
      setItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, name: formData.name, price: formData.price }
          : item
      ));
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        name: formData.name,
        price: formData.price
      };
      setItems(prev => [...prev, newItem]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Items
                </Typography>
                <Typography variant="h3">
                  {stats.totalItems}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Active Users
                </Typography>
                <Typography variant="h3">
                  {stats.activeUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Items Management</Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleOpenDialog()}
                  >
                    Add New Item
                  </Button>
                </Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>${item.price}</TableCell>
                          <TableCell align="right">
                            <IconButton 
                              color="primary" 
                              onClick={() => handleOpenDialog(item)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              color="error" 
                              onClick={() => handleDelete(item.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" alignItems="flex-start" mb={4}>
              <Typography variant="h6">Create User (Simple)</Typography>
              <Box component="form" onSubmit={async (e) => {
                e.preventDefault();
                setUserMessage('');
                try {
                  const res = await fetch(API_URL + '/login/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser),
                  });
                  const data = await res.json();
                  if (data.success) {
                    setUserMessage('User created!');
                  } else {
                    setUserMessage(data.message || 'Error');
                  }
                } catch (err) {
                  setUserMessage('Server error');
                }
              }} sx={{ mb: 2 }}>
                <TextField
                  label="Username"
                  value={newUser.username}
                  onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                  sx={{ mr: 2 }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                  sx={{ mr: 2 }}
                />
                <Button type="submit" variant="contained">Create</Button>
              </Box>
              {userMessage && <Typography color="error">{userMessage}</Typography>}
            </Box>
          </Grid>
        </Grid>

        {/* Add/Edit Item Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Item Name"
                type="text"
                fullWidth
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                margin="dense"
                name="price"
                label="Price"
                type="number"
                fullWidth
                value={formData.price}
                onChange={handleInputChange}
                required
                inputProps={{ step: "0.01" }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {editingItem ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Container>
  );
}

export default Dashboard; 