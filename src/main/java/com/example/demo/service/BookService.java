package com.example.demo.service;

import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public Book create(Book book) {
        return bookRepository.save(book);
    }

    public Book getById(Long id) {
        return bookRepository.findByIdAndArchivedFalse(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found"));
    }

    public List<Book> getAll() {
        return bookRepository.findAllByArchivedFalse();
    }

    public void archive(Long id) {
        Book book = getById(id);
        book.setArchived(true);
        bookRepository.save(book);
    }

    public Book update(Long id, Book updatedBook) {
        Book book = getById(id);
        book.setTitle(updatedBook.getTitle());
        book.setDescription(updatedBook.getDescription());
        book.setPrice(updatedBook.getPrice());
        book.setStockQuantity(updatedBook.getStockQuantity());
        book.setPublishedDate(updatedBook.getPublishedDate());
        book.setCoverUrl(updatedBook.getCoverUrl());
        book.setAuthor(updatedBook.getAuthor());
        return bookRepository.save(book);
    }
}
