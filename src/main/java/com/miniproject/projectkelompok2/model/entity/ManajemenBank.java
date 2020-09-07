package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = ManajemenBank.TABLE_NAME)
@Data
public class ManajemenBank {
	public static final String TABLE_NAME = "t_man_bank";
	@Id
	@GeneratedValue (generator = "sequence_manbank", strategy = GenerationType.AUTO)
	
	@Column(name = "id_bank", nullable = false, length = 15)
	private Integer idBank;
	
	@Column(name = "nama_bank", nullable = false, length = 255)
	private String namaBank;

}
