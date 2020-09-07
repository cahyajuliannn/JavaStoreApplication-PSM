package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = JenisContact.TABLE_JENISCONTACT)
@Data
public class JenisContact {
	public static final String TABLE_JENISCONTACT = "tabel_jenis_contact";
	@Id
	@Column(name = "id_jenis_contact")
	private Integer idJenisContact;
	
	@Column(name="jenis")
	private String jenisContact;

}
