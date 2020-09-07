package com.miniproject.projectkelompok2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.Barang;
import com.miniproject.projectkelompok2.model.entity.Variant;

@Repository
public interface VariantRepository extends JpaRepository<Variant, String>{


	List<Variant> findAllByIdVariant(Variant variant);



	Variant findByIdVariant(String idVariant);

	List<Variant> findAllByBarangIdBarang(String barang);



	Variant findBySatuan(String satuan);



	List<Variant> findAllByBarang(Barang barang);
	
	@Query(value = "SELECT v FROM Variant v WHERE v.hargaBeli BETWEEN :hargaAwal AND :hargaAkhir")
	public List<Variant> getAllBetweenHarga(@Param("hargaAwal") Long hargaAwal,
			@Param("hargaAkhir") Long hargaAkhir);
	
	@Query(value = "SELECT v FROM Variant v ORDER BY v.hargaJual ASC")
	public List<Variant> getAsc(Long hargaJual);
	
	@Query(value = "SELECT v FROM Variant v ORDER BY v.hargaJual DESC")
	public List<Variant> getDesc(Long hargaJual);

//	@Query(value = "select sum(sb.stok_barang) from t_stok_barang sb where sb.id_barang = ?1", nativeQuery = true)
//    Integer hitungstok(String idBarang);
	
    @Query(value = "SELECT v FROM Variant v WHERE v.isDelete = ?1", nativeQuery = false)
    List<Variant> findAllByIsDelete(Boolean isDelete);
    
    @Query(value = "SELECT v FROM Variant v WHERE v.barang.namaBarang = ?1 and v.satuan = ?2 and v.isDelete = ?3", nativeQuery = false)
	List<Variant> findByParameters(String namaBarang, String namaVariant, Boolean isDelete);

	List<Variant> findAllByBarangKategoriBarangIdKategoriAndIsDeleteFalse(String barang);

	List<Variant> findAllByBarangIdBarangAndIsDeleteFalse(String barang);
	
}
