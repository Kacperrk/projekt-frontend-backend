package com.example.demo.mapper;

import com.example.demo.dto.BookDto;
import com.example.demo.model.Book;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BookMapper {

    BookDto toDto(Book book);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "archived", constant = "false")
    Book toEntity(BookDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(@MappingTarget Book book, BookDto dto);
}
