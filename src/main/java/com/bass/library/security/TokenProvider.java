package com.bass.library.security;

import com.bass.library.db.entity.ScrUser;
import com.bass.library.db.repository.ScrUserRepository;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class TokenProvider
{

    //Used value
    private final        Logger LOGGER          = LoggerFactory.getLogger(TokenProvider.class);
    @Value("${app.jwtSecret}")
    private              String secretKey;

    @Value("${app.jwtExpirationInMs}")
    private long tokenValidityInMilliseconds;

    @Autowired
    private ScrUserRepository scrUserRepository;

    private static final String AUTHORITIES_KEY = "role";

    public String createToken( Authentication authentication )
    {
        String authorities = authentication.getAuthorities( ).stream( ).map( GrantedAuthority::getAuthority ).collect( Collectors.joining( "," ) );

        long now      = ( new Date( ) ).getTime( );
        Date validity = new Date( now + this.tokenValidityInMilliseconds );

        Optional<ScrUser> user    = scrUserRepository.findByUsername( authentication.getName( ) );
        ScrUser           scrUser = user.orElseThrow( ( ) -> new UsernameNotFoundException( "No user found with username " + authentication.getName( ) ) );

        return Jwts.builder( ).setSubject( authentication.getName( ) ).claim( AUTHORITIES_KEY, authorities ).claim( "fullname", scrUser.getFullname( ) )
               .signWith( SignatureAlgorithm.HS512, secretKey ).setExpiration( validity ).compact( );
    }

    public Authentication getAuthentication(String token)
    {
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(",")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());

        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public boolean validateToken(String authToken)
    {
        try
        {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
            return true;
        }
        catch (SignatureException e)
        {
            LOGGER.info("Invalid JWT signature.");
            LOGGER.trace("Invalid JWT signature trace: {}", e);
        }
        catch (MalformedJwtException e)
        {
            LOGGER.info("Invalid JWT token.");
            LOGGER.trace("Invalid JWT token trace: {}", e);
        }
        catch (ExpiredJwtException e)
        {
            LOGGER.info("Expired JWT token.");
            LOGGER.trace("Expired JWT token trace: {}", e);
        }
        catch (UnsupportedJwtException e)
        {
            LOGGER.info("Unsupported JWT token.");
            LOGGER.trace("Unsupported JWT token trace: {}", e);
        }
        catch (IllegalArgumentException e)
        {
            LOGGER.info("JWT token compact of handler are invalid.");
            LOGGER.trace("JWT token compact of handler are invalid trace: {}", e);
        }
        return false;
    }
}
