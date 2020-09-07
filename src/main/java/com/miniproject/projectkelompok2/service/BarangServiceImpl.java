package com.miniproject.projectkelompok2.service;
import java.util.ArrayList;
import java.util.Date;
//
import java.util.List;

import javax.validation.Valid;

//
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.miniproject.projectkelompok2.model.dto.BarangDto;
//
//import javax.transaction.Transactional;
//
import com.miniproject.projectkelompok2.model.entity.Barang;
import com.miniproject.projectkelompok2.model.entity.Distributor;
import com.miniproject.projectkelompok2.model.entity.KategoriBarang;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.model.entity.Variant;
////
//////import com.miniproject.projectkelompok2.model.entity.Barang;
import com.miniproject.projectkelompok2.repository.BarangRepository;
import com.miniproject.projectkelompok2.repository.KategoriBarangRepository;
import com.miniproject.projectkelompok2.repository.RefDistribRepository;
import com.miniproject.projectkelompok2.repository.VariantRepository;
import com.miniproject.projectkelompok2.util.UserAuth;
//
@Transactional
@Service
public class BarangServiceImpl implements BarangService {

	@Autowired
    private BarangRepository barangRepository;
	
	@Autowired
	private KategoriBarangRepository kategoriRepository;
	
	@Autowired
	private RefDistribRepository distRepository;
	
	@Autowired
	private VariantRepository varRepository;
	
	public List<Barang> saveAllBarangOld(List<Barang> bList) {
		List<Barang> response = (List<Barang>) barangRepository.saveAll(bList);
		return response;
	}
	
    public List<Barang> saveAllBarang(List<Barang> brg){
    	Date today = new Date();
		User user = UserAuth.getUser();
    	List<Barang> listBarang = new ArrayList<>();

    	for (int i=0; i<brg.size(); i++) {
    		KategoriBarang kb = kategoriRepository.findByIdKategoriAndIsDeleteFalse(brg.get(i).getKategoriBarang().getIdKategori());       	
        	Distributor dist = distRepository.findByNamaPT(brg.get(i).getDistributor().getNamaPT());        	
      	
    		
        	Barang barang = new Barang();
        	barang.setCreatedOn(today);
    		barang.setCreatedBy(user.getUsername());
            barang.setNamaBarang(brg.get(i).getNamaBarang());
            barang.setKategoriBarang(kb);
            barang.setDistributor(dist);
            listBarang.add(barang);
    	}
    	return barangRepository.saveAll(listBarang);
    }			
    
    
    @Override
    public BarangDto saveBarangVariant(BarangDto barangDto) {
    	
    	KategoriBarang kb = kategoriRepository.findByIdKategori(barangDto.getIdKategori());
    	
    	Distributor dist = distRepository.findByNamaPT(barangDto.getNamaPT());
    	    	
    	Barang barang = new Barang();
    	barang.setNamaBarang(barangDto.getNamaBarang());
//    	barang.setHargaBeli(barangDto.getHargaBeli());
//    	barang.setHargaJual(barangDto.getHargaJual());
//    	barang.setKeuntungan(barangDto.getKeuntungan());
    	barang.setKategoriBarang(kb);
    	barang.setDistributor(dist);
    	barangRepository.save(barang); 
    	
    	Variant var = new Variant();
    	var.setBarang(barang);
//    	var.setNilai(barangDto.getNilai());
//    	var.setSatuan(barangDto.getSatuan());
//    	var.setNamaVariant(barangDto.getNamaVariant());
    	varRepository.save(var);
		return barangDto;
    	
    }

	@Override
	public Barang latTransactional() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Barang> saveBarangSementara(List<Barang> bList) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Barang> saveSemua(@Valid List<Barang> brg) {
		// TODO Auto-generated method stub
		return null;
	}
}
    	