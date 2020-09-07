package com.miniproject.projectkelompok2.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.Biodata;


@Repository
public interface BiodataRepository extends JpaRepository<Biodata, String>{
	
	@Query(value = "SELECT d FROM Biodata d WHERE d.isDelete = 'false' ", nativeQuery = false)
	Biodata findAllByIdBiodata(String idBiodata);
	
	List<Biodata> findAllByIsDelete(boolean isDelete);

	Biodata findByIdBiodata(String idBiodata);
	
	List<Biodata> findByNamaLengkapContainingIgnoreCaseAndKotaLokasiContainingIgnoreCaseAndIsDeleteFalse(String namaLengkap, String kotaLokasi);


}
