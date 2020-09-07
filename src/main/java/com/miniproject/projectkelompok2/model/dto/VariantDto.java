package com.miniproject.projectkelompok2.model.dto;

import lombok.Data;

@Data
public class VariantDto {
	private String idVariant;
	private Long  nilai;
	private String satuan;
	private String idBarang;
	private String namaBarang;
	private String namaVariant;
	private Long hargaBeli;
	private Long hargaJual;
	private Long keuntungan;
}
