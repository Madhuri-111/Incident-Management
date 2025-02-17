import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import LoginPage from './LoginPage'; // Import LoginPage component
import Dashboard from './Dashboard'; // Import Dashboard component
import Header from './Header';
import SignUpPage from './SignUpPage';
import ForgetPassword from './ForgetPassword';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes> 
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
