package com.miniproject.projectkelompok2.repository;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.RoleUser;

@Repository
public interface RoleUserRepository extends JpaRepository<RoleUser, String>{
	
	RoleUser findAllByIdRole(String idRole);

}
