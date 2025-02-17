import React from "react";
import { Typography, Paper, Container } from "@mui/material";

const IncidentDetails = ({ data }) => {
  if (!data) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          No incident details available.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Incident ID: {data.id}
        </Typography>
        <Typography variant="h6" color="textPrimary">
          Type: {data.incidentType}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Details: {data.incidentDetails}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Priority: {data.priority}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Status: {data.status}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Reported on: {new Date(data.reportedDateTime).toLocaleString()}
        </Typography>
      </Paper>
    </Container> 
  );
};

export default IncidentDetails;
