package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
//import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Table(name=BankAccount.TABLE_NAME)
@Data

public class BankAccount extends CommonEntity{
	public static final String TABLE_NAME = "t_accountbank";
	
	@Id
	@GenericGenerator(name = "sequence_akunbank",
					parameters = {@Parameter(name = "prefix", value = "AC")}, 
					strategy = "com.miniproject.projectkelompok2.generator.StokGenerator")
	@GeneratedValue (generator = "sequence_akunbank", strategy = GenerationType.AUTO)
	
	@Column(name = "id_akun", nullable = false, length = 15)
	private String idAkun;
	
//	@Column(name = "nama_bank", nullable = false, length = 255)
//	private String namaBank;
	
	@Column(name = "nomor_rekening", nullable = false, length = 255)
	private String noRekening;
	
	@Column(name = "nama_pemilik", nullable = false, length = 255)
	private String namaPemilik;

	@ManyToOne
	@JoinColumn(name = "id_manj_bank")
	private ManajemenBank manajemenBank;
	
}
