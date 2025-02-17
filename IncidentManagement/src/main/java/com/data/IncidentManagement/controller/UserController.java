package com.data.IncidentManagement.controller;

import com.data.IncidentManagement.dto.LoginRequest;
import com.data.IncidentManagement.entity.UserDetails;
import com.data.IncidentManagement.service.IUserService;
import com.data.IncidentManagement.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserDetails user) {
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        if (userService.validateCredentials(loginRequest.getEmail(), loginRequest.getPassword())) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        try {
            Optional<UserDetails> user = userService.getUserByEmail(email);
            if (user.isPresent()) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found for email: " + email);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @PutMapping("/updatePassword/{email}")
    public String updatePassword(@PathVariable String email, @RequestBody String password){

        return userService.updatePassword(password, email);
    }

    @DeleteMapping("/delete/{email}")
    public String deleteUser(@PathVariable String email){
     return userService.deleteUser(email);
    }

}



