package com.example.demo.controller;

import com.example.demo.model.OrderItem;
import com.example.demo.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-items")
@RequiredArgsConstructor
public class OrderItemController {
    private final OrderItemService orderItemService;

    @PostMapping
    public OrderItem create(@RequestBody OrderItem item) {
        return orderItemService.create(item);
    }

    @GetMapping("/{id}")
    public OrderItem getById(@PathVariable Long id) {
        return orderItemService.getById(id);
    }

    @GetMapping
    public List<OrderItem> getAll() {
        return orderItemService.getAll();
    }

    @PutMapping("/{id}")
    public OrderItem update(@PathVariable Long id, @RequestBody OrderItem updatedItem) {
        return orderItemService.update(id, updatedItem);
    }

    @DeleteMapping("/{id}")
    public void archive(@PathVariable Long id) {
        orderItemService.archive(id);
    }
}
