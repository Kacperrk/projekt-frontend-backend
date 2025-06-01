package com.example.demo.service;

import com.example.demo.model.Order;
import com.example.demo.model.OrderStatus;
import com.example.demo.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.EnumSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public Order create(Order order) {
        validateStatus(order.getStatus());

        return orderRepository.save(order);
    }

    public Order getById(Long id) {
        return orderRepository.findByIdAndArchivedFalse(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
    }

    public List<Order> getAll() {
        return orderRepository.findAllByArchivedFalse();
    }

    public void archive(Long id) {
        Order order = getById(id);
        order.setArchived(true);
        orderRepository.save(order);
    }

    public Order update(Long id, Order updatedOrder) {
        validateStatus(updatedOrder.getStatus());

        Order order = getById(id);
        order.setUser(updatedOrder.getUser());
        order.setOrderDate(updatedOrder.getOrderDate());
        order.setStatus(updatedOrder.getStatus());
        order.setTotalPrice(updatedOrder.getTotalPrice());
        order.setStreet(updatedOrder.getStreet());
        order.setBuildingNumber(updatedOrder.getBuildingNumber());
        order.setApartmentNumber(updatedOrder.getApartmentNumber());
        order.setPostalCode(updatedOrder.getPostalCode());
        order.setCity(updatedOrder.getCity());
        order.setCountry(updatedOrder.getCountry());
        return orderRepository.save(order);
    }

    private void validateStatus(OrderStatus status) {
        if (status == null || !EnumSet.allOf(OrderStatus.class).contains(status)) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }
    }
}
