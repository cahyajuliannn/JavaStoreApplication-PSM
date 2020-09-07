package com.miniproject.projectkelompok2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.model.entity.UserAndRole;

@Repository
public interface UserAndRoleRepository extends JpaRepository<UserAndRole, String>{

//	UserAndRole findByUserAndRoleIdUserroles();

//	UserAndRole findByUserIdUser();

	UserAndRole findAllByIdUserroles(String idUserroles);
	
//	@Query(value = "SELECT d FROM UserAndRole d WHERE d.isDelete = 'false' ", nativeQuery = false)
	List<UserAndRole> findAllByUserIdUserAndIsDelete(String idUser, Boolean isDelete); // untuk getAllNew

	@Query(value = "SELECT d From UserAndRole d WHERE UPPER(d.roleUser) LIKE CONCAT('%', UPPER(:roleUser), '%')", nativeQuery = false)
	List<UserAndRole> findByFilter(String roleUser);
	
	List<UserAndRole> findByUserUsernameContainingIgnoreCaseAndRoleUserRoleContainingIgnoreCase(String username, String role);
	
	void deleteAllByUserIdUser(String idUser);

	List<UserAndRole> findAllByUserUsernameContainingIgnoreCaseAndRoleUserRoleContainingIgnoreCaseAndIsDeleteFalse(
			String username, String role);

	List<UserAndRole> findAllByUserIdUserAndUserUsernameContainingIgnoreCaseAndRoleUserRoleContainingIgnoreCaseAndIsDeleteFalse(
			String idUser, String username, String role);

}
