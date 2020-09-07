package com.miniproject.projectkelompok2.controller.restapi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.projectkelompok2.model.entity.KotaKabupaten;
import com.miniproject.projectkelompok2.model.entity.Provinsi;
import com.miniproject.projectkelompok2.repository.KotaKabRepository;
import com.miniproject.projectkelompok2.repository.ProvinsiRepository;

@RestController
@RequestMapping("/")
public class ApiKotaProv {
	
	@Autowired
	private ProvinsiRepository provinsiRepository;
	
	@Autowired
	private KotaKabRepository kotaKabRepository;
	
	@GetMapping("api/kota/getAll")
	public List<KotaKabupaten> getAll(){
		return kotaKabRepository.findAll();
	}
	
	@GetMapping("api/kotakab/{kdProv}")
	public List<KotaKabupaten> getListKotaKab(@PathVariable Integer kdProv){
		List<KotaKabupaten> dataList = kotaKabRepository.findByKdProv(kdProv);
		return dataList;
	}
	
	@GetMapping("api/kota/{kotaKab}")
	public KotaKabupaten getListKotaKab(@PathVariable String kotaKab) {
		KotaKabupaten dataList = kotaKabRepository.findByKotaKab(kotaKab);
		return dataList;
	}
	
	@GetMapping("api/provinsi")
	public List<Provinsi> getListProvinsi(){
		List<Provinsi> data2List = provinsiRepository.findAll();
		return data2List;
	}

}
