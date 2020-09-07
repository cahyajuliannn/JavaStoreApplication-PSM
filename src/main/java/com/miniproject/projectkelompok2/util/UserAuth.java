package com.miniproject.projectkelompok2.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.UserRepository;

public class UserAuth {
	
	@Autowired
	private static UserRepository userRepository;
	
	public static User getUser() {
		User user = new User();
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    UserDetails userDetail = (UserDetails) auth.getPrincipal();
	    String use = userDetail.getUsername();
	    user.setUsername(use);
	    return user;
	  
	}

}
