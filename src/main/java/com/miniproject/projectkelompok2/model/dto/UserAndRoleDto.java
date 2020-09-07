package com.miniproject.projectkelompok2.model.dto;

import lombok.Data;

@Data
public class UserAndRoleDto {
	private String idUserroles;
	
	private String idUser;
	
	private String idRole;
	private String role;
	
	private String idBranchaccess;
	private String idCabang;
	private String namaCabang;

} 
