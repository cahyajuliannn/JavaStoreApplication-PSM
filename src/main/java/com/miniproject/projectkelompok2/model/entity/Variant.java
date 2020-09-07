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
@Table(name = Variant.TABLENAME)
public class Variant extends CommonEntity{
	public static final String TABLENAME = "variant";
	
	@Id
	@GeneratedValue (generator = "sequence_id_variant", strategy = GenerationType.IDENTITY)
	@GenericGenerator(name = "sequence_id_variant", strategy = "com.miniproject.projectkelompok2.generator.VariantGenerator",
	parameters = {@Parameter (name = "prefix", value = "V")})
	@Column (name = "id_variant", nullable = false, length = 100)
	private String idVariant;
	@Column (name = "nama_variant", nullable = false, length = 128)
	private String namaVariant;
	@Column (name = "nilai", nullable = false, length = 128)
	private Long nilai;
	@Column (name = "satuan", nullable = false)
	private String satuan;
	@Column (name = "harga_beli", nullable = false)
	private Long hargaBeli;
	@Column (name = "harga_jual", nullable = false)
	private Long hargaJual;
	@Column (name = "keuntungan")
	private Long keuntungan;
	
	
	@ManyToOne
	@JoinColumn (name="variant_id_barang")
	private Barang barang;

}
