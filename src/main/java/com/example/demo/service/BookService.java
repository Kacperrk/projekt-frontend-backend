package com.example.demo.service;

import com.example.demo.dto.BookDto;
import com.example.demo.mapper.BookMapper;
import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final BookMapper mapper;

    @Transactional
    public BookDto create(BookDto dto) {
        Book saved = bookRepository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public BookDto getById(Long id) {
        return mapper.toDto(getActive(id));
    }

    @Transactional(readOnly = true)
    public List<BookDto> getAll() {
        return bookRepository.findAllByArchivedFalse()
                .stream().map(mapper::toDto).toList();
    }

    @Transactional
    public BookDto update(Long id, BookDto dto) {
        Book book = getActive(id);
        mapper.updateEntity(book, dto);
        return mapper.toDto(bookRepository.save(book));
    }

    @Transactional
    public void archive(Long id) {
        Book book = getActive(id);
        book.setArchived(true);
        bookRepository.save(book);
    }

    private Book getActive(Long id) {
        return bookRepository.findByIdAndArchivedFalse(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found"));
    }
}
