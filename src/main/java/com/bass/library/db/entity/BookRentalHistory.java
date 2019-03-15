package com.bass.library.db.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "book_rental_history", schema = "library")
public class BookRentalHistory
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH})
    @JoinColumn(name = "book_id", referencedColumnName = "id")
    private Book book;
    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH})
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;
    @Basic
    @Column(name = "rental_date")
    private  LocalDateTime rentalDate;
    @Basic
    @Column(name = "return_date")
    private  LocalDateTime returnDate;

    public Integer getId()
    {
        return id;
    }

    public Book getBook()
    {
        return book;
    }

    public Member getMember()
    {
        return member;
    }

    public LocalDateTime getRentalDate()
    {
        return rentalDate;
    }

    public LocalDateTime getReturnDate()
    {
        return returnDate;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public void setBook(Book book)
    {
        this.book = book;
    }

    public void setMember(Member member)
    {
        this.member = member;
    }

    public void setRentalDate(LocalDateTime rentalDate)
    {
        this.rentalDate = rentalDate;
    }

    public void setReturnDate(LocalDateTime returnDate)
    {
        this.returnDate = returnDate;
    }
}
