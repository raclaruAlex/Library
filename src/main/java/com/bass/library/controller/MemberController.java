package com.bass.library.controller;

import com.bass.library.db.entity.Member;
import com.bass.library.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController
{
    @Autowired
    private MemberRepository memberRepository;

    @RequestMapping(value = "/get-member-details-by-lastname", method = RequestMethod.GET, produces="application/json")
    public ResponseEntity<List<Member>> getMemberByLastName(String lastname) {
        List<Member> members = memberRepository.getMemberByLastName(lastname);
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @RequestMapping(value = "/add-member", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Member> addMember(@RequestBody Member member)
    {
        memberRepository.save(member);
        return new ResponseEntity<>(member, HttpStatus.CREATED);
    }
}
