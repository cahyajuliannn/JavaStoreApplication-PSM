package com.miniproject.projectkelompok2.controller.restapi;

import java.util.ArrayList;
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

import com.miniproject.projectkelompok2.model.dto.UserAndRoleDto;
import com.miniproject.projectkelompok2.model.entity.BranchAccess;
import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.RoleUser;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.model.entity.UserAndRole;
import com.miniproject.projectkelompok2.repository.BranchAccessRepository;
import com.miniproject.projectkelompok2.repository.UserAndRoleRepository;
import com.miniproject.projectkelompok2.repository.UserRepository;

@RestController
@RequestMapping("/api/userandrole")
public class ApiUserAndRole {
	
	@Autowired
	private UserAndRoleRepository userAndRoleRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BranchAccessRepository branchAccessRepository;
	
	@GetMapping("/getAll")
	public List<UserAndRoleDto> getListUserAndRole() {
		List<UserAndRole> userAndRoleList = userAndRoleRepository.findAll();
		List<UserAndRoleDto> userAndRoleDtoList = new ArrayList<UserAndRoleDto>();
		
		for(UserAndRole userAndRole : userAndRoleList) {
			UserAndRoleDto userAndRoleDto = new UserAndRoleDto();
			modelMapper.map(userAndRole, userAndRoleDto);
			
//			userAndRoleDto.setIdUserroles(userAndRole.getIdUserroles());
			userAndRoleDto.setIdUser(userAndRole.getUser().getIdUser());
			userAndRoleDto.setIdRole(userAndRole.getRoleUser().getIdRole());
			userAndRoleDto.setRole(userAndRole.getRoleUser().getRole());
			
			userAndRoleDtoList.add(userAndRoleDto);
			
		}
		
		return userAndRoleDtoList;	
	}
	
	
	@PostMapping // untuk save
	public UserAndRoleDto save(@RequestBody UserAndRoleDto userAndRoleDto) {
		UserAndRole uar = new UserAndRole();
		User user = new User();
		RoleUser role = new RoleUser();
		
//		uar.setIdUserroles(userAndRoleDto.getIdUserroles());
		
		role.setIdRole(userAndRoleDto.getIdRole());

		user.setIdUser(userAndRoleDto.getIdUser());
		uar.setUser(user);
		uar.setRoleUser(role);
		
		userAndRoleRepository.save(uar);
		
		userAndRoleDto.setIdUserroles(uar.getIdUserroles());
//		userAndRoleDto.setIdUser(user.getIdUser());
//		userAndRoleDto.setIdRole(role.getIdRole());
//		userAndRoleDto.setRole(role.getRole());
		
		return userAndRoleDto;
		
	}
	
	@GetMapping("/filter/{roleUser}")
	public List<UserAndRole> getByFilter(@PathVariable String roleUser) {
		return userAndRoleRepository.findByFilter(roleUser);
	}
	
	
	@GetMapping("/{idUserroles}") // untuk edit
	public UserAndRoleDto getByIdUserroles(@PathVariable String idUserroles) {
		UserAndRole uar = userAndRoleRepository.findById(idUserroles).get();
		
		UserAndRoleDto userAndRoleDto = new UserAndRoleDto();
		
		userAndRoleDto.setIdUserroles(uar.getIdUserroles());
		modelMapper.map(uar, userAndRoleDto);
		
		userAndRoleDto.setIdUser(uar.getUser().getIdUser());
		userAndRoleDto.setIdRole(uar.getRoleUser().getIdRole());
		userAndRoleDto.setRole(uar.getRoleUser().getRole());
		
		return userAndRoleDto;
	}
	
	@PutMapping("/{id}") // untuk edit
	public ResponseEntity<UserAndRoleDto> updateUserAndRole(@PathVariable String id, @Valid @RequestBody UserAndRoleDto userAndRoleDto) {
//		UserAndRole userAndRole = new UserAndRole();
		User user = new User();
		RoleUser role = new RoleUser();
		UserAndRole uar = userAndRoleRepository.findById(id).get();
		
		uar.setIdUserroles(uar.getIdUserroles());
		
		role.setIdRole(userAndRoleDto.getIdRole());

		user.setIdUser(userAndRoleDto.getIdUser());
		uar.setUser(user);
		uar.setRoleUser(role);
		
		final UserAndRole updateUserAndRole = userAndRoleRepository.save(uar);
		
		userAndRoleDto.setIdUserroles(updateUserAndRole.getIdUserroles());
		userAndRoleDto.setIdUser(updateUserAndRole.getUser().getIdUser());
		userAndRoleDto.setIdRole(updateUserAndRole.getRoleUser().getIdRole());
		
		return ResponseEntity.ok(userAndRoleDto);
	}
	
	@DeleteMapping("/{idUserroles}") // delete role & branch sekaligus
	public void delete(@PathVariable String idUserroles) {
		userAndRoleRepository.deleteById(idUserroles);
	}
	
	@GetMapping("/getAllRoleAndBranch") // untuk get role & branch sekaligus
	public List<UserAndRoleDto> getListRoleAndBranch() {
		List<UserAndRole> userAndRoleList = userAndRoleRepository.findAll();
		List<BranchAccess> branchAccessList = branchAccessRepository.findAll();
		List<UserAndRoleDto> userAndRoleDtoList = new ArrayList<UserAndRoleDto>();
		
		for(int i = 0; i < userAndRoleList.size(); i++) {
			UserAndRoleDto userAndRoleDto = new UserAndRoleDto();
			modelMapper.map(userAndRoleList, userAndRoleDto);
			
			userAndRoleDto.setIdUserroles(userAndRoleList.get(i).getIdUserroles());
			userAndRoleDto.setIdUser(userAndRoleList.get(i).getUser().getIdUser());
			userAndRoleDto.setIdRole(userAndRoleList.get(i).getRoleUser().getIdRole());
			userAndRoleDto.setRole(userAndRoleList.get(i).getRoleUser().getRole());
			
			userAndRoleDto.setIdBranchaccess(branchAccessList.get(i).getIdBranchaccess());
			userAndRoleDto.setIdCabang(branchAccessList.get(i).getCabang().getIdCabang());
			userAndRoleDto.setNamaCabang(branchAccessList.get(i).getCabang().getNamaCabang());
			
			userAndRoleDtoList.add(userAndRoleDto);
			
		}
		
		return userAndRoleDtoList;	
	}
	
	@PostMapping("/roleandbranch") // untuk save atau tambah role & branch sekaligus
	public UserAndRoleDto saveRoleAndBranch(@RequestBody UserAndRoleDto userAndRoleDto) {
		UserAndRole uar = new UserAndRole();
		User user = new User();
		RoleUser role = new RoleUser();
		
//		uar.setIdUserroles(userAndRoleDto.getIdUserroles());
		
		role.setIdRole(userAndRoleDto.getIdRole());

		user.setIdUser(userAndRoleDto.getIdUser());
		uar.setUser(user);
		uar.setRoleUser(role);
		
		userAndRoleRepository.save(uar);
		
		userAndRoleDto.setIdUserroles(uar.getIdUserroles());
		userAndRoleDto.setIdUser(user.getIdUser());
//		userAndRoleDto.setIdRole(role.getIdRole());
//		userAndRoleDto.setRole(role.getRole());
		
		BranchAccess ba = new BranchAccess();
		User user2 = new User();
		Cabang cabang = new Cabang();
		
		cabang.setIdCabang(userAndRoleDto.getIdCabang());
		
		user2.setIdUser(userAndRoleDto.getIdUser());
		ba.setUser(user2);
		ba.setCabang(cabang);
		
		branchAccessRepository.save(ba);
		
		userAndRoleDto.setIdBranchaccess(ba.getIdBranchaccess());
		userAndRoleDto.setIdUser(user2.getIdUser());
		
		return userAndRoleDto;
		
	}
	
	@DeleteMapping("/{idBranchaccess}/{idUserroles}") // delete role & branch sekaligus
	public void delete(@PathVariable String idBranchaccess, @PathVariable String idUserroles) {
		branchAccessRepository.deleteById(idBranchaccess);
		userAndRoleRepository.deleteById(idUserroles);
	}
	 
}
