package com.example.demo.mapper;

import com.example.demo.dto.BookDto;
import com.example.demo.model.Author;
import com.example.demo.model.Book;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BookMapper {

    @Mapping(source = "author.id", target = "authorId")
    @Mapping(source = "author.firstName", target = "authorFirstName")
    @Mapping(source = "author.lastName", target = "authorLastName")
    BookDto toDto(Book book);

    @Mapping(target = "author", expression = "java(author)")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "archived", constant = "false")
    Book toEntity(BookDto dto, @Context Author author);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "author", expression = "java(author)")
    void updateEntity(@MappingTarget Book book, BookDto dto, @Context Author author);
}
