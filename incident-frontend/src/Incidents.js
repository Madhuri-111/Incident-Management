import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const Incidents = () => {
  const [email, setEmail] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [editDetails, setEditDetails] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      fetchIncidents(storedEmail); 
    } else {
      setErrorMessage("No email found in local storage. Please log in.");
    }
  }, []);

  
  const fetchIncidents = async (emailToFetch) => {
    try {
      const response = await axios.get(`http://localhost:8080/incidents/api/${emailToFetch}`);
      setIncidents(response.data);
      setErrorMessage(""); 
    } catch (error) {
      setErrorMessage("Failed to fetch incidents. Please try again later.");
      setIncidents([]); 
    }
  };

  
  const handleEditClick = (incident) => {
    if (incident.status === "Open" || incident.status === "In Progress") {
      setSelectedIncident(incident);
      setEditDetails(incident.incidentDetails);
      setEditPriority(incident.priority);
      setEditStatus(incident.status);
      setOpenDialog(true); 
      
    }
  };

 
  
  const handleUpdateIncident = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/incidents/api/update/${selectedIncident.id}`,
        {
          incidentDetails: editDetails,
          priority: editPriority,
          status: editStatus,
        }
      );
      console.log(response.data);
      const updatedIncident = response.data;
      setIncidents((prev) =>
        prev.map((incident) =>
          incident.id === updatedIncident.id ? updatedIncident : incident
        )
      );
      setOpenDialog(false);
      setErrorMessage(""); 
      
    } catch (error) {
      setErrorMessage("Failed to update incident. Please try again later.");
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Incident List
      </Typography>

      {errorMessage && (
        <Typography color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}

      {/* Display incidents in a table */}
      {incidents.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Reported Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell>{incident.incidentId}</TableCell>
                  <TableCell>{incident.incidentType}</TableCell>
                  <TableCell>{incident.incidentDetails}</TableCell>
                  <TableCell>{incident.priority}</TableCell>
                  <TableCell>{incident.status}</TableCell>
                  <TableCell>{new Date(incident.reportedDateTime).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditClick(incident)}
                      disabled={incident.status == "Closed" }
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!errorMessage && incidents.length === 0 && (
        <Typography align="center" color="textSecondary">
          No incidents found for the logged-in user.
        </Typography>
      )}

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Incident</DialogTitle>
        <DialogContent>
          <TextField
            label="Details"
            fullWidth
            value={editDetails}
            onChange={(e) => setEditDetails(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Priority"
            fullWidth
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={editStatus}
              onChange={(e) =>{ setEditStatus(e.target.value)
                console.log(e.target.value)
              }}
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateIncident} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Incidents;
