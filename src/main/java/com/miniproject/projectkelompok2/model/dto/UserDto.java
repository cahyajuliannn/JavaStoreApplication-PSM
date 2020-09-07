package com.miniproject.projectkelompok2.model.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class UserDto {
	private String idUser;
	private String username;
	private String password;
	
	
	private String idRole;
	private String role;
	
	private String idBiodata;
	private String namaLengkap;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date tglLahir;
	
	private String kotaLokasi;
	private String alamat;
	
	private String idUserroles;
	
	private String idBranchaccess;
	private String idCabang;
	private String namaCabang;

}
 