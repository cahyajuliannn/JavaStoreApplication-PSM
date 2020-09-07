package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Data
@Table(name = KategoriBarang.TABLENAME)
public class KategoriBarang extends CommonEntity{
	public static final String TABLENAME = "kategori_barang";
	
	@Id
	@GeneratedValue(generator = "sequence_id_kategori")
	@GenericGenerator (name = "sequence_id_kategori", strategy = "com.miniproject.projectkelompok2.generator.KategoriBarangGenerator",
	parameters = {@Parameter (name = "prefix", value = "K")})
	@Column(name = "id_kategori", nullable = false, length = 100)
	private String idKategori;
	@Column(name = "nama_kategori", nullable = false, length = 128)
	private String namaKategori;


}
