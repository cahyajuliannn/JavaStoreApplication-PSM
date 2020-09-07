package com.miniproject.projectkelompok2.controller.restapi;

import java.util.ArrayList;
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

import com.miniproject.projectkelompok2.model.dto.BranchAccessDto;
import com.miniproject.projectkelompok2.model.entity.BranchAccess;
import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.BranchAccessRepository;

@RestController
@RequestMapping("/api/branchaccess")
public class ApiBranchAccess {
	
	@Autowired
	private BranchAccessRepository branchAccessRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping("/getAll")
	public List<BranchAccessDto> getListBranchAccess() {
		List<BranchAccess> branchAccessList = branchAccessRepository.findAll();
		List<BranchAccessDto> branchAccessDtoList = new ArrayList<BranchAccessDto>();
		
		for(BranchAccess branchAccess : branchAccessList) {
			BranchAccessDto branchAccessDto = new BranchAccessDto();
			modelMapper.map(branchAccess, branchAccessDto);
			
			branchAccessDto.setIdBranchaccess(branchAccess.getIdBranchaccess());
			branchAccessDto.setIdUser(branchAccess.getUser().getIdUser());
			branchAccessDto.setIdCabang(branchAccess.getCabang().getIdCabang());
			branchAccessDto.setNamaCabang(branchAccess.getCabang().getNamaCabang());
			
			branchAccessDtoList.add(branchAccessDto);
			
		}
		
		return branchAccessDtoList;
	}
	
	@PostMapping // untuk save
	public BranchAccessDto save(@RequestBody BranchAccessDto branchAccessDto) {
		BranchAccess ba = new BranchAccess();
		User user = new User();
		Cabang cabang = new Cabang();
		
		ba.setIdBranchaccess(branchAccessDto.getIdBranchaccess());
		
		cabang.setIdCabang(branchAccessDto.getIdCabang());
		
		user.setIdUser(branchAccessDto.getIdUser());
		ba.setUser(user);
		ba.setCabang(cabang);
		
		branchAccessRepository.save(ba);
		
		branchAccessDto.setIdBranchaccess(ba.getIdBranchaccess());
		branchAccessDto.setIdUser(user.getIdUser());
		branchAccessDto.setIdCabang(cabang.getIdCabang());
		branchAccessDto.setNamaCabang(cabang.getNamaCabang());
		
		return branchAccessDto;
		
	}
	
	@GetMapping("/{idBranchaccess}") // untuk edit
	public BranchAccessDto getByIdBranchaccess(@PathVariable String idBranchaccess) {
		BranchAccess ba = branchAccessRepository.findById(idBranchaccess).get();
		
		BranchAccessDto branchAccessDto = new BranchAccessDto();
		
		branchAccessDto.setIdBranchaccess(ba.getIdBranchaccess());
		modelMapper.map(ba, branchAccessDto);
		
		branchAccessDto.setIdUser(ba.getUser().getIdUser());
		branchAccessDto.setIdCabang(ba.getCabang().getIdCabang());
		branchAccessDto.setNamaCabang(ba.getCabang().getNamaCabang());
		
		return branchAccessDto;
	}
	
	@PutMapping("/{id}") // untuk edit
	public ResponseEntity<BranchAccessDto> updateBranchAccess(@PathVariable String id, @Valid @RequestBody BranchAccessDto branchAccessDto) {
		User user = new User();
		Cabang cabang = new Cabang();
		BranchAccess ba = branchAccessRepository.findById(id).get();
		
		ba.setIdBranchaccess(ba.getIdBranchaccess());
		
		cabang.setIdCabang(branchAccessDto.getIdCabang());
		
		user.setIdUser(branchAccessDto.getIdUser());
		ba.setUser(user);
		ba.setCabang(cabang);
		
		final BranchAccess updateBranchAccess = branchAccessRepository.save(ba);
		
		branchAccessDto.setIdBranchaccess(updateBranchAccess.getIdBranchaccess());
		branchAccessDto.setIdUser(updateBranchAccess.getUser().getIdUser());
		branchAccessDto.setIdCabang(updateBranchAccess.getCabang().getIdCabang());
		
		return ResponseEntity.ok(branchAccessDto);
	}
	
	@GetMapping("/filterUC/{username}/{namaCabang}")
	  public List<BranchAccess> getByFilter(@PathVariable String username, 
	      @PathVariable String namaCabang){
		
		List<BranchAccess> branchAccessList = branchAccessRepository.findByUserUsernameContainingIgnoreCaseAndCabangNamaCabangContainingIgnoreCase(username, namaCabang);
		List<BranchAccessDto> branchAccessDtoList = new ArrayList<BranchAccessDto>();
		
		for(BranchAccess branchAccess : branchAccessList) {
			BranchAccessDto branchAccessDto = new BranchAccessDto();
			modelMapper.map(branchAccess, branchAccessDto);
			
			branchAccessDto.setIdBranchaccess(branchAccess.getIdBranchaccess());
			branchAccessDto.setIdUser(branchAccess.getUser().getIdUser());
			branchAccessDto.setIdCabang(branchAccess.getCabang().getIdCabang());
			branchAccessDto.setNamaCabang(branchAccess.getCabang().getNamaCabang());
			
			branchAccessDtoList.add(branchAccessDto);
			
			}
		
	    return branchAccessRepository.findByUserUsernameContainingIgnoreCaseAndCabangNamaCabangContainingIgnoreCase(username, namaCabang);
	  }
	
	@DeleteMapping("/{idBranchaccess}")
	public void delete(@PathVariable String idBranchaccess) {
		branchAccessRepository.deleteById(idBranchaccess);
	}
	 

}
