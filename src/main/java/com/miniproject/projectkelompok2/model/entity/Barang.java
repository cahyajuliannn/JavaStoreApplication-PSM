package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Data
@Table(name = Barang.TABLENAME)
public class Barang extends CommonEntity{
	public static final String TABLENAME ="barang";
	
	@Id
	@GeneratedValue (generator = "sequence_id_barang", strategy = GenerationType.IDENTITY)
	@GenericGenerator(name = "sequence_id_barang", strategy = "com.miniproject.projectkelompok2.generator.KategoriBarangGenerator",
	parameters = {@Parameter (name = "prefix", value = "B")})
	@Column (name = "id_barang", nullable = false, length = 100)
	private String idBarang;
	@Column (name = "nama_barang", nullable = false, length = 128)
	private String namaBarang;
	
	
	@ManyToOne
	@JoinColumn (name="barang_id_kategori")
	private KategoriBarang kategoriBarang;
	@ManyToOne
	@JoinColumn (name="barang_id_distributor")
	private Distributor distributor;
	


}
