package com.miniproject.projectkelompok2.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniproject.projectkelompok2.model.entity.Barang;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.model.entity.Variant;
import com.miniproject.projectkelompok2.repository.BarangRepository;
import com.miniproject.projectkelompok2.repository.VariantRepository;
import com.miniproject.projectkelompok2.util.UserAuth;

@Transactional
@Service
public class VariantServiceImpl implements VariantService {
    @Autowired
    private VariantRepository varRepository;
    @Autowired
    private BarangRepository BarangRepository;
    
    @Override
    public List<Variant> saveAllVariant(List<Variant> variant){
    	List<Variant> response = new ArrayList<Variant>();
    	Date today = new Date();
    	User user = UserAuth.getUser();
    	
    	for (int i=0; i<variant.size(); i++) {
    		Barang b = BarangRepository.findByIdBarangAndIsDeleteFalse(variant.get(i).getBarang().getIdBarang());
    		
    		Variant var = new Variant();
    		var.setCreatedBy(user.getUsername());
    		var.setCreatedOn(today);
    		var.setBarang(b);
    		var.setHargaBeli(variant.get(i).getHargaBeli());
    		var.setHargaJual(variant.get(i).getHargaJual());
    		var.setNilai(variant.get(i).getNilai());
    		var.setSatuan(variant.get(i).getSatuan());
    		var.setNamaVariant(variant.get(i).getNamaVariant());
    		var.setKeuntungan(variant.get(i).getKeuntungan());
    		response.add(var);
    	}
		return varRepository.saveAll(response);
  	
    	
    }

//	@Override
//	public VariantDto save(VariantDto vDto) {
//		// TODO Auto-generated method stub
//		return null;
//	}

	@Override
	public Variant save(Variant variant) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Variant> simpanSemua(@Valid List<Variant> variant) {
		// TODO Auto-generated method stub
		return null;
	}
}