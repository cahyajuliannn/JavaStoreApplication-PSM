package com.miniproject.projectkelompok2.controller.restapi;

import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.projectkelompok2.model.entity.BankAccount;
import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.repository.BankAccountRepository;
//import com.miniproject.projectkelompok2.repository.CabangRepository;

@RestController
@RequestMapping("/api/akun")
public class ApiAccountBank {
	
	@Autowired
	private ModelMapper modelMapper;
//	@Autowired
//	private CabangRepository cabangRepository;
	
	@Autowired
	private BankAccountRepository bankAccountRepository;
	
	@GetMapping
	public List<BankAccount> getAll(){
		return bankAccountRepository.findAll();
	}
	
	@PostMapping
	public BankAccount save (@RequestBody BankAccount bankAccount) {
		return bankAccountRepository.save(bankAccount);
	}
	@GetMapping("/{idAkun}")
	public BankAccount getByidAkun(@PathVariable String idAkun) {
		return bankAccountRepository.findAllByidAkun(idAkun);
	}
	
	@DeleteMapping("/{idAkun}")
	public void delete (@PathVariable String idAkun) {
		BankAccount ba = bankAccountRepository.findAllByidAkun(idAkun);
		bankAccountRepository.deleteById(idAkun);
	}
	
	@PutMapping ("/{id}")
	public ResponseEntity<BankAccount> editSaveBank (@PathVariable String id,
			@Valid @RequestBody BankAccount newestBank) {
		BankAccount newBank = bankAccountRepository.findById(id).get();
		modelMapper.map(newestBank, newBank);
		final BankAccount editSaveBank = bankAccountRepository.save(newBank);
		
		return ResponseEntity.ok(editSaveBank);
	}
	
	

}
