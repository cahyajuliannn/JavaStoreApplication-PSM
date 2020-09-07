package com.miniproject.projectkelompok2.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.Biodata;
import com.miniproject.projectkelompok2.model.entity.ContactBiodata;

@Repository
public interface ContactBiodataRepository extends JpaRepository<ContactBiodata, String>{
	ContactBiodata findAllByIdContact(String idContact);
	
	@Query(value = "SELECT d FROM ContactBiodata d WHERE d.isDelete = 'false' ", nativeQuery = false)
	List<ContactBiodata> findAllByBiodataIdBiodata(String idBiodata);

	List<ContactBiodata> findByBiodataIdBiodata(String idBiodata);

	void deleteAllByBiodataIdBiodata(String idBiodata);
	
	List<ContactBiodata> findByBiodataIdBiodataAndIsDelete(String idBiodata, boolean isDelete);

	List<ContactBiodata> findByBiodataIdBiodataAndBiodataNamaLengkapContainingIgnoreCaseAndBiodataKotaLokasiContainingIgnoreCaseAndIsDeleteFalse(
			String idBiodata, String namaLengkap, String kotaLokasi);

	List<ContactBiodata> findByBiodataNamaLengkapContainingIgnoreCaseAndBiodataKotaLokasiContainingIgnoreCaseAndIsDeleteFalse(
			String namaLengkap, String kotaLokasi);

}
