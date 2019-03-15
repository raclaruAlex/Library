package com.bass.library.db.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
@Table(name = "books", schema = "library")
public class Book
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "title")
    private String title;
    @Basic
    @Column(name = "author")
    private String author;
    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH})
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private BookCategory category;
    @Basic
    @Column(name = "publisher")
    private String publisher;
    @Basic
    @Column(name = "publication_year")
    private Integer publicationYear;
    @OneToOne(mappedBy = "book", cascade = CascadeType.ALL)
    @JsonManagedReference
    private BookQuantity quantity;

    public Integer getId()
    {
        return id;
    }

    public String getTitle()
    {
        return title;
    }

    public String getAuthor()
    {
        return author;
    }

    public BookCategory getCategory()
    {
        return category;
    }

    public String getPublisher()
    {
        return publisher;
    }

    public Integer getPublicationYear()
    {
        return publicationYear;
    }

    public BookQuantity getQuantity()
    {
        return quantity;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public void setAuthor(String author)
    {
        this.author = author;
    }

    public void setCategory(BookCategory category)
    {
        this.category = category;
    }

    public void setPublisher(String publisher)
    {
        this.publisher = publisher;
    }

    public void setPublicationYear(Integer publicationYear)
    {
        this.publicationYear = publicationYear;
    }

    public void setQuantity(BookQuantity quantity)
    {
        this.quantity = quantity;
    }


}
