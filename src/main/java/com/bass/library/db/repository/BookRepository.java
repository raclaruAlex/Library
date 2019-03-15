package com.bass.library.db.repository;

import com.bass.library.db.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book, Integer>
{
    @Query(value = "SELECT sum(total_quantity) FROM books b LEFT JOIN books_quantity bq on b.id=bq.book_id ", nativeQuery = true)
    Integer getTotalQuantity();
    @Query(value = "SELECT sum(rental_quantity) FROM books b LEFT JOIN books_quantity bq on b.id=bq.book_id ", nativeQuery = true)
    Integer getRentalQuantity();
}
