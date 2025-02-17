package com.data.IncidentManagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Random;

@Entity
@Table(name = "incidents")
public class IncidentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Internal primary key

    @Column(name = "incident_id", unique = true, nullable = false)
    private String incidentId; // Unique Incident ID (e.g., RMG123452022)

    @Column(name = "incident_type", nullable = false)
    private String incidentType; // "Enterprise" or "Government"

    @Column(name = "reporter_name", nullable = false)
    private String reporterName;

    @Column(name = "reporter_email", nullable = false)
    private String reporterEmail;

    @Column(name = "incident_details", nullable = false, columnDefinition = "TEXT")
    private String incidentDetails;

    @Column(name = "reported_date_time", nullable = false)
    private LocalDateTime reportedDateTime;

    @Column(name = "priority", nullable = false)
    private String priority; // Dropdown: "High", "Medium", "Low"

    @Column(name = "status", nullable = false)
    private String status;

    public IncidentDetails() {
        this.reportedDateTime = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIncidentId() {
        return incidentId;
    }

    public void setIncidentId(String incidentId) {
        this.incidentId = incidentId;
    }

    public String getIncidentType() {
        return incidentType;
    }

    public void setIncidentType(String incidentType) {
        this.incidentType = incidentType;
    }

    public String getReporterName() {
        return reporterName;
    }

    public void setReporterName(String reporterName) {
        this.reporterName = reporterName;
    }

    public String getReporterEmail() {
        return reporterEmail;
    }

    public void setReporterEmail(String reporterEmail) {
        this.reporterEmail = reporterEmail;
    }

    public String getIncidentDetails() {
        return incidentDetails;
    }

    public void setIncidentDetails(String incidentDetails) {
        this.incidentDetails = incidentDetails;
    }

    public LocalDateTime getReportedDateTime() {
        return reportedDateTime;
    }

    public void setReportedDateTime(LocalDateTime reportedDateTime) {
        this.reportedDateTime = reportedDateTime;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static String generateIncidentId() {
        Random random = new Random();
        int randomNumber = 10000 + random.nextInt(90000); // Generate a 5-digit number
        int currentYear = LocalDateTime.now().getYear();
        return "RMG" + randomNumber + currentYear;
    }
}
