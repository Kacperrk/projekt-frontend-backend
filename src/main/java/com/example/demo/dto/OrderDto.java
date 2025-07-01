package com.example.demo.dto;

import com.example.demo.model.OrderStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class OrderDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long userId;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String userEmail;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDateTime orderDate;

    private OrderStatus status;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private BigDecimal totalPrice;

    @Size(max = 100)
    private String street;

    @Size(max = 10)
    private String buildingNumber;

    @Size(max = 10)
    private String apartmentNumber;

    @Size(max = 10)
    private String postalCode;

    @Size(max = 100)
    private String city;

    @Size(max = 100)
    private String country;
}
