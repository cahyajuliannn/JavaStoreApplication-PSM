package com.miniproject.projectkelompok2.model.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class StokHistoryDto {

	private String idHistok;
	private String idStok;		// class STOK
	private String idBarang;	// class STOK -> BARANG
	private String idKategori;
	private String namaKategori;
	private String idCabang;	// class STOK -> CABANG
	private String namaBarang;	// class STOK -> BARANG
	private String namaCabang;	// class STOK -> CABANG
	private String gudang;		// class STOK
	private Long kuantitas;
	private String status;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date tglTransaksi;	
	private String alasan;
	private Long jumlahStok;
	private String variantAja;	// sperti gudang
	
//	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
//    private Date createdOn;
//    private String createdBy;
//
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
//    private Date modifiedOn;	//boleh null
//    private String modifiedBy;	//boleh null
//
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
//    private Date deleteOn;		//boleh null
//    private String deletedBy;	//boleh null
//
//    private Boolean isDelete;
}
