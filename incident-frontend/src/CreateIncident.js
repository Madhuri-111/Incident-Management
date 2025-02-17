import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  MenuItem,
  Grid,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";


const CreateIncident = ({setActiveView}) => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    incidentType: "",
    incidentDetails: "",
    priority: "",
    reportedDateTime: new Date().toISOString(),
    status: "Open",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(()=>{setShowForm(true)},[openSnackbar])

  
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setShowForm(true);
    if (!email) {
      setErrorMessage("User not logged in.");
      return;
    }

    // Fetch user details
    axios
      .get(`http://localhost:8080/api/${email}`)
      .then((response) => {
        setFormData((prevData) => ({
          ...prevData,
          name: response.data.name,
          email: response.data.email,
        }));
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch user details.");
        console.error(error);
      });
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.incidentDetails || !formData.priority) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/incidents/api/", {
        incidentType: formData.incidentType,
        reporterName: formData.name,
        reporterEmail: formData.email,
        incidentDetails: formData.incidentDetails,
        reportedDateTime: formData.reportedDateTime,
        priority: formData.priority,
        status: formData.status,
      });
      setSuccessMessage("Incident created successfully!");
      setOpenSnackbar(true);
      setErrorMessage("");
      setActiveView("");
      setShowForm(false); // Hide the form after success
    } catch (error) {
      setErrorMessage("Failed to create incident. Please try again.");
      setSuccessMessage("");
      console.log(error)      
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {showForm ? "Create New Incident" : ""}
      </Typography>

      {errorMessage && (
        <Typography color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}

      {showForm ? (
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Name Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                disabled
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                disabled
              />
            </Grid>

            {/* Incident Type */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Incident Type"
                name="incidentType"
                value={formData.incidentType}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="Enterprise">Enterprise</MenuItem>
                <MenuItem value="Government">Government</MenuItem>
              </TextField>
            </Grid>

            {/* Incident Details */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Incident Details"
                name="incidentDetails"
                value={formData.incidentDetails}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
              />
            </Grid>

            {/* Priority */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Create Incident
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            Incident successfully created!
          </Typography>
          {/* Add card components or redirect logic here */}
        </Box>
      )}

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {setOpenSnackbar(false);
            setShowForm(true);
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateIncident;
