package com.miniproject.projectkelompok2.model.dto;

import lombok.Data;

@Data
public class BarangDto {
	private String idBarang;
	private String namaBarang;
	private String idKategori;
	private String namaKategori;
	private String distID;
	private String namaPT;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
//    
//    private Date createdOn; // tidak boleh null
//    private String createdBy; // tidak boleh null
//
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
//    private Date modifiedOn;
//    private String modifiedBy;
//
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
//    private Date deleteOn;
//    private String deletedBy;
//    private Boolean isDelete;


}
