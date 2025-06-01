package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import com.example.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.EnumSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User create(User user) {
        validateRole(user.getRole());

        return userRepository.save(user);
    }

    public User getById(Long id) {
        return userRepository.findByIdAndArchivedFalse(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public List<User> getAll() {
        return userRepository.findAllByArchivedFalse();
    }

    public void archive(Long id) {
        User user = getById(id);
        user.setArchived(true);
        userRepository.save(user);
    }

    public User update(Long id, User updatedUser) {
        validateRole(updatedUser.getRole());

        User user = getById(id);
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setRole(updatedUser.getRole());
        return userRepository.save(user);
    }

    private void validateRole(UserRole role) {
        if (role == null || !EnumSet.allOf(UserRole.class).contains(role)) {
            throw new IllegalArgumentException("Invalid role: " + role);
        }
    }
}
