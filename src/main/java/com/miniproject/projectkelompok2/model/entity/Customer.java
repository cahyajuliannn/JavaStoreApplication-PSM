package com.miniproject.projectkelompok2.model.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Entity
@Table(name = Customer.TABLE_CUSTOMER)
@Data
public class Customer extends CommonEntity {
	public static final String TABLE_CUSTOMER = "tabel_customer";
	
	@Id
	@GenericGenerator(name = "sequence_customer",
	parameters = {@Parameter(name = "prefix", value = "CU")},
	strategy = "com.miniproject.projectkelompok2.generator.DistriGenerator")
	@GeneratedValue(generator =  "sequence_customer", strategy = GenerationType.AUTO)
	@Column(name = "id_customer")
	private String idCustomer;
	
	@Column(name = "tgl_masuk")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
	private Date tglMasuk;
	
	@Column(name = "tgl_expired")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
	private Date tglKeluar;
	
	
	@OneToOne(cascade = {CascadeType.MERGE})
	private Biodata biodata;
	
	@OneToOne(cascade = {CascadeType.MERGE})
	private BankAccount bankAccount;


}
