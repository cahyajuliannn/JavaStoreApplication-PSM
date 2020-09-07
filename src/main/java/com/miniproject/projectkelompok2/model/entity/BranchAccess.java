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
@Table(name = BranchAccess.TABLE_NAME)
@Data
public class BranchAccess extends CommonEntity {
	public static final String TABLE_NAME = "tabel_branch_access";
	
	@Id
	@GeneratedValue(generator = "sequence_branchaccess")
	@GenericGenerator(name = "sequence_branchaccess", 
	  parameters = {@Parameter(name = "prefix", value = "BA")}, 
	  strategy = "com.miniproject.projectkelompok2.generator.GeneratorBranchAccess")
	@Column(name = "id_branchaccess", length = 10)
	private String idBranchaccess;
	
	@ManyToOne
	@JoinColumn(name = "id_user")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "id_cabang")
	private Cabang cabang;
	
	 


}
