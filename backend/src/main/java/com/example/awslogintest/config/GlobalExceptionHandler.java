package com.example.awslogintest.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAllExceptions(Exception e) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("error", e.getClass().getSimpleName());
        body.put("message", e.getMessage());

        Throwable cause = e.getCause();
        if (cause != null) {
            body.put("cause", cause.getClass().getSimpleName());
            body.put("causeMessage", cause.getMessage());

            Throwable rootCause = cause.getCause();
            if (rootCause != null) {
                body.put("rootCause", rootCause.getClass().getSimpleName());
                body.put("rootCauseMessage", rootCause.getMessage());
            }
        }

        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
