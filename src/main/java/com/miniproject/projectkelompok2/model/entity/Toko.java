package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Table(name = Toko.TABLE_NAME)
@Data

public class Toko extends CommonEntity {
	public static final String TABLE_NAME = "tabel_toko";
	@Id
	@GenericGenerator(name = "sequence_toko",
			parameters = {@Parameter(name = "prefix", value = "TK")}, 
			  strategy = "com.miniproject.projectkelompok2.generator.StokGenerator")
	@GeneratedValue (generator = "sequence_toko", strategy = GenerationType.AUTO)
	@Column(name = "id_toko", nullable = false, length = 10)
	private String idToko;
	@Column(name = "nama_toko", nullable = false, length = 255)
	private String namaToko;
	@Column(name = "alamat_toko", nullable = false, length = 255)
	private String alamatToko;
	@Column(name = "npwp", nullable = false, length = 255)
	private String npwp;
	@Column(name = "deskripsi", nullable = false, length = 255)
	private String deskripsi;

	private Integer jumlahCabang;
	
	private Integer cabangAktif;
	
	private Integer cabangTidakAktif;
	

}
