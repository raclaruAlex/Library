package com.bass.library.controller;

import com.bass.library.db.entity.BookCategory;
import com.bass.library.db.entity.Member;
import com.bass.library.db.repository.BookCategoryRepository;
import com.bass.library.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/administration")
public class AdministrationController
{
    @Autowired
    private BookCategoryRepository bookCategoryRepository;

    @Autowired
    private MemberRepository memberRepository;

    @RequestMapping("/all-categories")
    public ResponseEntity<List<BookCategory>> retrieveAllCategories()
    {
        return new ResponseEntity<>(bookCategoryRepository.findAll(), HttpStatus.OK);
    }

    @RequestMapping("/all-members")
    public ResponseEntity<List<Member>> retrieveAllMembers()
    {
        return new ResponseEntity<>(memberRepository.findAll(), HttpStatus.OK);
    }

}
