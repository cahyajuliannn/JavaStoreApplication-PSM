package com.miniproject.projectkelompok2.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.miniproject.projectkelompok2.model.entity.User;

public interface UserSecurityService extends UserDetailsService {

	User save(User user);

}
