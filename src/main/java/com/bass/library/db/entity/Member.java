package com.bass.library.db.entity;

import javax.persistence.*;

@Entity
@Table(name = "members", schema = "library")
public class Member
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "lastname")
    private   String lastname;
    @Basic
    @Column(name = "firstname")
    private    String firstname;
    @Basic
    @Column(name = "address")
    private   String address;
    @Basic
    @Column(name = "phone_number")
    private   String phoneNumber;
    @Basic
    @Column(name = "email")
    private   String email;

    public Integer getId()
    {
        return id;
    }

    public String getLastname()
    {
        return lastname;
    }

    public String getFirstname()
    {
        return firstname;
    }

    public String getAddress()
    {
        return address;
    }

    public String getPhoneNumber()
    {
        return phoneNumber;
    }

    public String getEmail()
    {
        return email;
    }
}
