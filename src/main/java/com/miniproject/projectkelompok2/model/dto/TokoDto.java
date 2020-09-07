package com.miniproject.projectkelompok2.model.dto;

import java.util.Date;

//import java.sql.Date;

import lombok.Data;

@Data
public class TokoDto {

	//toko
	private String idToko;
	private String namaToko;
	private String alamatToko;
	private String npwp;
	private String deskripsi;
	
	//cabang
	private String idCabang;
	private String namaCabang;
	private String alamatCabang;
	
	private Date tanggalBerdiri;
	private String jamBuka;
	private String jamTutup;
	private String status;
	
	private Integer jumlahCabang;
	
	private Integer cabangAktif;
	
	
	private String kotaKab; //tambahan
//	private Integer kodeKota;
	
	//kalo error gegara ini ditambaiin
//	Bank
	private String idAkun;
	private String namaPemilik;
	private String noRekening;
	private Integer idBank;
	private String namaBank;
	
	}
	
