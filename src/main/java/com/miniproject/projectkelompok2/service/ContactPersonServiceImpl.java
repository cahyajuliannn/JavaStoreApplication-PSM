package com.miniproject.projectkelompok2.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniproject.projectkelompok2.model.dto.BiodataCustomerDto;
import com.miniproject.projectkelompok2.model.entity.ContactBiodata;
import com.miniproject.projectkelompok2.repository.BiodataRepository;
import com.miniproject.projectkelompok2.repository.ContactBiodataRepository;

@Service
@Transactional
public class ContactPersonServiceImpl implements ContactPersonService{
	
	@Autowired
	ContactBiodataRepository contactPersonRepository;
	
	@Autowired
	BiodataRepository biodataRepository;
	
	@Override
	public ContactBiodata latTransactional() {
		return null;
	}

}
