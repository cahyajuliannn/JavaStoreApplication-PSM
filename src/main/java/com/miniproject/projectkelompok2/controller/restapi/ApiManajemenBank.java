package com.miniproject.projectkelompok2.controller.restapi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.projectkelompok2.model.entity.ManajemenBank;
import com.miniproject.projectkelompok2.repository.ManajemenBankRepository;

@RestController
@RequestMapping("/api/manbank")

public class ApiManajemenBank {
	
	@Autowired
	private ManajemenBankRepository mbRepository;
	
	@GetMapping
	public List<ManajemenBank> getAllBank(){
		return mbRepository.findAll();
	}

}
