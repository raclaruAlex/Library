package com.bass.library.db.repository;

import com.bass.library.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Integer>
{
    @Query(value = "SELECT * FROM members m WHERE upper(m.lastname) like upper(CONCAT(?1, '%'))", nativeQuery = true)
    List<Member> getMemberByLastName(String lastname);
}
