package com.example.demo.service;

import com.example.demo.model.OrderItem;
import com.example.demo.repository.OrderItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;

    public OrderItem create(OrderItem item) {
        return orderItemRepository.save(item);
    }

    public OrderItem getById(Long id) {
        return orderItemRepository.findByIdAndArchivedFalse(id)
                .orElseThrow(() -> new EntityNotFoundException("OrderItem not found"));
    }

    public List<OrderItem> getAll() {
        return orderItemRepository.findAllByArchivedFalse();
    }

    public void archive(Long id) {
        OrderItem item = getById(id);
        item.setArchived(true);
        orderItemRepository.save(item);
    }

    public OrderItem update(Long id, OrderItem updatedItem) {
        OrderItem item = getById(id);
        item.setOrder(updatedItem.getOrder());
        item.setBook(updatedItem.getBook());
        item.setQuantity(updatedItem.getQuantity());
        item.setUnitPrice(updatedItem.getUnitPrice());
        return orderItemRepository.save(item);
    }
}
