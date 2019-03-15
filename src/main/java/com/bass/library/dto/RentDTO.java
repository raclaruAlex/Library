package com.bass.library.dto;

import com.bass.library.db.entity.Book;
import com.bass.library.db.entity.Member;

public class RentDTO
{
    private Book book;
    private Member member;

    public Book getBook()
    {
        return book;
    }

    public Member getMember()
    {
        return member;
    }
}
