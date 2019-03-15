package com.bass.library.security;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfiguration
{
    @Bean
    public FilterRegistrationBean filterRegistrationBean()
    {
        return new FilterRegistrationBean(new CustomHeaderFilter());
    }

}
