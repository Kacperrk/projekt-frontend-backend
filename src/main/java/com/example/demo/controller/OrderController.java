package com.example.demo.controller;

import com.example.demo.model.Order;
import com.example.demo.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public Order create(@RequestBody Order order) {
        return orderService.create(order);
    }

    @GetMapping("/{id}")
    public Order getById(@PathVariable Long id) {
        return orderService.getById(id);
    }

    @GetMapping
    public List<Order> getAll() {
        return orderService.getAll();
    }

    @PutMapping("/{id}")
    public Order update(@PathVariable Long id, @RequestBody Order updatedOrder) {
        return orderService.update(id, updatedOrder);
    }

    @DeleteMapping("/{id}")
    public void archive(@PathVariable Long id) {
        orderService.archive(id);
    }
}
