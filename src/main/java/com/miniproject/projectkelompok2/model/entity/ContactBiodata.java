package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Table(name = ContactBiodata.TABLE_CONTACTPERSON)
@Data
public class ContactBiodata extends CommonEntity {
	public static final String TABLE_CONTACTPERSON = "tabel_CP";
	
	@Id
	@GenericGenerator(name = "sequence_contactPerson",
	parameters = {@Parameter(name="prefix", value = "CP")},
	strategy = "com.miniproject.projectkelompok2.generator.DistriGenerator")
	@GeneratedValue(generator = "sequence_contactPerson", strategy = GenerationType.AUTO)
	@Column(name = "id_CP")
	private String idContact;
	
	@Column(name = "jenis_contact")
	private String jenisCP;
	
	@Column(name = "value")
	private String accountName;
	
	@ManyToOne
	private Biodata biodata;
}
