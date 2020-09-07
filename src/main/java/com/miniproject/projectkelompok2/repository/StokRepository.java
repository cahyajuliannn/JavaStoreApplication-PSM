package com.miniproject.projectkelompok2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.Barang;
import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.Stok;

@Repository
public interface StokRepository extends JpaRepository<Stok, String> {
	List<Stok> findAllByCabang(Cabang cabang);
	
	Stok findByIdStok(String idStok);

	
	@Query(value = "SELECT s FROM Stok s WHERE UPPER(s.barang) LIKE CONCAT('%',UPPER(:barang),'%') "
			+ "AND UPPER(s.cabang) LIKE CONCAT('%',UPPER(:cabang),'%')"
			+ "AND UPPER(s.gudang) LIKE CONCAT('%',UPPER(:gudang),'%')", nativeQuery = false)
	List<Stok> cariBasedFilter(Barang barang, Cabang cabang, String gudang);
	
	List<Stok> findByCabangNamaCabangContainingIgnoreCaseAndBarangNamaBarangAndVariantAjaAndIsDeleteFalse(String namaCabang, String namaBarang, String variantAja);

//	List<Stok> findByBarangNamaBarangContainingIgnoreCaseAndCabangNamcABANGcONTAINGINIGnoreCase(String namaBarang, String namaCabang);
	
	
	long countByCabangIdCabangAndIsDeleteFalse(String idCabang);
	
	@Query(value = "SELECT s FROM Stok s WHERE s.isDelete = 'false' ", nativeQuery = false)
	List<Stok> findAll();
}
