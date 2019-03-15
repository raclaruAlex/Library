package com.bass.library.service.impl;

import com.bass.library.db.entity.ScrRole;
import com.bass.library.db.entity.ScrUser;
import com.bass.library.db.repository.ScrUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserDetailsServiceImpl implements UserDetailsService
{
    @Autowired
    private ScrUserRepository scrUserRepository;
    
    @Override
    @Transactional( readOnly = true )
    public UserDetails loadUserByUsername(String username ) throws UsernameNotFoundException
    {
        Optional<ScrUser> user    = scrUserRepository.findByUsername( username );
        ScrUser           scrUser = user.orElseThrow( ( ) -> new UsernameNotFoundException( "No user found with username " + username ) );
        
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>( );
        ScrRole role               = scrUser.getRole( );
        grantedAuthorities.add( new SimpleGrantedAuthority( role.getCode( ) ) );
        
        return new User( scrUser.getUsername( ), scrUser.getPassword( ), grantedAuthorities );
    }
}
