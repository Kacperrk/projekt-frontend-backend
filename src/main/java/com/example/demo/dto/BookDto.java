package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BookDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @NotBlank
    @Size(max = 200)
    private String title;

    @Size(max = 10000)
    private String description;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal price;

    @NotNull
    @Min(0)
    private Integer stockQuantity;

    private LocalDate publishedDate;

    @Size(max = 1000)
    private String coverUrl;

    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long authorId;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String authorFirstName;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String authorLastName;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private boolean archived;
}
