package com.miniproject.projectkelompok2.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.miniproject.projectkelompok2.service.UserSecurityService;



@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserSecurityService userService;
    @Autowired
    private AuthenticationSuccessHandler myAuthenticationSuccessHandler;
    
    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService)
                .passwordEncoder(passwordEncoder);
    }
    
    
    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/anonymous*").anonymous()
                .antMatchers("/login*").permitAll()
                .antMatchers("/sign-up*").permitAll()
                .antMatchers("/register*").permitAll()
                .antMatchers("/assets/**").permitAll()
                .antMatchers("/privacy-policy*").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/perform_login")
                .successHandler(myAuthenticationSuccessHandler)
                .failureUrl("/login?error=true")
                .and()
                .logout()
                .logoutUrl("/perform_logout")
                .logoutSuccessUrl("/login?logout=true")
                .deleteCookies("JSESSIONID");
    }
}
