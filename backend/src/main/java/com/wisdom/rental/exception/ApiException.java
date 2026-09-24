package com.wisdom.rental.exception;

public class ApiException extends RuntimeException {
    public ApiException(String m) {
        super(m);
    }
}
