package com.miniproject.projectkelompok2.model.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.miniproject.projectkelompok2.model.entity.BranchAccess;
import com.miniproject.projectkelompok2.model.entity.ContactBiodata;
import com.miniproject.projectkelompok2.model.entity.UserAndRole;

import lombok.Data;

@Data
public class BiodataUserDto {
	private String idBiodata;
	private String namaLengkap;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date tglLahir;
	
	private String kotaLokasi;
	private String alamat;
	
	private String idUser;
	private String username;
	private String password;
	
	private String idUserroles;
	private String idRole;
	private String role;
	
	private String idBranchaccess;
	private String idCabang;
	private String namaCabang;
	
	private List<CommonIdDto> userAndRole;
	private List<CommonIdDto> branchAccess;
	
	private List<ContactBiodata> contactBiodata;
	
}
