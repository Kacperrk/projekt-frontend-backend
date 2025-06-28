package com.example.demo.exception;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.MissingServletRequestParameterException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.validation.BindException;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException ex) {
        log.error("Not Found {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        log.error("Bad Request {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException ex) {
        log.error("Bad Request {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("error", "Bad Request");

        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        response.put("errors", fieldErrors);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        log.error("Data integrity violation {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        return Map.of("error", "Data integrity violation: constraints: " + ex.getMostSpecificCause().getMessage());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleJsonParseError(HttpMessageNotReadableException ex) {
        log.error("Bad Request {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        Throwable rootCause = ex.getCause();

        if (rootCause instanceof InvalidFormatException invalidFormatException &&
                invalidFormatException.getTargetType().isEnum()) {
            String fieldName = invalidFormatException.getPath().isEmpty()
                    ? "unknown"
                    : invalidFormatException.getPath().getFirst().getFieldName();
            String wrongValue = invalidFormatException.getValue().toString();
            Class<?> enumClass = invalidFormatException.getTargetType();

            String allowedValues = String.join(", ",
                    Arrays.stream(enumClass.getEnumConstants())
                            .map(Object::toString)
                            .toList());

            Map<String, Object> response = new HashMap<>();
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("error", "Bad Request");
            response.put("message", String.format(
                    "Invalid value '%s' for field '%s'. Allowed values: [%s]",
                    wrongValue, fieldName, allowedValues
            ));
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.badRequest().body(Map.of(
                "status", HttpStatus.BAD_REQUEST.value(),
                "error", "Bad Request",
                "message", "Invalid JSON input"
        ));
    }

    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleIllegalState(IllegalStateException ex) {
        log.error("Bad Request {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        return Map.of(
                "status", HttpStatus.BAD_REQUEST.value(),
                "error", "Bad Request",
                "message", ex.getMessage()
        );
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleMissingRequestParam(MissingServletRequestParameterException ex) {
        log.error("Bad Request {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        return Map.of(
                "status", HttpStatus.BAD_REQUEST.value(),
                "error", "Bad Request",
                "message", String.format("Missing request parameter: %s", ex.getParameterName())
        );
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleConstraintViolation(ConstraintViolationException ex) {
        log.error("Bad Request {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        var errors = ex.getConstraintViolations()
                .stream()
                .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                .toList();

        return Map.of(
                "status", HttpStatus.BAD_REQUEST.value(),
                "error", "Bad Request",
                "messages", errors
        );
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        log.error("Bad Request {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        String expectedType = ex.getRequiredType() != null
                ? ex.getRequiredType().getSimpleName()
                : "unknown";

        return Map.of(
                "status", HttpStatus.BAD_REQUEST.value(),
                "error", "Bad Request",
                "message", String.format("Parameter '%s' should be of type '%s'", ex.getName(), expectedType)
        );
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<Map<String, Object>> handleBindException(BindException ex) {
        log.error("Bad Request {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return ResponseEntity.badRequest().body(Map.of(
                "status", HttpStatus.BAD_REQUEST.value(),
                "error", "Bad Request",
                "errors", fieldErrors
        ));
    }

    @ExceptionHandler(MissingPathVariableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleMissingPathVariable(MissingPathVariableException ex) {
        log.error("Bad Request {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        return Map.of(
                "status", HttpStatus.BAD_REQUEST.value(),
                "error", "Bad Request",
                "message", String.format("Missing path variable: %s", ex.getVariableName())
        );
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public Map<String, Object> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
        log.error("Method Not Allowed {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        return Map.of(
                "status", HttpStatus.METHOD_NOT_ALLOWED.value(),
                "error", "Method Not Allowed",
                "message", String.format("Method '%s' not allowed. Supported: %s",
                        ex.getMethod(),
                        ex.getSupportedMethods() != null
                                ? String.join(", ", ex.getSupportedMethods())
                                : "unknown")
        );
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, Object> handleNoHandlerFound(NoHandlerFoundException ex) {
        log.error("{} 404 Not Found - {} {}", ex.getClass().getSimpleName(), ex.getHttpMethod(), ex.getRequestURL(), ex);

        return Map.of(
                "status", 404,
                "error", "Not Found",
                "message", String.format("No endpoint found for %s %s", ex.getHttpMethod(), ex.getRequestURL())
        );
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> handleGenericException(Exception ex) {
        log.error("Unhandled exception occurred {}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);

        return Map.of(
                "status", HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "error", "Internal Server Error",
                "message", "Unexpected error occurred - unhandled in GlobalExceptionHandler"
        );
    }
}
