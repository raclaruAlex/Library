package com.bass.library.security;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomHeaderFilter extends OncePerRequestFilter
{
    @Override
    public void destroy()
    {

    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException
    {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, Authorization, X-app-alert,Content-Disposition");
        response.setHeader("Access-Control-Expose-Headers", "Authorization,Content-Type, X-app-alert,Content-Disposition");

        filterChain.doFilter(request, response);
    }
}
