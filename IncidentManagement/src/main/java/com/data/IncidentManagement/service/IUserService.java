package com.data.IncidentManagement.service;

import com.data.IncidentManagement.entity.UserDetails;

import java.util.Optional;

public interface IUserService {

    public String registerUser(UserDetails userDetails);

    public boolean validateCredentials(String email, String password);

    public Optional<UserDetails> getUserByEmail(String email);

    public String updatePassword(String password, String email);

    public String deleteUser(String email);
}
