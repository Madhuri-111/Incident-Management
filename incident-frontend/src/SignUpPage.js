import React, { useState } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    country: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [pincodeError, setPincodeError] = useState(""); 
  const navigate = useNavigate(); 

  const handleChange = async (e) => {
    const { name, value } = e.target;
  
    // Handle pincode change and fetch city & country
    if (name === "pincode" && value.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${value}`
        );
  
        if (response.data[0].Status === "Success") {
          const locationData = response.data[0].PostOffice[0];
          setFormData({
            ...formData,
            [name]: value,
            city: locationData.District,
            country: "India", // Static because Postman API is India-specific
          });
          setPincodeError("");
        } else {
          setPincodeError("Invalid Pincode or location data not found.");
          setFormData({ ...formData, [name]: value, city: "", country: "" });
        }
      } catch (err) {
        setPincodeError("Error fetching data. Please try again later.");
        setFormData({ ...formData, [name]: value, city: "", country: "" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/signup", formData);
      if (response.status === 200) {
        alert("User registered successfully!");
        navigate("/login"); 
      }
    } catch (error) {
      setErrorMessage("Error registering user. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              name="phone"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              fullWidth
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Pincode"
              name="pincode"
              fullWidth
              value={formData.pincode}
              onChange={handleChange}
              error={Boolean(pincodeError)}
              helperText={pincodeError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="City"
              name="city"
              fullWidth
              value={formData.city}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Country"
              name="country"
              fullWidth
              value={formData.country}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          {errorMessage && (
            <Grid item xs={12}>
              <Typography color="error">{errorMessage}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUpPage;
