package com.miniproject.projectkelompok2.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.stereotype.Component;

import com.miniproject.projectkelompok2.model.dto.BarangDto;
import com.miniproject.projectkelompok2.model.entity.Barang;

@Component
public interface BarangService {

	public List<Barang> saveAllBarang(List<Barang> bList);
    Barang latTransactional();

	BarangDto saveBarangVariant(BarangDto barangDto);

	public List<Barang> saveAllBarangOld(List<Barang> bList);
	
	public List<Barang> saveBarangSementara(List<Barang> bList);
	
	public List<Barang> saveSemua(@Valid List<Barang> brg);
    
//    Barang saveBarangMaterKB(Barang barang);
}
