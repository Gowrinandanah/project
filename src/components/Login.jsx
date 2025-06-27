import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/UserApi';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 🔁 Clear session on mount to avoid redirecting into logged-in pages
  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form, true); // `true` for dummy mode

      if (res.token && res.role) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        navigate(res.role === 'admin' ? '/admin' : '/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed', err);
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
