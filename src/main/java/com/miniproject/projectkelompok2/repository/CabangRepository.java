package com.miniproject.projectkelompok2.repository;

import java.util.List;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.Distributor;

@Repository
public interface CabangRepository extends JpaRepository<Cabang, String>{

	Cabang findAllByIdCabang(String idCabang); // ros ini yg nambahin vinan ya hehe butuh soalnya maaciw

	List<Cabang> findAllByTokoIdToko(String idToko); //ini untuk jumlah cabang
	
	
	@Query(value = "SELECT c FROM Cabang c where c.status = ?1 "
			+ "AND c.isDelete = 'false'"
			, nativeQuery = false)
	List<Cabang> caristatus(String status); // ini filter status kalo pake query

	
	//ditambah pada 16 April 2020
	
	List<Cabang> findAllByStatus(String status); // ini untuk jumlah status
	
	//filter by kota
	@Query(value = "SELECT d FROM Cabang d where UPPER (d.kotaKab) LIKE CONCAT ('%',UPPER(:kotaKab),'%')"
			+ "AND d.isDelete = 'false'"
			, nativeQuery = false)
	List<Cabang> carikota(String kotaKab);
	
	//filter by nama cabang
	@Query(value = "SELECT e FROM Cabang e where UPPER (e.namaCabang) LIKE CONCAT ('%',UPPER(:namaCabang),'%')"
			+ "AND e.isDelete = 'false'"
			, nativeQuery = false)
	List<Cabang> caricabang(String namaCabang);

	List<Cabang> findByIdCabang(String idCabang);
	
//	Cabang findByIdCabang(String idCabang);
	
	//filter by idCabang
	@Query(value = "SELECT z FROM Cabang z where UPPER (z.idCabang) LIKE CONCAT ('%', UPPER(:idCabang), '%')"
	+ "AND z.isDelete = 'false'", nativeQuery = false)
	List<Cabang> cariIdCabang(String idCabang);
	
	
	//filter nama bank
//	@Query(value = "SELECT f FROM Cabang f WHERE UPPER(f.namaCabang) LIKE CONCAT('%',UPPER(:namaCabang),'%') "
//			+ "AND UPPER(f.namaBank) LIKE CONCAT('%',UPPER(:namaBank),'%') ", nativeQuery = false)
//	List<Cabang> cariCabangBank(String namaCabang, String namaBank);
//	
	//nambain
	
//	@Query(value = "SELECT a FROM Cabang a WHERE a.isDelete = 'false' ", nativeQuery= false)
//	List<Cabang> findAll();
	
	//filter by nama, kota, status
//	@Query(value = "SELECT d FROM Cabang d WHERE UPPER(d.namaCabang) LIKE CONCAT('%',UPPER(:namaCabang),'%') "
//			+ "AND UPPER(d.kotaKab) LIKE CONCAT('%',UPPER(:kotaKab),'%')"
//			+ "AND UPPER(d.status) LIKE CONCAT('%',UPPER(:status),'%')"
//			+ "AND d.isDelete = 'false'"
//			, nativeQuery = false)
//	
////			+ "AND d.isDelete = 'false' ", nativeQuery = false)
//	
//	List<Cabang> findbyFilter(String namaCabang, String kotaKab, String status);
	
	
//	@Query(value = "SELECT c FROM Cabang c where c.status = ?1 and c.namaCabang = ?2 and c.kotaKab = ?3 "
//			+ "AND c.isDelete = 'false'"
//			, nativeQuery = false)
//	List<Cabang> caristatusnamakota(String status, String namaCabang, String kotaKab); 
	
	
	
	
	@Query(value = "SELECT z FROM Cabang z WHERE z.isDelete = false")
	List<Cabang> findAllAndIsDelete();

	
	long countByTokoIdTokoAndIsDeleteFalse(String idToko);
	
	long countByStatusAndIsDeleteFalse(String status);
	
	List<Cabang> findByNamaCabangContainingIgnoreCaseAndKotaKabContainingIgnoreCaseAndStatusAndIsDeleteFalse(String namacabang, String kotakab, String status);
}
