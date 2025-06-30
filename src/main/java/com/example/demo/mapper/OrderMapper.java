package com.example.demo.mapper;

import com.example.demo.dto.OrderDto;
import com.example.demo.model.Order;
import com.example.demo.model.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.email", target = "userEmail")
    OrderDto toDto(Order order);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", expression = "java(user)")
    @Mapping(target = "archived", constant = "false")
    @Mapping(target = "status",   source = "status", defaultValue = "PENDING")
    Order toEntity(OrderDto dto, @Context User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user", expression = "java(user)")
    void updateEntity(@MappingTarget Order order, OrderDto dto, @Context User user);
}
