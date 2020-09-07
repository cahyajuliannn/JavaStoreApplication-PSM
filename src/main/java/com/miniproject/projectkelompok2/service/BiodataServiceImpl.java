package com.miniproject.projectkelompok2.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniproject.projectkelompok2.model.entity.Biodata;
import com.miniproject.projectkelompok2.repository.BiodataRepository;

@Transactional
@Service
public class BiodataServiceImpl implements BiodataService {
	@Autowired
	private BiodataRepository biodataRepository;
	
	@Override
	public Biodata latTransactional() {
		Biodata biodata = biodataRepository.findById(String.valueOf(6)).get();
		biodata.setIdBiodata("perubahan 1");
		biodataRepository.save(biodata);
		
		Integer.parseInt("errorword");
		
		biodata.setIdBiodata("perubahan 2");
		
		biodataRepository.save(biodata);
		
		return biodata;
	}

}
