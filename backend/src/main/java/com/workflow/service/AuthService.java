package com.workflow.service;

import com.workflow.model.User;
import com.workflow.repository.UserRepository;
import com.workflow.exception.WorkflowException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private SecretKey jwtSecret;

    @PostConstruct
    public void init() {
        jwtSecret = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        
        // Create default admin user if no users exist
        if (userRepository.count() == 0) {
            createDefaultUser();
        }
    }

    private void createDefaultUser() {
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@workflow.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole("ADMIN");
        admin.setCreatedAt(LocalDateTime.now());
        userRepository.save(admin);
    }

    public User register(String username, String email, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new WorkflowException("Username already exists");
        }
        if (userRepository.existsByEmail(email)) {
            throw new WorkflowException("Email already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER");
        user.setCreatedAt(LocalDateTime.now());
        
        return userRepository.save(user);
    }

    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new WorkflowException("Invalid username or password"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new WorkflowException("Invalid username or password");
        }
        
        return user;
    }

    public String generateToken(User user) {
        Date expiration = new Date(System.currentTimeMillis() + 86400000); // 24 hours
        
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("userId", user.getId())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(expiration)
                .signWith(jwtSecret)
                .compact();
    }

    public Claims validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getCurrentUser() {
        // In a real implementation, this would get the user from the security context
        return userRepository.findByUsername("admin").orElse(null);
    }

    public User updateUser(User user) {
        User existingUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new WorkflowException("User not found"));
        
        existingUser.setEmail(user.getEmail());
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        
        return userRepository.save(existingUser);
    }
}
