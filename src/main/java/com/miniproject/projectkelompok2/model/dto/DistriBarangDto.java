package com.miniproject.projectkelompok2.model.dto;

import java.util.List;

import com.miniproject.projectkelompok2.model.entity.Variant;

import lombok.Data;

@Data
public class DistriBarangDto {

	private String idBarang;
	private String namaBarang;
	private String idKategori;
	private String namaKategori;
	private String distID;
	private String namaPT;
	private List<Variant> variants;
	private Long jumlahStok;  // jumlah stok suatu brg dgn var di certain dist 
}
