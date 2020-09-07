package com.miniproject.projectkelompok2.controller.restapi;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.projectkelompok2.model.dto.UserDto;
import com.miniproject.projectkelompok2.model.entity.Biodata;
import com.miniproject.projectkelompok2.model.entity.BranchAccess;
import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.RoleUser;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.BranchAccessRepository;
//import com.miniproject.projectkelompok2.repository.RoleUserRepository;
import com.miniproject.projectkelompok2.repository.UserRepository;
import com.miniproject.projectkelompok2.service.UserService;

@RestController
@RequestMapping("/api/user")
public class ApiUser {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BranchAccessRepository branchAccessRepository;
	
//	@Autowired
//	private RoleUserRepository roleUserRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserService userService;
	 
	@GetMapping
	public List<UserDto> getListUser() {
		List<User> userList = userRepository.findAll();
		List<UserDto> userDtos = userList.stream()
				.map(user -> mapUserToUserDto(user))
				.collect(Collectors.toList());
		return userDtos;
	}
	
	@GetMapping("/{idAja}")
	public UserDto getUser(@PathVariable String idAja) {
		User user = userRepository.findById(idAja).get();
		UserDto userDto = new UserDto();
		userDto.setIdUser(user.getIdUser());;
		userDto.setUsername(user.getUsername());
		userDto.setPassword(user.getPassword());
		
//		userDto.setIdRole(user.getRoleUser().getIdRole());
//		userDto.setRoleUser(user.getRoleUser().getRole());
		
		userDto.setIdBiodata(user.getBiodata().getIdBiodata());
		
		return userDto;
	}
	
	@GetMapping("/filter/{username}")
	public List<User> getByFilter(@PathVariable String username) {
		return userRepository.findByFilter(username);
	}
	
	@PostMapping("/check-user")
	public ResponseEntity<Boolean> checkUser(@RequestBody User user) {
		List<User> userCheckList = userRepository.findAll();
		for (int i = 0; i < userCheckList.size(); i++) {
			if (user.getUsername().equals(userCheckList.get(i).getUsername())
					&& user.getPassword().equals(userCheckList.get(i).getPassword())) {
				return ResponseEntity.ok(Boolean.TRUE);
			}
		}
		return ResponseEntity.ok(Boolean.FALSE);
	}

	
	@PostMapping
	public UserDto editSaveUser(@RequestBody UserDto userDto) {
		
		// Mapping data UserDto ke RoleUser
		RoleUser roleUser = modelMapper.map(userDto, RoleUser.class);
		
		// Mapping data UserDto ke Biodata
		Biodata biodata = modelMapper.map(userDto, Biodata.class);
		biodata.setIdBiodata(userDto.getIdBiodata());
		
		
		// Mapping data UserDto ke User
		User user = modelMapper.map(userDto, User.class);
		
		
		// set roleuser
//		user.setRoleUser(roleUser);
		
		// set biodata
		user.setBiodata(biodata);
		
		userService.saveUserMaterRole(user); // save datanya
		
		// userDtoRU sudah mengandung primary key user dan userdto
		UserDto userDtoRU = mapUserToUserDto(user);
		// krn yg di-return adalah UserDto maka perlu mapping value dari user ke userDto
		
		return userDtoRU;
	}
	
	private UserDto mapUserToUserDto(User user) {
		
		UserDto userDto = modelMapper.map(user, UserDto.class);
		
//		modelMapper.map(user.getRoleUser(), userDto);
		
//		userDto.setIdRole((user.getRoleUser().getIdRole()));
		
		userDto.setIdUser(user.getIdUser());
		
		userDto.setIdBiodata(user.getBiodata().getIdBiodata());
		
		return userDto;
		
	}
	
	@GetMapping("/branchaccess/{idUser}")
	public List<Cabang> getBranchAccessByIdUser(@PathVariable String idUser) {
		List<BranchAccess> branchAccess = branchAccessRepository.findAllByUserIdUserAndIsDelete(idUser, false);
		List<Cabang> cabang = new ArrayList<>();
		for (int i = 0; i < branchAccess.size(); i++) {
			Cabang objCabang = branchAccess.get(i).getCabang(); // instansiasi objek
			cabang.add(objCabang); // masuk ke list

		}
		return cabang;
	}
	
	@DeleteMapping("/{idUser}")
	public void delete(@PathVariable String idUser) {
		userRepository.deleteById(idUser);
	}
	
//	@GetMapping("/transaksi")
//	public User latTransactional() {
//		User user = userService.latTransactional();
//		
//		return user;
//	}
	
	
 
}
