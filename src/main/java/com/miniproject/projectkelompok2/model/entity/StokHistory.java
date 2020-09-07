package com.miniproject.projectkelompok2.model.entity;

import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Entity
@Data
@Table(name = StokHistory.TABLENAME)
public class StokHistory extends CommonEntity{

	public static final String TABLENAME = "t_stok_history";
	
	@Id
	@GenericGenerator(name = "seq_histok", 
	  parameters = {@Parameter(name = "prefix", value = "HS")}, 
	  strategy = "com.miniproject.projectkelompok2.generator.StokGenerator")
	@GeneratedValue(generator = "seq_histok", strategy = GenerationType.AUTO)
	@Column(name = "id_history_stok", length = 10, nullable = false)
	private String idHistok;
	
	@ManyToOne
	@JoinColumn(name = "id_stok")
	private Stok stok;
	
	@Column(name = "kuantitas", nullable = false)
	private Long kuantitas;
	
	@Column(name = "status_stok", length = 20, nullable = false)
	private String status;
	
	@Temporal(TemporalType.DATE)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@Column(name = "tgl_transaksi", nullable = false)
	private Date tglTransaksi;
	
	@Column(name = "alasan_keterangan", length = 200)
	private String alasan;
	
	
}
