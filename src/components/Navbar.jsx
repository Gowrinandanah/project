import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h3"
          component={Link}
          to="/"
          sx={{
          textDecoration: 'none',
          color: '#fff',
          fontFamily: '"Pacifico", cursive',
          outline: 'none',
          }}
        >
           brainhive
       </Typography>


        <Box>
          <Button
            component={Link}
            to="/"
            color={isActive("/") ? "secondary" : "inherit"}
          >
            Home
          </Button>

          {!isLoggedIn && (
            <>
              <Button
                component={Link}
                to="/login"
                color={isActive("/login") ? "secondary" : "inherit"}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                color={isActive("/register") ? "secondary" : "inherit"}
              >
                Sign Up
              </Button>
            </>
          )}

          {isLoggedIn && role === "user" && (
            <>
              <Button
                component={Link}
                to="/profile"
                color={isActive("/profile") ? "secondary" : "inherit"}
              >
                Profile
              </Button>
              <Button
                component={Link}
                to="/create"
                color={isActive("/create") ? "secondary" : "inherit"}
              >
                Create Group
              </Button>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          )}

          {isLoggedIn && role === "admin" && (
            <>
              <Button
                component={Link}
                to="/admin"
                color={isActive("/admin") ? "secondary" : "inherit"}
              >
                Admin Dashboard
              </Button>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
