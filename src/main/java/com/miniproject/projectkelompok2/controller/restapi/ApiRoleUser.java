package com.miniproject.projectkelompok2.controller.restapi;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.projectkelompok2.model.entity.RoleUser;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.RoleUserRepository;
import com.miniproject.projectkelompok2.util.UserAuth;

@RestController
@RequestMapping("/api/roleuser")
public class ApiRoleUser {
	
	@Autowired
	private RoleUserRepository roleUserRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping("/getAll")
	public List<RoleUser> getAll(){
		return roleUserRepository.findAll();
	}
	
	@PostMapping
	public RoleUser save(@RequestBody RoleUser roleUser) {
		User userLogin = UserAuth.getUser();
		Date currentDate = new Date();
		
		roleUser.setCreatedBy(userLogin.getUsername());
		roleUser.setCreatedOn(currentDate);
		
		return roleUserRepository.save(roleUser);
	}
	
	@GetMapping("/{idRole}")
	public RoleUser getByIdRole(@PathVariable String idRole) {
		return roleUserRepository.findAllByIdRole(idRole);
	}
	
	@PutMapping("/{id}") // untuk edit role user
	public ResponseEntity<RoleUser> updateRoleUser(@PathVariable String id, @Valid @RequestBody RoleUser newestRole) {
		User userLogin = UserAuth.getUser();
		Date currentDate = new Date();
		
		RoleUser newRole = roleUserRepository.findById(id).get();
		
		modelMapper.map(newestRole, newRole);
		
		newRole.setCreatedBy(userLogin.getUsername());
		newRole.setCreatedOn(currentDate);
		
		final RoleUser updateRoleUser = roleUserRepository.save(newRole);

		return ResponseEntity.ok(updateRoleUser);
	}
	
	@DeleteMapping("/{idRole}")
	public void delete(@PathVariable String idRole) {
		roleUserRepository.deleteById(idRole);
	}

}
