package com.bass.library.controller;

import com.bass.library.db.entity.Book;
import com.bass.library.db.entity.BookRentalHistory;
import com.bass.library.db.repository.BookRepository;
import com.bass.library.db.repository.HistoryRepository;
import com.bass.library.dto.RentDTO;
import com.bass.library.exception.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController
{

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @RequestMapping(value = "/get-all-books", method = RequestMethod.GET, produces="application/json")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/get-books-total-quantity")
    public ResponseEntity<Integer> getBooksTotalQuantity() {
        return new ResponseEntity<>(bookRepository.getTotalQuantity(), HttpStatus.OK);
    }

    @GetMapping("/get-books-rental-quantity")
    public ResponseEntity<Integer> getBooksRentalQuantity() {
        return new ResponseEntity<>(bookRepository.getRentalQuantity(), HttpStatus.OK);
    }

    @GetMapping("/get-book-by-id")
    public ResponseEntity<Book> getBookById(Integer id) {
        return new ResponseEntity<>(bookRepository.findById(id).orElse(new Book()), HttpStatus.OK);
    }

    @Transactional
    @RequestMapping(value = "/rent", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public synchronized ResponseEntity<Void> rentBook(@RequestBody RentDTO rentObj) throws CustomException
    {
        Book bookWithAllDetails = bookRepository.findById(rentObj.getBook().getId()).orElse(new Book());
        if(bookWithAllDetails.getQuantity().getRentalQuantity()==bookWithAllDetails.getQuantity().getTotalQuantity())
        {
            throw new CustomException("Nu sunt carti disponibile. Chiria nu este posibila.");
        }
        bookWithAllDetails.getQuantity().setRentalQuantity(bookWithAllDetails.getQuantity().getRentalQuantity()+1);
        bookRepository.save(bookWithAllDetails);
        BookRentalHistory bookRentalHistory = new BookRentalHistory();
        bookRentalHistory.setBook(bookWithAllDetails);
        bookRentalHistory.setMember(rentObj.getMember());
        bookRentalHistory.setRentalDate(LocalDateTime.now());
        historyRepository.save(bookRentalHistory);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Transactional
    @RequestMapping(value = "/return", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public synchronized ResponseEntity<Void> returnBook(@RequestBody RentDTO rentObj) throws CustomException
    {
        Book bookWithAllDetails = bookRepository.findById(rentObj.getBook().getId()).orElse(new Book());
        bookWithAllDetails.getQuantity().setRentalQuantity(bookWithAllDetails.getQuantity().getRentalQuantity()-1);
        bookRepository.save(bookWithAllDetails);
        BookRentalHistory bookRentalHistory =  historyRepository.findBookRentalHistoryByBook_IdAndMember_IdAndReturnDateIsNull(rentObj.getBook().getId(),rentObj.getMember().getId());
        bookRentalHistory.setReturnDate(LocalDateTime.now());
        historyRepository.save(bookRentalHistory);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/add-book", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Book> addBook(@RequestBody Book book)
    {
        book.getQuantity().setBook(book);
        bookRepository.save(book);
        return new ResponseEntity<>(book, HttpStatus.CREATED);
    }
}
