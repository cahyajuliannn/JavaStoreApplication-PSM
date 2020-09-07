package com.miniproject.projectkelompok2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
	
	@Query(value = "SELECT d From User d WHERE UPPER(d.username) LIKE CONCAT('%', UPPER(:username), '%')", nativeQuery = false)
	List<User> findByFilter(String username);

	User findByUsername(String username);
	
	@Query(value = "SELECT d FROM User d WHERE d.isDelete = 'false' ", nativeQuery = false)
	List<User> findAll();

	List<User> findByUsernameContainingIgnoreCaseAndIsDeleteFalse(String username);

}
