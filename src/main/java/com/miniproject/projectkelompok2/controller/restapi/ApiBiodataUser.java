package com.miniproject.projectkelompok2.controller.restapi;

import java.util.ArrayList;
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

import com.miniproject.projectkelompok2.model.dto.BiodataUserDto;
import com.miniproject.projectkelompok2.model.dto.CommonIdDto;
import com.miniproject.projectkelompok2.model.dto.UserAndRoleDto;
import com.miniproject.projectkelompok2.model.entity.Biodata;
import com.miniproject.projectkelompok2.model.entity.BranchAccess;
import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.ContactBiodata;
import com.miniproject.projectkelompok2.model.entity.RoleUser;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.model.entity.UserAndRole;
import com.miniproject.projectkelompok2.repository.BiodataRepository;
import com.miniproject.projectkelompok2.repository.BranchAccessRepository;
import com.miniproject.projectkelompok2.repository.CabangRepository;
import com.miniproject.projectkelompok2.repository.ContactBiodataRepository;
import com.miniproject.projectkelompok2.repository.RoleUserRepository;
import com.miniproject.projectkelompok2.repository.UserAndRoleRepository;
import com.miniproject.projectkelompok2.repository.UserRepository;
import com.miniproject.projectkelompok2.service.BiodataUserService;
import com.miniproject.projectkelompok2.service.UserSecurityService;
import com.miniproject.projectkelompok2.util.UserAuth;

@RestController
@RequestMapping("/api/biodatauser")
public class ApiBiodataUser {
	
	@Autowired
	private BiodataRepository biodataRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BiodataUserService biodataUserService;
	
	@Autowired
	private RoleUserRepository roleUserRepository;
	
	@Autowired
	private UserAndRoleRepository userAndRoleRepository;
	
	@Autowired
	private BranchAccessRepository branchAccessRepository;
	
	@Autowired
	private CabangRepository cabangRepository;
	
	@Autowired
	private ContactBiodataRepository contactPersonRepository;
	
	@Autowired
	private UserSecurityService userSecurityService;
	
	@GetMapping("/getAllNew")
	public List<BiodataUserDto> getNewListBiodataUser() {
		List<Biodata> biodata = biodataRepository.findAll();
		List<User> userList = userRepository.findAll();
		List<BiodataUserDto> buDto = new ArrayList<>();
		
		for(int i = 0; i < userList.size(); i++) {
			BiodataUserDto b = new BiodataUserDto();
			List<ContactBiodata> contactPersonList = contactPersonRepository.findAllByBiodataIdBiodata(biodata.get(i).getIdBiodata());
			b.setIdBiodata(biodata.get(i).getIdBiodata());
			b.setNamaLengkap(biodata.get(i).getNamaLengkap());
			b.setAlamat(biodata.get(i).getAlamat());
			b.setTglLahir(biodata.get(i).getTglLahir());
			b.setKotaLokasi(biodata.get(i).getKotaLokasi());
			b.setIdUser(userList.get(i).getIdUser());
			b.setUsername(userList.get(i).getUsername());
			b.setPassword(userList.get(i).getPassword());
			b.setContactBiodata(contactPersonList);
			
			List<UserAndRole> userAndRoleList = userAndRoleRepository.findAllByUserIdUserAndIsDelete(userList.get(i).getIdUser(), false);
//			b.setUserAndRole(userAndRoleList);
			List<CommonIdDto> userAndRoleDto = new ArrayList<>();
			for (int j = 0; j < userAndRoleList.size(); j++) {
				CommonIdDto c = new CommonIdDto();
				c.setId(userAndRoleList.get(j).getIdUserroles());
				c.setId2(userAndRoleList.get(j).getRoleUser().getIdRole());
				c.setName(userAndRoleList.get(j).getRoleUser().getRole());
				userAndRoleDto.add(c);
			}
			b.setUserAndRole(userAndRoleDto);
			
			List<BranchAccess> branchAccessList = branchAccessRepository.findAllByUserIdUserAndIsDelete(userList.get(i).getIdUser(), false);
//			b.setBranchAccess(branchAccessList);
			List<CommonIdDto> branchAccessDto = new ArrayList<>();
			for (int j = 0; j < branchAccessList.size(); j++) {
				CommonIdDto c = new CommonIdDto();
				c.setId(branchAccessList.get(j).getIdBranchaccess());
				c.setId2(branchAccessList.get(j).getCabang().getIdCabang());
				c.setName(branchAccessList.get(j).getCabang().getNamaCabang());
				branchAccessDto.add(c);
			}
			b.setBranchAccess(branchAccessDto);
			
			buDto.add(b);
		}
		
		return buDto;
	}
	
	@GetMapping("/filterUR/{username}/{role}")
	public List<BiodataUserDto> getByRole(@PathVariable String username, @PathVariable String role) {
		List<Biodata> biodata = biodataRepository.findAll();
		List<User> userList = userRepository.findByUsernameContainingIgnoreCaseAndIsDeleteFalse(username);
		List<BiodataUserDto> buDto = new ArrayList<>();
		
		for(int i = 0; i < userList.size(); i++) {
			BiodataUserDto b = new BiodataUserDto();
			List<ContactBiodata> contactPersonList = contactPersonRepository.findAllByBiodataIdBiodata(biodata.get(i).getIdBiodata());
			b.setIdBiodata(biodata.get(i).getIdBiodata());
			b.setNamaLengkap(biodata.get(i).getNamaLengkap());
			b.setAlamat(biodata.get(i).getAlamat());
			b.setTglLahir(biodata.get(i).getTglLahir());
			b.setKotaLokasi(biodata.get(i).getKotaLokasi());
			b.setIdUser(userList.get(i).getIdUser());
			b.setUsername(userList.get(i).getUsername());
			b.setPassword(userList.get(i).getPassword());
			b.setContactBiodata(contactPersonList);
			
			List<UserAndRole> userAndRoleList = userAndRoleRepository.findAllByUserIdUserAndUserUsernameContainingIgnoreCaseAndRoleUserRoleContainingIgnoreCaseAndIsDeleteFalse(userList.get(i).getIdUser(), username, role);
//			b.setUserAndRole(userAndRoleList);
			List<CommonIdDto> userAndRoleDto = new ArrayList<>();
			for (int j = 0; j < userAndRoleList.size(); j++) {
				CommonIdDto c = new CommonIdDto();
				c.setId(userAndRoleList.get(j).getIdUserroles());
				c.setId2(userAndRoleList.get(j).getRoleUser().getIdRole());
				c.setName(userAndRoleList.get(j).getRoleUser().getRole());
				userAndRoleDto.add(c);
			}
			b.setUserAndRole(userAndRoleDto);
			
			List<BranchAccess> branchAccessList = branchAccessRepository.findAllByUserIdUserAndUserUsernameContainingIgnoreCaseAndIsDeleteFalse(userList.get(i).getIdUser(), username);
//			b.setBranchAccess(branchAccessList);
			List<CommonIdDto> branchAccessDto = new ArrayList<>();
			for (int j = 0; j < branchAccessList.size(); j++) {
				CommonIdDto c = new CommonIdDto();
				c.setId(branchAccessList.get(j).getIdBranchaccess());
				c.setId2(branchAccessList.get(j).getCabang().getIdCabang());
				c.setName(branchAccessList.get(j).getCabang().getNamaCabang());
				branchAccessDto.add(c);
			}
			b.setBranchAccess(branchAccessDto);
			
			buDto.add(b);
		}
		
		return buDto;
		}
	
	@PostMapping("/service") // save pakai service
	public BiodataUserDto saveBiodataUser(@RequestBody BiodataUserDto biodataUserDto) {
		biodataUserService.saveBio(biodataUserDto);
		return biodataUserDto;
	}
	
	@GetMapping("/{idUser}") // untuk edit
	public BiodataUserDto getByIdUser(@PathVariable String idUser) {
		User user = userRepository.findById(idUser).get();
		List<ContactBiodata> contactPerson = contactPersonRepository.findByBiodataIdBiodata(user.getBiodata().getIdBiodata());

		BiodataUserDto biodataUserDto = new BiodataUserDto();
		
		biodataUserDto.setIdUser(user.getIdUser());
		modelMapper.map(user, biodataUserDto);
		
		biodataUserDto.setIdBiodata(user.getBiodata().getIdBiodata());
		biodataUserDto.setNamaLengkap(user.getBiodata().getNamaLengkap());
		biodataUserDto.setAlamat(user.getBiodata().getAlamat());
		biodataUserDto.setTglLahir(user.getBiodata().getTglLahir());
		biodataUserDto.setKotaLokasi(user.getBiodata().getKotaLokasi());

		biodataUserDto.setContactBiodata(contactPerson);
			
		List<UserAndRole> userAndRoleList = userAndRoleRepository.findAllByUserIdUserAndIsDelete(user.getIdUser(), false);
		List<CommonIdDto> cid = new ArrayList<>();
		for(UserAndRole uar : userAndRoleList) { // kiri: objek, kanan: list. loop nya sebanyak parameter 2
			CommonIdDto c = new CommonIdDto();
			c.setId(uar.getIdUserroles());
			c.setId2(uar.getRoleUser().getIdRole());
			c.setName(uar.getRoleUser().getRole());
			cid.add(c);		
		}
		biodataUserDto.setUserAndRole(cid);
			
		List<BranchAccess> branchAccessList = branchAccessRepository.findAllByUserIdUserAndIsDelete(user.getIdUser(), false);
		List<CommonIdDto> cid2 = new ArrayList<>();
		for(BranchAccess ba : branchAccessList) {
			CommonIdDto c2 = new CommonIdDto();
			c2.setId(ba.getIdBranchaccess());
			c2.setId2(ba.getCabang().getIdCabang());
			c2.setName(ba.getCabang().getNamaCabang());
			cid2.add(c2);
		}
		biodataUserDto.setBranchAccess(cid2);

		return biodataUserDto;
		
	}
	
	@PutMapping("/{id}") // untuk edit pakai service
	public ResponseEntity<BiodataUserDto> updateBiodataUser(@PathVariable String id, @Valid @RequestBody BiodataUserDto biodataUserDto) {
		return biodataUserService.updateBiodataUser(id, biodataUserDto);
	}
	
	@DeleteMapping("/delete/{idUser}") // untuk delete menggunakan isdelete
	public User isdelete(@PathVariable String idUser) {
		User userLogin = UserAuth.getUser();
		Date currentDate = new Date();
		
		User user = userRepository.findById(idUser).get();
		
		user.setDeletedBy(userLogin.getUsername());
//		user.setDeletedBy("vinan");
		user.setDeleteOn(currentDate);
		user.setIsDelete(true);
		
		userRepository.save(user);
		
		Biodata biodata = user.getBiodata();
		
		biodata.setDeletedBy(userLogin.getUsername());
//		biodata.setDeletedBy("vinan");
		biodata.setDeleteOn(currentDate);
		biodata.setIsDelete(true);
		
		biodataRepository.save(biodata);
		
		List<UserAndRole> uar = userAndRoleRepository.findAllByUserIdUserAndIsDelete(idUser, false);
		for (int i = 0; i < uar.size(); i++) {
			uar.get(i).setDeletedBy(userLogin.getUsername());
//			uar.get(i).setDeletedBy("vinan");
			uar.get(i).setDeleteOn(currentDate);
			uar.get(i).setIsDelete(true);
			
			userAndRoleRepository.save(uar.get(i));
		}
		
		List<BranchAccess> ba = branchAccessRepository.findAllByUserIdUserAndIsDelete(idUser, false);
		for (int i = 0; i < ba.size(); i++) {
			ba.get(i).setDeletedBy(userLogin.getUsername());
//			ba.get(i).setDeletedBy("vinan");
			ba.get(i).setDeleteOn(currentDate);
			ba.get(i).setIsDelete(true);
			
			branchAccessRepository.save(ba.get(i));
		}
		
		List<ContactBiodata> cp = contactPersonRepository.findAllByBiodataIdBiodata(biodata.getIdBiodata());
		for (int i = 0; i < cp.size(); i++) {
			cp.get(i).setDeletedBy(userLogin.getUsername());
//			cp.get(i).setDeletedBy("vinan");
			cp.get(i).setDeleteOn(currentDate);
			cp.get(i).setIsDelete(true);
			
			contactPersonRepository.save(cp.get(i));
		}
		return user;
	}
	
//	@GetMapping("/{idBiodata}")
//	public Biodata getByIdBiodata(@PathVariable String idBiodata) {
//		return biodataRepository.findAllByIdBiodata(idBiodata);
//	}
	
	
	@DeleteMapping("/{idUser}/{idBiodata}")
	public void deleteUser(@PathVariable String idUser, @PathVariable String idBiodata) {
//		branchAccessRepository.deleteById(idBranchaccess);
//		userAndRoleRepository.deleteById(idUserroles);
		userRepository.deleteById(idUser);
		biodataRepository.deleteById(idBiodata);
	}
	
	@PutMapping("/isdelete/{id}") // untuk delete
	public ResponseEntity<BiodataUserDto> deleteBiodataUser(@PathVariable String id, @Valid @RequestBody BiodataUserDto biodataUserDto) {
		return biodataUserService.deleteBiodataUser(id, biodataUserDto);
	}
	
 
}
