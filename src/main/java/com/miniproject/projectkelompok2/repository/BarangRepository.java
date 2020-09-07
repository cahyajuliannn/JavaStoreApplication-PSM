package com.miniproject.projectkelompok2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.Barang;
import com.miniproject.projectkelompok2.model.entity.Distributor;
import com.miniproject.projectkelompok2.model.entity.KategoriBarang;

@Repository
public interface BarangRepository extends JpaRepository<Barang, String> {
//	@Query (value="select * from barang b where b.id_barang = ?1", nativeQuery = true)
//	Barang findAllByIdBarang(String id_barang);
	List<Barang> findAllByIdBarang(Barang brg);
	List<Barang> findByIdBarang(String idBarang);
//	Barang findAllByIdBarang(String idBarang);
	
	List<Barang> findAllByDistributor(Distributor distributor);
	Barang findByDistributor(Distributor distributor);
	List<Barang> findAllByDistributorDistID(String distID);
	
	List<Barang> findAllByKategoriBarang (KategoriBarang kategoriBarang);
	Barang findAllByIdBarang(String idBarang);
	
	@Query (value = "SELECT b FROM Barang b WHERE UPPER (b.namaBarang) LIKE CONCAT ('%', UPPER(:namaBarang),'%')", nativeQuery = false)
	List<Barang> cariBasednama(String namaBarang);
	
//	@Query(value = "SELECT b FROM Barang b WHERE b.isDelete = 'false' ", nativeQuery = false)
//	List<Barang> findAll(); 
//	s
//	@Query(value = "SELECT k FROM Barang k WHERE k.isDeleted = 'false' AND k.kategoriBarang =?1", nativeQuery = false)
	List<Barang> findByKategoriBarang(KategoriBarang kategoriBarang); 
	
	List<Barang> findByNamaBarangContainingIgnoreCaseAndKategoriBarangNamaKategoriContainingIgnoreCaseAndDistributorNamaPTContainingIgnoreCaseAndIsDeleteFalse(String nmBrg, String nmKtg, String nmPT);
	
	Barang findByIdBarangAndIsDeleteFalse(String idBarang);
}

