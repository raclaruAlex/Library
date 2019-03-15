package com.bass.library.db.repository;

import com.bass.library.db.entity.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookCategoryRepository extends JpaRepository<BookCategory, Integer>
{

}
