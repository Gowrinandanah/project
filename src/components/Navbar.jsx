import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: '#fff' }}>
          StudyGroupFinder
        </Typography>

        <Box>
          <Button component={Link} to="/" color="inherit">Home</Button>

          {!isLoggedIn && (
            <>
              <Button component={Link} to="/login" color="inherit">Login</Button>
              <Button component={Link} to="/register" color="inherit">Sign Up</Button>
            </>
          )}

          {isLoggedIn && role === "user" && (
            <>
              <Button component={Link} to="/profile" color="inherit">Profile</Button>
              <Button component={Link} to="/create" color="inherit">Create Group</Button>
              <Button onClick={handleLogout} color="inherit">Logout</Button>
            </>
          )}

          {isLoggedIn && role === "admin" && (
            <>
              <Button component={Link} to="/admin" color="inherit">Admin Dashboard</Button>
              <Button onClick={handleLogout} color="inherit">Logout</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
