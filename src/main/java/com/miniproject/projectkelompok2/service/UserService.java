package com.miniproject.projectkelompok2.service;

import com.miniproject.projectkelompok2.model.dto.UserDto;
import com.miniproject.projectkelompok2.model.entity.User;

public interface UserService {
	
	UserDto saveUser(UserDto userDto);
	
//	User latTransactional();
//	
    User saveUserMaterRole(User user);
//    
    
}
