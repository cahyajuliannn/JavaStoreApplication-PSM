package com.miniproject.projectkelompok2.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniproject.projectkelompok2.model.dto.BarangDto;
import com.miniproject.projectkelompok2.model.entity.Barang;
import com.miniproject.projectkelompok2.model.entity.Distributor;
import com.miniproject.projectkelompok2.model.entity.KategoriBarang;
import com.miniproject.projectkelompok2.repository.BarangRepository;
import com.miniproject.projectkelompok2.repository.KategoriBarangRepository;

@Transactional
@Service
public class KategoriBarangServicelmpl implements KategoriBarangService{
	@Autowired
	private KategoriBarangRepository kategoriBarangRepository;

	@Autowired
	private BarangRepository barangRepository;
	
	@Override
	public BarangDto saveKategoridanBarang(BarangDto barangDto) {
		KategoriBarang kb = new KategoriBarang();
		kb.setNamaKategori(barangDto.getNamaKategori());
		kategoriBarangRepository.save(kb);
		
		Distributor dist = new Distributor();
		dist.setNamaPT(barangDto.getNamaPT());
		
		Barang brg = new Barang();
		brg.setDistributor(dist);
		brg.setKategoriBarang(kb);
		brg.setNamaBarang(barangDto.getNamaBarang());
//		brg.setHargaBeli(barangDto.getHargaBeli());
//		brg.setHargaJual(barangDto.getHargaJual());
		barangRepository.save(brg);
		
		return barangDto;
	}

}
