package com.miniproject.projectkelompok2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.BranchAccess;

@Repository
public interface BranchAccessRepository extends JpaRepository<BranchAccess, String> {
	
//	@Query(value = "SELECT d FROM BranchAccess d WHERE d.isDelete = 'false' ", nativeQuery = false)
	List<BranchAccess> findAllByUserIdUserAndIsDelete(String idUser, Boolean isDelete);
	
	List<BranchAccess> findByUserUsernameContainingIgnoreCaseAndCabangNamaCabangContainingIgnoreCase(String username, String namaCabang);
	
	void deleteAllByUserIdUser(String idUser);

	List<BranchAccess> findAllByUserIdUserAndUserUsernameContainingIgnoreCaseAndIsDeleteFalse(String idUser,
			String username);
}
