package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name=KotaKabupaten.TABLE_KOTA)
@Data

public class KotaKabupaten {
	public static final String TABLE_KOTA = "t_kotakab";
	
	@Id
	@GeneratedValue(generator = "sequence_kotaKab", strategy = GenerationType.AUTO)
	@Column(name="kd_kotakab")
	private Integer kodeKota;
	
	@Column(name="kd_provinsi")
	private Integer kdProv;
	
	@Column(name="nama_kotakab")
	private String kotaKab;

}
