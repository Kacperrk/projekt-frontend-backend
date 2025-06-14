package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import com.example.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.EnumSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional
    public UserDto create(UserDto dto) {
        validateRole(dto.getRole());

        User saved = userRepository.save(userMapper.toEntity(dto));
        return userMapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public UserDto getById(Long id) {
        return userMapper.toDto(getActive(id));
    }

    @Transactional(readOnly = true)
    public List<UserDto> getAll() {
        return userRepository.findAllByArchivedFalse()
                .stream().map(userMapper::toDto).toList();
    }

    @Transactional
    public UserDto update(Long id, UserDto dto) {
        validateRole(dto.getRole());

        User user = getActive(id);
        userMapper.updateEntity(user, dto);
        return userMapper.toDto(userRepository.save(user));
    }

    @Transactional
    public void archive(Long id) {
        User user = getActive(id);
        user.setArchived(true);
        userRepository.save(user);
    }

    private User getActive(Long id) {
        return userRepository.findByIdAndArchivedFalse(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    private void validateRole(UserRole role) {
        if (role == null || !EnumSet.allOf(UserRole.class).contains(role)) {
            throw new IllegalArgumentException("Invalid role: " + role);
        }
    }
}
