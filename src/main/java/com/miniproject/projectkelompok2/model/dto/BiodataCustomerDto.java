package com.miniproject.projectkelompok2.model.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.miniproject.projectkelompok2.model.entity.ContactBiodata;

import lombok.Data;

@Data
public class BiodataCustomerDto {
	private String idBiodata;
	private String namaLengkap;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date tglLahir;
	
	private String kotaLokasi;
	private String alamat;
	
	
	private String idCustomer;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date tglMasuk;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date tglKeluar;
	
	private String idAkun;
	private String noRekening;
	private Integer idBank;
	
	private List<ContactBiodata> contactBiodata;
}
