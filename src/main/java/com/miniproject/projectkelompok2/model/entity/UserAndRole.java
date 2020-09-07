package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Table(name = UserAndRole.TABLE_NAME)
@Data
public class UserAndRole extends CommonEntity {
	public static final String TABLE_NAME = "tabel_user_and_role";
	
	@Id
	@GeneratedValue(generator = "sequence_userroles")
	@GenericGenerator(name = "sequence_userroles", 
	  parameters = {@Parameter(name = "prefix", value = "UR")}, 
	  strategy = "com.miniproject.projectkelompok2.generator.GeneratorUserAndRole")
	@Column(name="id_userroles", length = 10)
	private String idUserroles;
	
	@ManyToOne
	@JoinColumn(name = "id_user")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "id_role")
	private RoleUser roleUser;
 
}
