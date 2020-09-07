package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Data
@Table(name = Stok.TABLENAME)

public class Stok extends CommonEntity{
	public static final String TABLENAME = "t_stok";
	
	@Id
	@GenericGenerator(name = "sequence_stok", 
	  parameters = {@Parameter(name = "prefix", value = "ST")}, 
	  strategy = "com.miniproject.projectkelompok2.generator.StokGenerator")
	@GeneratedValue(generator = "sequence_stok", strategy = GenerationType.AUTO)
	@Column(name = "id_stok", length = 6, nullable = false)
    private String idStok;
	
	@ManyToOne
	@JoinColumn(name = "id_barang")
	private Barang barang;	
	
	@Column(name = "jumlah_stok") 
	private Long jumlahStok;
	
	@Column(name = "gudang", nullable = false, length = 50)
	private String gudang;
	
	@ManyToOne
	@JoinColumn(name = "id_cabang")
	private Cabang cabang;	
	
	@Column(name = "variant_brg", length = 200)
	private String variantAja;		
}
