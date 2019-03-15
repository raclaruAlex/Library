package com.bass.library.db.conf;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;

@Configuration
@EnableTransactionManagement
public class DBConfiguration
{
    @Bean
    public PlatformTransactionManager transactionManager()
    {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory());
        return transactionManager;
    }

    @Primary
    @Bean(name = "entityManagerFactory")
    public EntityManagerFactory entityManagerFactory()
    {
        LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
        emf.setDataSource(hikariDataSource());
        emf.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        emf.setPackagesToScan("com.bass.library.db");
        emf.setPersistenceUnitName("primary.datasource");
        emf.afterPropertiesSet();
        return emf.getObject();
    }

    @Primary
    @ConfigurationProperties(prefix = "primary.datasource")
    @Bean(name = "primary", destroyMethod = "close")
    public HikariDataSource hikariDataSource()
    {
        return DataSourceBuilder.create().type(HikariDataSource.class).build();
    }
}
