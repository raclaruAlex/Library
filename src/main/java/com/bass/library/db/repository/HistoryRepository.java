package com.bass.library.db.repository;

import com.bass.library.db.entity.BookRentalHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryRepository extends JpaRepository<BookRentalHistory, Integer>
{
    List<BookRentalHistory> findBookRentalHistoriesByMember_IdOrderByRentalDateAsc(Integer memberId);
    List<BookRentalHistory> findBookRentalHistoriesByBook_IdAndReturnDateIsNull(Integer bookId);
    BookRentalHistory findBookRentalHistoryByBook_IdAndMember_IdAndReturnDateIsNull(Integer bookId,Integer memberId);
}
