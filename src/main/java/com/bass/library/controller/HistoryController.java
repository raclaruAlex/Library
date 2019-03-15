package com.bass.library.controller;

import com.bass.library.db.entity.BookRentalHistory;
import com.bass.library.db.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class HistoryController
{
    @Autowired
    private HistoryRepository historyRepository;

    @GetMapping("/get-history-for-member")
    public ResponseEntity<List<BookRentalHistory>> getRentalHistoryByMemberId(Integer memberId) {
        return new ResponseEntity<>(historyRepository.findBookRentalHistoriesByMember_IdOrderByRentalDateAsc(memberId), HttpStatus.OK);
    }

    @GetMapping("/get-history-for-book")
    public ResponseEntity<List<BookRentalHistory>> getRentalHistoryByBookId(Integer bookId) {
        return new ResponseEntity<>(historyRepository.findBookRentalHistoriesByBook_IdAndReturnDateIsNull(bookId), HttpStatus.OK);
    }
}
