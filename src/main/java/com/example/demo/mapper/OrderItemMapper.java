package com.example.demo.mapper;

import com.example.demo.dto.OrderItemDto;
import com.example.demo.model.Book;
import com.example.demo.model.Order;
import com.example.demo.model.OrderItem;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {

    @Mapping(source = "order.id", target = "orderId")
    @Mapping(source = "book.id", target = "bookId")
    OrderItemDto toDto(OrderItem item);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "order", expression = "java(order)")
    @Mapping(target = "book", expression = "java(book)")
    @Mapping(target = "archived", constant = "false")
    OrderItem toEntity(OrderItemDto dto, @Context Order order, @Context Book book);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "order", expression = "java(order)")
    @Mapping(target = "book", expression = "java(book)")
    void updateEntity(@MappingTarget OrderItem item, OrderItemDto dto, @Context Order order, @Context Book book);
}
