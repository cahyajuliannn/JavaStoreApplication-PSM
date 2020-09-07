package com.miniproject.projectkelompok2.model.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Table(name = User.TABLE_NAME)
@Data
public class User extends CommonEntity {
	public static final String TABLE_NAME = "tabel_user";
	
	@Id
	@GeneratedValue(generator = "sequence_user")
	@GenericGenerator(name = "sequence_user", 
	  parameters = {@Parameter(name = "prefix", value = "U")}, 
	  strategy = "com.miniproject.projectkelompok2.generator.GeneratorUser")
	@Column(name = "id_user", length = 10)
	private String idUser;
	
	@Column(name = "username", length = 255)
	private String username;
	
	@Column(name = "password", length = 255)
	private String password;
	
	@Column(name = "enabled")
	private Boolean enabled;
	
	@Column(name = "token_expired")
	private Boolean tokenExpired;
	
	@OneToOne
	@JoinColumn(name = "id_biodata")
	private Biodata biodata;
	
 
}
