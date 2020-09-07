package com.miniproject.projectkelompok2.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

//import com.fasterxml.jackson.annotation.JsonFormat;
//import com.miniproject.projectkelompok2.model.entity.Cabang;
//import com.miniproject.projectkelompok2.model.entity.Stok;
import com.miniproject.projectkelompok2.model.entity.StokHistory;

@Repository
public interface StokHistoryRepository extends JpaRepository<StokHistory, String>{

	// percobaan
//	List<StokHistory> findByIdCabang(Cabang cabang); // TIDAK BISA CARI StokHistory based on idCabang krna gak ada idCabang di StokHistory

//	List<StokHistory> findByStok(Stok stok); // find histok by FK (id stok)
//			+ "AND to_char(s.tglTransaksi, 'yyyy-MM-dd')
	@Query(value = "SELECT s FROM StokHistory s WHERE UPPER(s.status) =?1 "
			+ "AND s.tglTransaksi =?2 ", nativeQuery = false)
	List<StokHistory> cariBasedFilter(String status, @DateTimeFormat(pattern = "yyyy-MM-dd") Date tglTransaksi);

	List<StokHistory> findByStatusAndIsDeleteFalse(String status);
	
	// cari histok based on barang dan cabang-> datatable live search filter only
	List<StokHistory> findByTglTransaksiBetween(@DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, 
			@DateTimeFormat(pattern = "yyyy-MM-dd")Date endDate);
	
	
	@Query(value = "SELECT s FROM StokHistory s WHERE s.tglTransaksi BETWEEN :startDate AND :endDate AND s.isDelete ='false' ")
	public List<StokHistory> getAllBetweenDates(@Param("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
			@Param("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate);
	
	// use this
	List<StokHistory> findByTglTransaksi(@DateTimeFormat(pattern = "yyyy-MM-dd") Date tglTransaksi);
	
	List<StokHistory> findAllByStokIdStok(String idStok);
	StokHistory findByStokIdStok(String idStok);
	
	List<StokHistory> findByStatusAndStokBarangNamaBarangContainingIgnoreCase(String status, String namaBarang);
	List<StokHistory> findByStatusAndStokCabangNamaCabangContainingIgnoreCase(String status, String namaCabang);
	List<StokHistory> findByStatusAndStokBarangKategoriBarangNamaKategoriContainingIgnoreCase(String status, String namaKategori);

	@Query(value = "SELECT s FROM StokHistory s WHERE s.isDelete = 'false' ")
	List<StokHistory> findAll();
}
