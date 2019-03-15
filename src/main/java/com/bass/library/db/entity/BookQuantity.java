package com.bass.library.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name = "books_quantity", schema = "library")
public class BookQuantity
{
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "total_quantity")
    private Integer totalQuantity;
    @Basic
    @Column(name = "rental_quantity")
    private Integer rentalQuantity;
    @OneToOne
    @MapsId
    @JsonBackReference
    private Book book;

    public Integer getId()
    {
        return id;
    }

    public Integer getTotalQuantity()
    {
        return totalQuantity;
    }

    public Integer getRentalQuantity()
    {
        return rentalQuantity;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public void setTotalQuantity(Integer totalQuantity)
    {
        this.totalQuantity = totalQuantity;
    }

    public void setRentalQuantity(Integer rentalQuantity)
    {
        this.rentalQuantity = rentalQuantity;
    }

    public Book getBook()
    {
        return book;
    }

    public void setBook(Book book)
    {
        this.book = book;
    }
}
