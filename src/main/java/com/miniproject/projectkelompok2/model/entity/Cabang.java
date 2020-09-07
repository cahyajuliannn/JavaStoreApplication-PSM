package com.miniproject.projectkelompok2.model.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Table(name = Cabang.TABLE_NAME)
@Data

//public class Cabang {
	public class Cabang extends CommonEntity {
	public static final String TABLE_NAME = "tabel_cabang";
	 
	@Id
	@GenericGenerator(name = "sequence_cabang",
					parameters = {@Parameter(name = "prefix", value = "CB")}, 
					strategy = "com.miniproject.projectkelompok2.generator.StokGenerator")
	@GeneratedValue (generator = "sequence_cabang", strategy = GenerationType.AUTO)
	
	@Column(name = "id_cabang", nullable = false, length = 10)
	private String idCabang;
	
	@Column(name = "nama_cabang", unique= true, nullable = false, length = 255)
	private String namaCabang;
	
	@Column(name = "alamat_cabang", nullable = false, length = 255)
	private String alamatCabang;
	
	private String kotaKab;
	
	@Column(name = "tanggal_berdiri", nullable = false, length = 255)
	@Temporal(TemporalType.DATE)
	private Date tanggalBerdiri;
	
	@Column(name = "jam_tutup", nullable = false, length = 255)
	private String jamTutup;
	
	@Column(name = "jam_buka", nullable = false, length = 255)
	private String jamBuka;

	@Column(name = "status", nullable = false, length = 255)
	private String status;

	@ManyToOne
	private Toko toko;
	
	@OneToOne
	private BankAccount bAccount;
}
