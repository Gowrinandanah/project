import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Checkbox, FormControlLabel, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    terms: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.terms) {
      alert("Please accept the terms and conditions");
      return;
    }

    // Placeholder for backend logic
    console.log("Registration Data:", form);

    // Save dummy token and role (until backend is connected)
    localStorage.setItem("token", "userToken");
    localStorage.setItem("role", "user");
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            required
            value={form.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Contact Number"
            name="contact"
            fullWidth
            required
            value={form.contact}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            value={form.password}
            onChange={handleChange}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />
            }
            label="I agree to the terms and conditions"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" fullWidth>
              Register
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
