package com.example.demo.controller;

import com.example.demo.dto.OrderItemDto;
import com.example.demo.service.OrderItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-items")
@RequiredArgsConstructor
public class OrderItemController {
    private final OrderItemService orderItemService;

    @PostMapping
    public OrderItemDto create(@Valid @RequestBody OrderItemDto dto) {
        return orderItemService.create(dto);
    }

    @GetMapping("/{id}")
    public OrderItemDto getById(@PathVariable Long id) {
        return orderItemService.getById(id);
    }

    @GetMapping
    public List<OrderItemDto> getAll() {
        return orderItemService.getAll();
    }

    @PutMapping("/{id}")
    public OrderItemDto update(@PathVariable Long id, @Valid @RequestBody OrderItemDto dto) {
        return orderItemService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void archive(@PathVariable Long id) {
        orderItemService.archive(id);
    }
}
