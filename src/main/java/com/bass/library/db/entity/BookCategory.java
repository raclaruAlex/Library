package com.bass.library.db.entity;

import javax.persistence.*;

@Entity
@Table(name = "book_categories", schema = "library")
public class BookCategory
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "description")
    private String description;

    public Integer getId()
    {
        return id;
    }

    public String getDescription()
    {
        return description;
    }
}
