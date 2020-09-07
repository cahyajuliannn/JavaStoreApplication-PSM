package com.miniproject.projectkelompok2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.KategoriBarang;

@Repository
public interface KategoriBarangRepository extends JpaRepository<KategoriBarang, String> {
//	@Query (value="select * from kategori_barang b where b.id_kategori = ?1", nativeQuery = true)
//	KategoriBarang findAllByIdKategori(String id_kategori);
	List<KategoriBarang> findAllByIdKategori(String idKategori);
	KategoriBarang findByIdKategori(String idKategori);
	List<KategoriBarang> findAllByIsDelete(Boolean isDelete);
	KategoriBarang findByIdKategoriAndIsDeleteFalse(String idKategori);
	KategoriBarang findByNamaKategoriAndIsDeleteFalse(String namaKategori);
}
