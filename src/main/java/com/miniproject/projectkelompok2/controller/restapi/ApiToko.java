package com.miniproject.projectkelompok2.controller.restapi;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.projectkelompok2.model.entity.Cabang;
//import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.Toko;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.CabangRepository;
//import com.miniproject.projectkelompok2.repository.CabangRepository;
import com.miniproject.projectkelompok2.repository.TokoRepository;
import com.miniproject.projectkelompok2.service.TokoService;
import com.miniproject.projectkelompok2.util.UserAuth;

@RestController
@RequestMapping("/api/toko")

public class ApiToko {
	
	@Autowired
	private CabangRepository cabangRepository;
	
    @Autowired
    private TokoRepository tokoRepository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public List<Toko> getAll() {
    	return tokoRepository.findAll();
    }
    @PostMapping
    public Toko save (@RequestBody Toko toko) {
    	
//    	User userLogin = UserAuth.getUser();
		Date currentDate = new Date();
    	
		toko.setCreatedBy("admin");
		toko.setCreatedOn(currentDate);
		
		
    	tokoRepository.save(toko);
    	return toko;
    }
    @GetMapping("/{idToko}")
    public Toko getByidToko(@PathVariable String idToko) {
    	return tokoRepository.findAllByidToko(idToko);
    }
    
  @DeleteMapping("/{idToko}")
  public void delete(@PathVariable String idToko) {
      tokoRepository.deleteById(idToko);
  }
  
  
	@PutMapping("/{id}")
	public ResponseEntity<Toko> editSaveToko(@PathVariable String id,
			@Valid @RequestBody Toko newestToko) {
		Toko newToko = tokoRepository.findById(id).get();
		modelMapper.map(newestToko, newToko);
		final Toko editSaveToko = tokoRepository.save(newToko);
		
		return ResponseEntity.ok(editSaveToko);
	}
	
	@GetMapping ("/tabel_toko")
    public List<Toko> getAllToko(){
	return tokoRepository.findAll();
	
	}
	//ditambah hari ini
	
	@GetMapping("/jumlah/{idToko}")
	public Integer getJumlahIdToko(@PathVariable String idToko) {
		List<Cabang> jumlah = cabangRepository.findAllByTokoIdToko(idToko);
		return jumlah.size();
		
	}
	
	//17 Apr 2020
	
//	@GetMapping("/jumlahaktif/{status}")
//	public Integer getStatusAktif(@PathVariable String status) {
//		List<Cabang> jumlahaktif = cabangRepository.findAllByStatus(status);
//		return jumlahaktif.size();
//	}
}
	

