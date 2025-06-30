package com.example.demo.service;

import com.example.demo.dto.OrderDto;
import com.example.demo.mapper.OrderMapper;
import com.example.demo.model.Order;
import com.example.demo.model.OrderStatus;
import com.example.demo.model.User;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.EnumSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderMapper mapper;
    private final OrderItemRepository orderItemRepository;

    @Transactional
    public OrderDto create(OrderDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Order order = mapper.toEntity(dto, user);
        order.setStatus(OrderStatus.PENDING);
        Order saved = orderRepository.save(order);

        return mapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public OrderDto getById(Long id) {
        return mapper.toDto(getActive(id));
    }

    @Transactional(readOnly = true)
    public List<OrderDto> getAll() {
        return orderRepository.findAllByArchivedFalse()
                .stream().map(mapper::toDto).toList();
    }

    @Transactional
    public OrderDto update(Long id, OrderDto dto) {
        Order order = getActive(id);
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        mapper.updateEntity(order, dto, user);

        if (dto.getStatus() != null && dto.getStatus() != order.getStatus()) {
            validateStatus(dto.getStatus());
            order.setStatus(dto.getStatus());
        }

        BigDecimal total = calculateTotalPrice(order.getId());
        order.setTotalPrice(total);

        return mapper.toDto(orderRepository.save(order));
    }

    @Transactional
    public void archive(Long id) {
        Order order = getActive(id);
        order.setArchived(true);
        orderRepository.save(order);
    }

    private Order getActive(Long id) {
        return orderRepository.findByIdAndArchivedFalse(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
    }

    private void validateStatus(OrderStatus status) {
        if (status == null || !EnumSet.allOf(OrderStatus.class).contains(status)) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }
    }

    private BigDecimal calculateTotalPrice(Long orderId) {
        return orderItemRepository.findAllByOrderIdAndArchivedFalse(orderId).stream()
                .map(item -> item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Transactional
    public void updateTotalPrice(Long orderId) {
        Order order = getActive(orderId);
        BigDecimal total = calculateTotalPrice(orderId);
        order.setTotalPrice(total);
        orderRepository.save(order);
    }
}
