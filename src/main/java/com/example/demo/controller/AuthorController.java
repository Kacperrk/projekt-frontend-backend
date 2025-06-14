package com.example.demo.controller;

import com.example.demo.dto.AuthorDto;
import com.example.demo.service.AuthorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
@RequiredArgsConstructor
public class AuthorController {
    private final AuthorService authorService;

    @PostMapping
    public AuthorDto create(@Valid @RequestBody AuthorDto dto) {
        return authorService.create(dto);
    }

    @GetMapping("/{id}")
    public AuthorDto getById(@PathVariable Long id) {
        return authorService.getById(id);
    }

    @GetMapping
    public List<AuthorDto> getAll() {
        return authorService.getAll();
    }

    @PutMapping("/{id}")
    public AuthorDto update(@PathVariable Long id, @Valid @RequestBody AuthorDto dto) {
        return authorService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void archive(@PathVariable Long id) {
        authorService.archive(id);
    }
}
