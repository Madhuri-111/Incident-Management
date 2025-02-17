package com.data.IncidentManagement.service;

import com.data.IncidentManagement.entity.IncidentDetails;
import com.data.IncidentManagement.repository.IncidentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class IncidentService {

    @Autowired
    private IncidentRepo incidentRepository;

    // Utility method to generate a unique Incident ID
    public static String generateIncidentId() {
        Random random = new Random();
        int randomNumber = 10000 + random.nextInt(90000); // Generate a 5-digit number
        int currentYear = LocalDateTime.now().getYear();
        return "RMG" + randomNumber + currentYear;
    }

    public IncidentDetails createIncident(IncidentDetails incident) {
        // Generate a unique Incident ID
        String incidentId;
        do {
            incidentId = generateIncidentId();
        } while (incidentRepository.existsByIncidentId(incidentId));

        if(incidentRepository.existsByIncidentId(incidentId)){
            
        }

        incident.setIncidentId(incidentId);
        return incidentRepository.save(incident);
    }

  public List<IncidentDetails> findallIncidentsByEmail(String email){
        return incidentRepository.findAllByReporterEmail(email);
  }

    public IncidentDetails findIncidentById(Long id) {
        return incidentRepository.findById(id).orElse(null);
    }

    public IncidentDetails findIncidentByIncidentId(String incidentId){
        return incidentRepository.findByIncidentId(incidentId).orElse(null);
    }

    public IncidentDetails saveIncident(IncidentDetails incident) {
        return incidentRepository.save(incident);
    }



}

