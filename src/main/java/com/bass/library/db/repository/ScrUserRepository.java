package com.bass.library.db.repository;

import com.bass.library.db.entity.ScrUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScrUserRepository extends JpaRepository<ScrUser, Integer>
{
    Optional<ScrUser> findByUsername(String username );
}
