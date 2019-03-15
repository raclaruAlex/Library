package com.bass.library.controller;

import com.bass.library.db.entity.ScrUser;
import com.bass.library.db.repository.ScrUserRepository;
import com.bass.library.exception.CustomException;
import com.bass.library.security.JWTConfigurer;
import com.bass.library.security.TokenProvider;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AutheticationJWTController
{
    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    @Autowired
    private ScrUserRepository scrUserRepository;

    public AutheticationJWTController(TokenProvider tokenProvider, AuthenticationManager authenticationManager)
    {
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JWTToken> authenticate(HttpServletRequest request, @Valid @RequestBody ScrUser user) throws CustomException
    {
        Optional<ScrUser> usr = scrUserRepository.findByUsername(user.getUsername());
        if (!usr.isPresent())
        {
            throw new CustomException("Username or password incorect");
        }
        ScrUser scrUser = usr.get();
        if (scrUser == null)
        {
            throw new CustomException("User not found");
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken( user.getUsername( ), user.getPassword( ) );
        Authentication authentication;
        try
        {
            authentication = this.authenticationManager.authenticate( authenticationToken );
        }
        catch (BadCredentialsException be)
        {
            throw new CustomException("Username or password incorrect");
        }

        SecurityContextHolder.getContext( ).setAuthentication( authentication );

        String      jwt         = tokenProvider.createToken( authentication );
        HttpHeaders httpHeaders = new HttpHeaders( );
        httpHeaders.add( JWTConfigurer.AUTHORIZATION_HEADER, "Bearer " + jwt );
        return new ResponseEntity<>( new JWTToken( jwt ), httpHeaders, HttpStatus.OK );
    }

    /**
     * Object to return as body in JWT Authentication.
     */
    static class JWTToken
    {
        private String idToken;

        JWTToken(String idToken)
        {
            this.idToken = idToken;
        }

        @JsonProperty("id_token")
        String getIdToken()
        {
            return idToken;
        }

        void setIdToken(String idToken)
        {
            this.idToken = idToken;
        }
    }

}
