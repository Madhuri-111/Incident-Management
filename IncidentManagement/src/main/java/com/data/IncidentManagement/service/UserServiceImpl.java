package com.data.IncidentManagement.service;

import com.data.IncidentManagement.entity.UserDetails;
import com.data.IncidentManagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepo repo;

    @Override
    public String registerUser(UserDetails userDetails) {
        if(userDetails!=null)
         repo.save(userDetails);
        Long id= userDetails.getId();
        return "User details have been inserted with user id "+ id;
    }

    @Override
    public boolean validateCredentials(String email, String password) {
        Optional<UserDetails> userOptional = repo.findByEmail(email);
    if(userOptional.isPresent()){
        UserDetails user=userOptional.get();
        return password.equals(user.getPassword());
        }
    return false;
    }

    @Override
    public Optional<UserDetails> getUserByEmail(String email){
        Optional<UserDetails> user = repo.findByEmail(email);
        if(user.isPresent()){
            return user;
        }
        return Optional.empty();
    }

    @Override
    public String updatePassword(String password, String email){

        UserDetails user = repo.findByEmail(email)
                        .orElseThrow(()-> new RuntimeException("User not found."));

        user.setPassword(password);
        return "Password changed successfully.";
    }

    @Override
    public String deleteUser(String email) {
        if(repo.existsByEmail(email)) {
            repo.deleteByEmail(email);
            return "Successfully Deleted the user";
        }
        else{
            return "User doesn't exist";
        }
    }
}
