package com.miniproject.projectkelompok2.model.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Entity
@Data
@Table(name = Biodata.TABLE_BIODATA)
public class Biodata extends CommonEntity {
	public static final String TABLE_BIODATA = "tabel_biodata";
	
	@Id
	@GenericGenerator(name = "sequence_biodata",
	parameters = {@Parameter(name = "prefix", value = "BI")},
	strategy = "com.miniproject.projectkelompok2.generator.DistriGenerator")
	@GeneratedValue(generator = "sequence_biodata", strategy = GenerationType.AUTO)
	@Column(name = "id_biodata", length = 10)
	private String idBiodata;
	
	@Column(name = "nama_lengkap", length = 255, nullable = false)
	private String namaLengkap;
	
	@Column(name = "tgl_lahir", nullable = false)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
	private Date tglLahir;
	
	@Column(name= "kota_kabupaten", nullable = false)
	private String kotaLokasi;
	
	@Column(name = "alamat", length = 255, nullable = false)
	private String alamat;

}
