package com.data.IncidentManagement.repository;

import com.data.IncidentManagement.entity.IncidentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IncidentRepo extends JpaRepository<IncidentDetails, Long> {

    boolean existsByIncidentId(String incidentId);
    List<IncidentDetails> findAllByReporterEmail(String email);

    @Override
    Optional<IncidentDetails> findById(Long aLong);

    Optional<IncidentDetails> findByIncidentId(String incidentId);
}
