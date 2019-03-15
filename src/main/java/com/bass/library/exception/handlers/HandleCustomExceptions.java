package com.bass.library.exception.handlers;

import com.bass.library.exception.CustomException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class HandleCustomExceptions extends ResponseEntityExceptionHandler
{
    private static final Logger LOGGER = LoggerFactory.getLogger(HandleCustomExceptions.class);

    @ExceptionHandler(CustomException.class)
    public final ResponseEntity<String> handleCustomExceptions(CustomException e)
    {
        LOGGER.error(e.getMessage(), e);
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-app-alert", e.getMessage());

        return new ResponseEntity<>(e.getMessage(), headers, e.getHttpStatus());
    }

}
