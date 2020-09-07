package com.miniproject.projectkelompok2.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.miniproject.projectkelompok2.model.dto.BiodataUserDto;
import com.miniproject.projectkelompok2.model.dto.CommonIdDto;
import com.miniproject.projectkelompok2.model.entity.Biodata;
import com.miniproject.projectkelompok2.model.entity.BranchAccess;
import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.ContactBiodata;
import com.miniproject.projectkelompok2.model.entity.RoleUser;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.model.entity.UserAndRole;
import com.miniproject.projectkelompok2.repository.BiodataRepository;
import com.miniproject.projectkelompok2.repository.BranchAccessRepository;
import com.miniproject.projectkelompok2.repository.ContactBiodataRepository;
//import com.miniproject.projectkelompok2.repository.CabangRepository;
//import com.miniproject.projectkelompok2.repository.RoleUserRepository;
import com.miniproject.projectkelompok2.repository.UserAndRoleRepository;
import com.miniproject.projectkelompok2.repository.UserRepository;
//import com.miniproject.projectkelompok2.repository.UserRepository;
import com.miniproject.projectkelompok2.util.UserAuth;

@Transactional
@Service
public class BiodataUserServiceImpl implements BiodataUserService {
	
	@Autowired
	private BiodataRepository biodataRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserSecurityService userSecurityService;
	
	@Autowired
	private UserAndRoleRepository userAndRoleRepository;
	
	@Autowired
	private BranchAccessRepository branchAccessRepository;
	
//	@Autowired
//	private RoleUserRepository roleUserRepository;
//	
//	@Autowired
//	private CabangRepository cabangRepository;
	
	@Autowired
	private ContactBiodataRepository contactPersonRepository;
	
	@Override // untuk save
	public BiodataUserDto saveBio(BiodataUserDto biodataUserDto) {
		User userLogin = UserAuth.getUser();
		Date currentDate = new Date();
		
		Biodata biodata = new Biodata();
//		biodata.setIdBiodata(biodataUserDto.getIdBiodata());
		biodata.setNamaLengkap(biodataUserDto.getNamaLengkap());
		biodata.setTglLahir(biodataUserDto.getTglLahir());
		biodata.setAlamat(biodataUserDto.getAlamat());
		biodata.setKotaLokasi(biodataUserDto.getKotaLokasi());
		
		biodata.setCreatedBy(userLogin.getUsername());
//		biodata.setCreatedBy("superadmin");
		biodata.setCreatedOn(currentDate);
		
		biodataRepository.save(biodata);	
		biodataUserDto.setIdBiodata(biodata.getIdBiodata());
		 
		User user = new User();
		user.setBiodata(biodata);
		user.setIdUser(biodataUserDto.getIdUser());
		user.setUsername(biodataUserDto.getUsername());
		user.setPassword(biodataUserDto.getPassword());
		
		user.setCreatedBy(userLogin.getUsername());
//		user.setCreatedBy("superadmin");
		user.setCreatedOn(currentDate);
		
		userSecurityService.save(user);
//		userRepository.save(user);
		biodataUserDto.setIdUser(user.getIdUser());
		
		// NEW
		List<UserAndRole> userAndRoleDto = new ArrayList<>();
	    for (CommonIdDto cid : biodataUserDto.getUserAndRole()) {
	      RoleUser ru = new RoleUser();
	      ru.setIdRole(cid.getId2());
	      ru.setRole(cid.getName());
	      
	      UserAndRole uar = new UserAndRole();
	      uar.setIdUserroles(cid.getId());
	      uar.setUser(user);
	      uar.setRoleUser(ru);
	    
	      uar.setCreatedBy(userLogin.getUsername());
//	      uar.setCreatedBy("superadmin");
	      uar.setCreatedOn(currentDate);
	      
	      userAndRoleDto.add(uar);
	    }
	    userAndRoleRepository.saveAll(userAndRoleDto);
	    
	    List<BranchAccess> branchAccessDto = new ArrayList<>();
	    for (CommonIdDto cid : biodataUserDto.getBranchAccess()) {
	      Cabang cb = new Cabang();
	      cb.setIdCabang(cid.getId2());
	      cb.setNamaCabang(cid.getName());
	      
	      BranchAccess ba = new BranchAccess();
	      ba.setIdBranchaccess(cid.getId());
	      ba.setUser(user);
	      ba.setCabang(cb);
	      
	      ba.setCreatedBy(userLogin.getUsername());
//	      ba.setCreatedBy("superadmin");
		  ba.setCreatedOn(currentDate);
		  
	      branchAccessDto.add(ba);
	    }
	    branchAccessRepository.saveAll(branchAccessDto);
	    
	    // NEWEST
		List<ContactBiodata> cpList = new ArrayList<>();
		for (ContactBiodata cp : biodataUserDto.getContactBiodata()) {
			ContactBiodata contactPerson = new ContactBiodata();
			contactPerson.setIdContact(cp.getIdContact());
			contactPerson.setJenisCP(cp.getJenisCP());
			contactPerson.setAccountName(cp.getAccountName());
			
			contactPerson.setBiodata(biodata);
			
			contactPerson.setCreatedBy(userLogin.getUsername());
//			contactPerson.setCreatedBy("superadmin");
			contactPerson.setCreatedOn(currentDate);
			cpList.add(contactPerson);	
		}
		contactPersonRepository.saveAll(cpList);
	    
		// COMMON ENTITY
//		biodataUserDto.setIsDelete(user.getIsDelete());
//		biodataUserDto.setCreatedOn(user.getCreatedOn());
//		biodataUserDto.setCreatedBy(user.getCreatedBy());
//		biodataUserDto.setDeleteOn(user.getDeleteOn());
//		biodataUserDto.setDeletedBy(user.getDeletedBy());
//		biodataUserDto.setModifiedOn(user.getModifiedOn());
//		biodataUserDto.setModifiedBy(user.getModifiedBy());
		
	    return biodataUserDto;	
	}

	@Override // untuk edit
	public ResponseEntity<BiodataUserDto> updateBiodataUser(String id, BiodataUserDto biodataUserDto) {
		// TODO Auto-generated method stub
		User userLogin = UserAuth.getUser();
		Date currentDate = new Date();
		
		Biodata biodata = new Biodata();
		User user = userRepository.findById(id).get();
		
		biodata.setIdBiodata(user.getBiodata().getIdBiodata());
		
		biodata.setNamaLengkap(biodataUserDto.getNamaLengkap());
		biodata.setAlamat(biodataUserDto.getAlamat());
		biodata.setTglLahir(biodataUserDto.getTglLahir());
		biodata.setKotaLokasi(biodataUserDto.getKotaLokasi());
		
		biodata.setCreatedBy(userLogin.getUsername());
//		biodata.setCreatedBy("superadmin");
		biodata.setCreatedOn(currentDate);
		biodata.setModifiedBy(userLogin.getUsername());
//		biodata.setModifiedBy("superadmin");
		biodata.setModifiedOn(currentDate);
		
		user.setIdUser(user.getIdUser());
		user.setUsername(biodataUserDto.getUsername());
		user.setPassword(biodataUserDto.getPassword());
		
		user.setModifiedBy(userLogin.getUsername());
//		user.setModifiedBy("superadmin");
		user.setModifiedOn(currentDate);
		
		user.setBiodata(biodata);
		
		List<UserAndRole> userAndRoleDto = new ArrayList<>();
	    for (CommonIdDto cid : biodataUserDto.getUserAndRole()) {
	      RoleUser ru = new RoleUser();
	      ru.setIdRole(cid.getId2());
	      ru.setRole(cid.getName());
	      
	      UserAndRole uar = new UserAndRole();
	      uar.setIdUserroles(cid.getId());
	      uar.setUser(user);
	      uar.setRoleUser(ru);
	      
	      uar.setCreatedBy(userLogin.getUsername());
//	      uar.setCreatedBy("superadmin");
	      uar.setCreatedOn(currentDate);

	      userAndRoleDto.add(uar);
	    }
	    
	    List<BranchAccess> branchAccessDto = new ArrayList<>();
	    for (CommonIdDto cid : biodataUserDto.getBranchAccess()) {
	      Cabang cb = new Cabang();
	      cb.setIdCabang(cid.getId2());
	      cb.setNamaCabang(cid.getName());
	      
	      BranchAccess ba = new BranchAccess();
	      ba.setIdBranchaccess(cid.getId());
	      ba.setUser(user);
	      ba.setCabang(cb);
	      
	      ba.setCreatedBy(userLogin.getUsername());
//	      ba.setCreatedBy("superadmin");
	      ba.setCreatedOn(currentDate);
	      
	      branchAccessDto.add(ba);
	    }
		
	    List<ContactBiodata> cpList = new ArrayList<>();
		for (ContactBiodata cp : biodataUserDto.getContactBiodata()) {
			ContactBiodata contactPerson = new ContactBiodata();
			contactPerson.setIdContact(cp.getIdContact());
			contactPerson.setJenisCP(cp.getJenisCP());
			contactPerson.setAccountName(cp.getAccountName());
			
			contactPerson.setBiodata(biodata);
			
			contactPerson.setCreatedBy(userLogin.getUsername());
//			contactPerson.setCreatedBy("superadmin");
			contactPerson.setCreatedOn(currentDate);
			contactPerson.setModifiedBy(userLogin.getUsername());
//			contactPerson.setModifiedBy("superadmin");
			contactPerson.setModifiedOn(currentDate);

			
			cpList.add(contactPerson);	
		}
		
		userAndRoleRepository.deleteAllByUserIdUser(user.getIdUser());
		branchAccessRepository.deleteAllByUserIdUser(user.getIdUser());
		
		final User updateUser = userRepository.save(user);
		final Biodata updateBiodata = biodataRepository.save(biodata);
		final List<UserAndRole> updateUserAndRole = userAndRoleRepository.saveAll(userAndRoleDto);
		final List<BranchAccess> updateBranchAccess = branchAccessRepository.saveAll(branchAccessDto);
		final List<ContactBiodata> updateContactBiodata = contactPersonRepository.saveAll(cpList);

		
		biodataUserDto.setNamaLengkap(biodata.getNamaLengkap());
		biodataUserDto.setAlamat(biodata.getAlamat());
		biodataUserDto.setTglLahir(biodata.getTglLahir());
		biodataUserDto.setKotaLokasi(biodata.getKotaLokasi());
		
		
		biodataUserDto.setUsername(user.getUsername());
		biodataUserDto.setPassword(user.getPassword());
		
		biodataUserDto.setIdBiodata(updateUser.getBiodata().getIdBiodata());
		biodataUserDto.setIdUser(updateUser.getIdUser());
		
//		biodataUserDto.setIdUserroles(userAndRoleDto.getIdUserroles());
//		biodataUserDto.setIdRole(userAndRoleDto.getRoleUser().getIdRole());
//		biodataUserDto.setRole(userAndRoleDto.getRoleUser().getRole());
//		
//		biodataUserDto.setIdBranchaccess(branchAccessDto.getIdBranchaccess());
//		biodataUserDto.setIdCabang(branchAccessDto.getCabang().getIdCabang());
//		biodataUserDto.setNamaCabang(branchAccessDto.getCabang().getNamaCabang());
		
		biodataUserDto.setIdBiodata(updateUser.getBiodata().getIdBiodata());
		biodataUserDto.setIdUser(updateUser.getIdUser());
//		biodataUserDto.setUserAndRole(updateUserAndRole);
//		biodataUserDto.setBranchAccess(updateBranchAccess);
		biodataUserDto.setContactBiodata(updateContactBiodata);
		
		return ResponseEntity.ok(biodataUserDto);
	}

	@Override // untuk delete
	public ResponseEntity<BiodataUserDto> deleteBiodataUser(String id, BiodataUserDto biodataUserDto) {
		// TODO Auto-generated method stub
		User userLogin = UserAuth.getUser();
		Date currentDate = new Date();
		
		Biodata biodata = new Biodata();
		User user = userRepository.findById(id).get();
		
		biodata.setIdBiodata(user.getBiodata().getIdBiodata());		
		biodata.setNamaLengkap(biodataUserDto.getNamaLengkap());
		biodata.setAlamat(biodataUserDto.getAlamat());
		biodata.setTglLahir(biodataUserDto.getTglLahir());
		biodata.setKotaLokasi(biodataUserDto.getKotaLokasi());
		
//		biodata.setDeletedBy("Administrator");
//		biodata.setDeletedOn(currentDate);
		
		user.setIdUser(user.getIdUser());
		user.setUsername(biodataUserDto.getUsername());
		user.setPassword(biodataUserDto.getPassword());
		
		user.setDeletedBy("Administrator");
		user.setDeleteOn(currentDate);
		user.setIsDelete(Boolean.TRUE);
		
		user.setBiodata(biodata);
		
		List<UserAndRole> userAndRoleDto = new ArrayList<>();
	    for (CommonIdDto cid : biodataUserDto.getUserAndRole()) {
	      RoleUser ru = new RoleUser();
	      ru.setIdRole(cid.getId2());
	      ru.setRole(cid.getName());
	      
	      UserAndRole uar = new UserAndRole();
	      uar.setIdUserroles(cid.getId());
	      uar.setUser(user);
	      uar.setRoleUser(ru);
	      
	      uar.setDeletedBy("Administrator");
	      uar.setDeleteOn(currentDate);
	      uar.setIsDelete(Boolean.TRUE);

	      userAndRoleDto.add(uar);
	    }
	    
	    List<BranchAccess> branchAccessDto = new ArrayList<>();
	    for (CommonIdDto cid : biodataUserDto.getBranchAccess()) {
	      Cabang cb = new Cabang();
	      cb.setIdCabang(cid.getId2());
	      cb.setNamaCabang(cid.getName());
	      
	      BranchAccess ba = new BranchAccess();
	      ba.setIdBranchaccess(cid.getId());
	      ba.setUser(user);
	      ba.setCabang(cb);
	      
	      ba.setDeletedBy("Administrator");
	      ba.setDeleteOn(currentDate);
	      ba.setIsDelete(Boolean.TRUE);
	      
	      branchAccessDto.add(ba);
	    }
		
	    List<ContactBiodata> cpList = new ArrayList<>();
		for (ContactBiodata cp : biodataUserDto.getContactBiodata()) {
			ContactBiodata contactPerson = new ContactBiodata();
			contactPerson.setIdContact(cp.getIdContact());
			contactPerson.setJenisCP(cp.getJenisCP());
			contactPerson.setAccountName(cp.getAccountName());
			
			contactPerson.setBiodata(biodata);
			
//			contactPerson.setDeletedBy("Administrator");
//			contactPerson.setDeleteOn(currentDate);
			
			cpList.add(contactPerson);	
		}
		
		userAndRoleRepository.deleteAllByUserIdUser(user.getIdUser());
		branchAccessRepository.deleteAllByUserIdUser(user.getIdUser());
		
		final User updateUser = userRepository.save(user);
		final Biodata updateBiodata = biodataRepository.save(biodata);
		final List<UserAndRole> updateUserAndRole = userAndRoleRepository.saveAll(userAndRoleDto);
		final List<BranchAccess> updateBranchAccess = branchAccessRepository.saveAll(branchAccessDto);
		final List<ContactBiodata> updateContactBiodata = contactPersonRepository.saveAll(cpList);

		
		biodataUserDto.setNamaLengkap(biodata.getNamaLengkap());
		biodataUserDto.setAlamat(biodata.getAlamat());
		biodataUserDto.setTglLahir(biodata.getTglLahir());
		biodataUserDto.setKotaLokasi(biodata.getKotaLokasi());
		
		biodataUserDto.setUsername(user.getUsername());
		biodataUserDto.setPassword(user.getPassword());
		
		biodataUserDto.setIdBiodata(updateUser.getBiodata().getIdBiodata());
		biodataUserDto.setIdUser(updateUser.getIdUser());
		
		
		biodataUserDto.setIdBiodata(updateUser.getBiodata().getIdBiodata());
		biodataUserDto.setIdUser(updateUser.getIdUser());
//		biodataUserDto.setUserAndRole(updateUserAndRole);
//		biodataUserDto.setBranchAccess(updateBranchAccess);
		biodataUserDto.setContactBiodata(updateContactBiodata);
		
		return ResponseEntity.ok(biodataUserDto);
	}
	
	
	
	

}
