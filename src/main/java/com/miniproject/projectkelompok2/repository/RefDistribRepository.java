package com.miniproject.projectkelompok2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.Distributor;


@Repository
public interface RefDistribRepository extends JpaRepository<Distributor, String> {
	

	Distributor findByDistID(String distID);
	Distributor findByDistIDAndIsDeleteFalse(String distID);
	List<Distributor> findAllByNamaPT(String namaPT);
	
	Distributor findByNamaPT(String namaPT);
	
	
	List<Distributor> findByEmailPT(String emailPT);
	
	
	@Query(value = "SELECT d FROM Distributor d WHERE UPPER(d.namaPT) LIKE CONCAT('%',UPPER(:namaPT),'%') "
			+ "AND UPPER(d.alamatPT) LIKE CONCAT('%',UPPER(:alamatPT),'%') "
			+ "AND UPPER(d.npwpPT) LIKE CONCAT('%',UPPER(:npwpPT),'%') "
			+ "AND d.isDelete = 'false' ", nativeQuery = false)
	List<Distributor> cariBerdasarkanFilter(String namaPT, String alamatPT, String npwpPT);
	
	@Query(value = "SELECT d FROM Distributor d WHERE d.isDelete = 'false' ", nativeQuery = false)
	List<Distributor> findAll(); 
	
	List<Distributor> findByNamaPTContainingIgnoreCaseAndBankAccountManajemenBankNamaBankContainingIgnoreCaseAndIsDeleteFalse(String namaPT, String namaBank);
	
}
