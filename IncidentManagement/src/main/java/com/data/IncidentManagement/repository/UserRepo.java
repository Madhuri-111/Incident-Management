package com.data.IncidentManagement.repository;

import com.data.IncidentManagement.entity.UserDetails;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepo extends CrudRepository<UserDetails, Long> {
    Optional<UserDetails> findByEmail(String email);
    @Transactional
    @Modifying
    public void deleteByEmail(String email);
    boolean existsByEmail(String email);
}
