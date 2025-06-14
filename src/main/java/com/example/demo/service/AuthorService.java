package com.example.demo.service;

import com.example.demo.dto.AuthorDto;
import com.example.demo.mapper.AuthorMapper;
import com.example.demo.model.Author;
import com.example.demo.repository.AuthorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthorService {
    private final AuthorRepository authorRepository;
    private final AuthorMapper authorMapper;

    @Transactional
    public AuthorDto create(AuthorDto dto) {
        Author saved = authorRepository.save(authorMapper.toEntity(dto));
        return authorMapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public AuthorDto getById(Long id) {
        return authorMapper.toDto(getActive(id));
    }

    @Transactional(readOnly = true)
    public List<AuthorDto> getAll() {
        return authorRepository.findAllByArchivedFalse()
                .stream()
                .map(authorMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public AuthorDto update(Long id, AuthorDto dto) {
        Author author = getActive(id);
        authorMapper.updateEntity(author, dto);
        return authorMapper.toDto(authorRepository.save(author));
    }

    @Transactional
    public void archive(Long id) {
        Author author = getActive(id);
        author.setArchived(true);
        authorRepository.save(author);
    }

    private Author getActive(Long id) {
        return authorRepository.findByIdAndArchivedFalse(id)
                .orElseThrow(() -> new EntityNotFoundException("Author not found"));
    }
}
