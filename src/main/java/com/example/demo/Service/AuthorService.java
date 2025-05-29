package com.example.demo.service;

import com.example.demo.model.Author;
import com.example.demo.repository.AuthorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorService {
    private final AuthorRepository authorRepository;

    public Author create(Author author) {
        return authorRepository.save(author);
    }

    public Author getById(Long id) {
        return authorRepository.findByIdAndArchivedFalse(id)
                .orElseThrow(() -> new EntityNotFoundException("Author not found"));
    }

    public List<Author> getAll() {
        return authorRepository.findAllByArchivedFalse();
    }

    public void archive(Long id) {
        Author author = getById(id);
        author.setArchived(true);
        authorRepository.save(author);
    }

    public Author update(Long id, Author updatedAuthor) {
        Author author = getById(id);
        author.setFirstName(updatedAuthor.getFirstName());
        author.setLastName(updatedAuthor.getLastName());
        return authorRepository.save(author);
    }
}
