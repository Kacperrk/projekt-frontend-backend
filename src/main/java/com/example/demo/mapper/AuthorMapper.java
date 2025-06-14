package com.example.demo.mapper;

import com.example.demo.dto.AuthorDto;
import com.example.demo.model.Author;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AuthorMapper {

    AuthorDto toDto(Author author);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "archived", constant = "false")
    Author toEntity(AuthorDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(@MappingTarget Author author, AuthorDto dto);
}
