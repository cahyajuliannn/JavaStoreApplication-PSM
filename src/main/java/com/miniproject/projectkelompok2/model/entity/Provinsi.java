package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = Provinsi.TABLE_PROVINSI)

public class Provinsi {
	public static final String TABLE_PROVINSI = "tabel_provinsi";
	
	@Id
	@GeneratedValue(generator = "sequence_provinsi", strategy = GenerationType.AUTO)
	@Column(name = "kd_provinsi")
	private Integer kdProv;
	@Column(name = "nama_provinsi")
	private String provinsi;

}
