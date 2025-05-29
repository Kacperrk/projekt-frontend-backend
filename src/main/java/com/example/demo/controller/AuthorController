package com.example.demo.controller;

import com.example.demo.model.Author;
import com.example.demo.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
@RequiredArgsConstructor
public class AuthorController {
    private final AuthorService authorService;

    @PostMapping
    public Author create(@RequestBody Author author) {
        return authorService.create(author);
    }

    @GetMapping("/{id}")
    public Author getById(@PathVariable Long id) {
        return authorService.getById(id);
    }

    @GetMapping
    public List<Author> getAll() {
        return authorService.getAll();
    }

    @PutMapping("/{id}")
    public Author update(@PathVariable Long id, @RequestBody Author updatedAuthor) {
        return authorService.update(id, updatedAuthor);
    }

    @DeleteMapping("/{id}")
    public void archive(@PathVariable Long id) {
        authorService.archive(id);
    }
}
