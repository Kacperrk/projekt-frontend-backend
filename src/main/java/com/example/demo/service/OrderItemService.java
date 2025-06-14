package com.example.demo.service;

import com.example.demo.dto.OrderItemDto;
import com.example.demo.mapper.OrderItemMapper;
import com.example.demo.model.Book;
import com.example.demo.model.Order;
import com.example.demo.model.OrderItem;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final OrderItemMapper mapper;
    private final OrderService orderService;

    @Transactional
    public OrderItemDto create(OrderItemDto dto) {
        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        Book book = bookRepository.findById(dto.getBookId())
                .orElseThrow(() -> new EntityNotFoundException("Book not found"));

        OrderItem entity = mapper.toEntity(dto, order, book);
        entity.setUnitPrice(book.getPrice());
        OrderItem saved = orderItemRepository.save(entity);
        orderService.updateTotalPrice(order.getId());
        return mapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public OrderItemDto getById(Long id) {
        return mapper.toDto(getActive(id));
    }

    @Transactional(readOnly = true)
    public List<OrderItemDto> getAll() {
        return orderItemRepository.findAllByArchivedFalse()
                .stream()
                .map(mapper::toDto)
                .toList();
    }

    @Transactional
    public OrderItemDto update(Long id, OrderItemDto dto) {
        OrderItem item = getActive(id);

        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        Book book = bookRepository.findById(dto.getBookId())
                .orElseThrow(() -> new EntityNotFoundException("Book not found"));

        mapper.updateEntity(item, dto, order, book);
        item.setUnitPrice(book.getPrice());
        OrderItem updated = orderItemRepository.save(item);
        orderService.updateTotalPrice(order.getId());
        return mapper.toDto(updated);
    }

    @Transactional
    public void archive(Long id) {
        OrderItem item = getActive(id);
        item.setArchived(true);
        orderItemRepository.save(item);

        orderService.updateTotalPrice(item.getOrder().getId());
    }

    private OrderItem getActive(Long id) {
        return orderItemRepository.findByIdAndArchivedFalse(id)
                .orElseThrow(() -> new EntityNotFoundException("OrderItem not found"));
    }
}
