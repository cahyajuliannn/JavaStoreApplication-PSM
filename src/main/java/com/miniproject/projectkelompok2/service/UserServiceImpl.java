package com.miniproject.projectkelompok2.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniproject.projectkelompok2.model.dto.UserDto;
import com.miniproject.projectkelompok2.model.entity.Biodata;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.model.entity.UserAndRole;
import com.miniproject.projectkelompok2.repository.BiodataRepository;
import com.miniproject.projectkelompok2.repository.RoleUserRepository;
import com.miniproject.projectkelompok2.repository.UserRepository;

@Transactional
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired 
    private RoleUserRepository roleUserRepository;
    
    @Autowired
	private BiodataRepository biodataRepository;

	@Override
	public UserDto saveUser(UserDto userDto) {
		
		User user = new User();
		user.setIdUser(userDto.getIdUser());
		user.setUsername(userDto.getUsername());
		user.setPassword(userDto.getPassword());
		userRepository.save(user);
		
		Biodata biodata = new Biodata();
		user.setBiodata(biodata);
		biodata.setNamaLengkap(userDto.getNamaLengkap());
		biodata.setTglLahir(userDto.getTglLahir());
		biodata.setAlamat(userDto.getAlamat());
		biodata.setKotaLokasi(userDto.getKotaLokasi());
		biodataRepository.save(biodata);
		
		UserAndRole uar = new UserAndRole();
		
		return null;
	}
    
    

//    @Override
//    public User latTransactional() {
//        User user = userRepository.findById("").get();
//        user.setIdUser("perubahan 1");
//        userRepository.save(user);
//
//        Integer.parseInt("errorword");
//
//        user.setIdUser("perubahan 2");
//
//        userRepository.save(user);
//
//        return user;
//    }
//    
    @Override
    public User saveUserMaterRole(User user) {
    	
//    	roleUserRepository.save(user.getRoleUser());
    	    	
    	userRepository.save(user);
    	
    	return user;
    }
}