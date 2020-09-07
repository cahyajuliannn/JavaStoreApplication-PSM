package com.miniproject.projectkelompok2.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import com.miniproject.projectkelompok2.configuration.handler.CustomAccessDeniedHandler;
import com.miniproject.projectkelompok2.configuration.handler.CustomAuthenticationSuccessHandler;
import com.miniproject.projectkelompok2.configuration.handler.CustomLogoutSuccessHandler;
import com.miniproject.projectkelompok2.service.UserSecurityService;



@EnableWebSecurity
public class AppSecurityConfiguration {
	
	 @Autowired
	    private UserSecurityService userService;

	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder(11);
	    }

	    @Bean
	    public LogoutSuccessHandler logoutSuccessHandler() {
	        return new CustomLogoutSuccessHandler();
	    }

	    @Bean
	    public AccessDeniedHandler accessDeniedHandler() {
	        return new CustomAccessDeniedHandler();
	    }

	    @Bean
	    public DaoAuthenticationProvider authenticationProvider() {
	        final DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
	        authProvider.setUserDetailsService(userService);
	        authProvider.setPasswordEncoder(passwordEncoder());
	        return authProvider;
	    }

	    @Bean
	    public MyBasicAuthenticationEntryPoint myBasicAuthenticationEntryPoint() {
	        return new MyBasicAuthenticationEntryPoint();
	    }

	    @Bean
	    public AuthenticationSuccessHandler myAuthenticationSuccessHandler() {
	        return new CustomAuthenticationSuccessHandler();
	    }

}
