package com.example.demo.repository;

import com.example.demo.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> findByIdAndArchivedFalse(Long id);
    List<Author> findAllByArchivedFalse();
}
