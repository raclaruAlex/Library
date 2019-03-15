package com.bass.library;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages={
        "com.bass.library"})
public class LibraryApplication
{
    public static void main(String[] args) {
        SpringApplication.run(LibraryApplication.class, args);
    }
}
