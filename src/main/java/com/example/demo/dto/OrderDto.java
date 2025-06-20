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

    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long userId;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String userEmail;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDateTime orderDate;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private OrderStatus status;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private BigDecimal totalPrice;

    @NotBlank
    @Size(max = 100)
    private String street;

    @NotBlank
    @Size(max = 10)
    private String buildingNumber;

    @Size(max = 10)
    private String apartmentNumber;

    @NotBlank
    @Size(max = 10)
    private String postalCode;

    @NotBlank
    @Size(max = 100)
    private String city;

    @NotBlank
    @Size(max = 100)
    private String country;
}
