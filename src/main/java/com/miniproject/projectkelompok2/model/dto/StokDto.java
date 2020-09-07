package com.miniproject.projectkelompok2.model.dto;

import lombok.Data;

@Data
public class StokDto {
	private String idStok;
	private String idBarang;	// class BARANG
	private String namaBarang;	// class BARANG
	private String idKategori;	// class BARANG ManyToOne class KATEGORI
	private String namaKategori;	// class BARANG ManyToOne class KATEGORI
	private Long jumlahStok;
	private String gudang;
	private String idCabang;	// class CABANG
	private String namaCabang;	// class CABANG
	private String variantAja;
}
