package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Table(name = RoleUser.TABLE_NAME)
@Data
public class RoleUser extends CommonEntity {
	public static final String TABLE_NAME = "tabel_role_user";
	
	@Id
	@GeneratedValue(generator = "sequence_roleuser")
	@GenericGenerator(name = "sequence_roleuser", 
	  parameters = {@Parameter(name = "prefix", value = "RU")}, 
	  strategy = "com.miniproject.projectkelompok2.generator.GeneratorRoleUser")
	@Column(name = "id_role", length = 10)
	private String idRole;
	
	@Column(name = "role", length = 128)
	private String role;

}
