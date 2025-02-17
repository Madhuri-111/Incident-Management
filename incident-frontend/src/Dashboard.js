import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  TextField,
} from "@mui/material";
import axios from "axios";
import CreateIncident from "./CreateIncident"; 
import Incidents from "./Incidents";
import IncidentDetails from "./IncidentDetails"; 

const Dashboard = () => {
  const [userData, setUserData] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [activeView, setActiveView] = useState(""); 
  const [incidentId, setIncidentId] = useState(""); 
  const [incidentData, setIncidentData] = useState(null); 
  const[loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        setErrorMessage("No email found in local storage");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/${email}`);
        setUserData(response.data); // Store user data
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErrorMessage("User not found");
        } else {
          setErrorMessage("An error occurred while fetching user data");
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchIncidentById = async () => {
    if (incidentId.trim()) {
      try {
        const response = await axios.get(
          `http://localhost:8080/incidents/api/incidentId/${incidentId}`
        );
        setIncidentData(response.data);
        setActiveView("viewIncidentDetails");
      } catch (error) {
        setErrorMessage("Failed to fetch incident details. Please check the ID.");
        setIncidentData(null);
      }
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
       <Typography variant="h4" gutterBottom align="center">
        Welcome!
      </Typography> 
      

      {errorMessage && (
        <Typography color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}

      {/* Main Grid Layout */}
      <Grid container spacing={3}>
        {/* Card 1: Create New Incident */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Create New Incident
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => setActiveView("create")} 
              >
                Create
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Show All Incidents */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Show All Incidents
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => setActiveView("viewIncidents")} 
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3: Enter Incident ID to Fetch Incident Details */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Enter Incident ID
              </Typography>
              <TextField
                label="Incident ID"
                variant="outlined"
                fullWidth
                value={incidentId}
                onChange={(e) => setIncidentId(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={fetchIncidentById} // Fetch incident by ID
                disabled={!incidentId.trim()}
              >
                Get Incident Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Conditional Rendering */}
      {activeView === "create" && <CreateIncident setActiveView={setActiveView} />}
      {activeView === "viewIncidents" && <Incidents />}
      {activeView === "viewIncidentDetails" && <IncidentDetails data={incidentData} />}
    </Container>
  );
};

export default Dashboard;
