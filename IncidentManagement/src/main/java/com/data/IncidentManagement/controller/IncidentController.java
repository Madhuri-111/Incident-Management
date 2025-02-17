package com.data.IncidentManagement.controller;

import com.data.IncidentManagement.entity.IncidentDetails;
import com.data.IncidentManagement.service.IncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/incidents/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class IncidentController {

    @Autowired
    private IncidentService incidentService;

    @GetMapping("/{email}")
    public ResponseEntity<?> getAllIncidents(@PathVariable String email){
    List<IncidentDetails> list=incidentService.findallIncidentsByEmail(email);
    return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<?> createIncident(@RequestBody IncidentDetails incidentRequest) {
        try {
            IncidentDetails createdIncident = incidentService.createIncident(incidentRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdIncident);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while creating the incident: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateIncidentDetails(
            @PathVariable Long id,
            @RequestBody IncidentDetails updatedDetails) {
        try {
            IncidentDetails existingIncident = incidentService.findIncidentById(id);

            if (existingIncident == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Incident not found");
            }

            existingIncident.setIncidentDetails(updatedDetails.getIncidentDetails());
            existingIncident.setPriority(updatedDetails.getPriority());
            existingIncident.setStatus(updatedDetails.getStatus());
            IncidentDetails savedIncident = incidentService.saveIncident(existingIncident);

            return ResponseEntity.ok(savedIncident);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating incident");
        }
    }

    @GetMapping("/incidentId/{incidentId}")
    public ResponseEntity<?> getIncidentByIncidentId(@PathVariable String incidentId){
        IncidentDetails incident = incidentService.findIncidentByIncidentId(incidentId);

        if (incident == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Incident not found");
        }

        return ResponseEntity.ok(incident);
    }
}

