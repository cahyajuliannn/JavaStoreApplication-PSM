package com.miniproject.projectkelompok2.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.miniproject.projectkelompok2.model.entity.RoleUser;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.model.entity.UserAndRole;
import com.miniproject.projectkelompok2.repository.RoleUserRepository;
import com.miniproject.projectkelompok2.repository.UserAndRoleRepository;
import com.miniproject.projectkelompok2.repository.UserRepository;

@Service
@Transactional
public class UserSecurityServiceImpl implements UserSecurityService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserAndRoleRepository userAndRoleRepository;
	@Autowired
	private RoleUserRepository roleUserRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(s);

		List<UserAndRole> userAndRole = userAndRoleRepository.findAllByUserIdUserAndIsDelete(user.getIdUser(), false);
		List<RoleUser> roleList = new ArrayList<>();

		for (UserAndRole userAndRoles : userAndRole) {
			RoleUser role = roleUserRepository.findAllByIdRole(userAndRoles.getRoleUser().getIdRole());
			roleList.add(role);
		}

		if (user == null) {
			throw new UsernameNotFoundException(s);
		}

		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				user.getEnabled(), true, true, true, getAuthorities(roleList));
	}

	private Collection<? extends GrantedAuthority> getAuthorities(List<RoleUser> roles) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		for (RoleUser roleUser : roles) {
			authorities.add(new SimpleGrantedAuthority(roleUser.getRole()));
		}
		return authorities;
	}

	@Override
	public User save(User user) {
		user.setEnabled(Boolean.TRUE);
		user.setTokenExpired(Boolean.FALSE);
//	        user.setIsDelete(Boolean.FALSE);
		if (user.getIdUser() == null || user.getIdUser().equalsIgnoreCase("")) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		return userRepository.save(user);
	}

}
