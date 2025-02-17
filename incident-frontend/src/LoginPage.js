import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { TextField, Button, Container, Box, Typography, Grid } from '@mui/material'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('userEmail', email); 
        navigate('/dashboard'); 
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: '100px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          User Login
        </Typography>

        {/* Login Form */}
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }} >
          {/* Email Input */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/forgotpassword" style={{ textDecoration: 'none', color: '#1976d2' }}>
        Forgot password 
      </Link>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          {/* Error message */}
          {errorMessage && (
            <Typography color="error" variant="body2" align="center">
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Footer */}
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Typography variant="body2">
            {"Don't have an account? "}
            <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
        Sign Up
      </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
