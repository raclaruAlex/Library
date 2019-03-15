package com.bass.library.exception;

import org.springframework.http.HttpStatus;

public class CustomException extends Exception
{

    /**
     *
     */
    private static final long serialVersionUID = -6524026959534647149L;

    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public CustomException(String customMessage)
    {
        super(customMessage);
    }

    public CustomException(String customMessage, Throwable cause)
    {
        super(customMessage, cause);
    }

    public CustomException(String customMessage, HttpStatus httpStatus )
    {
        super( customMessage );
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus()
    {
        return httpStatus;
    }
}
