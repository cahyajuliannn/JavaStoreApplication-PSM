package com.miniproject.projectkelompok2.controller.restapi;

import java.util.Date;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.projectkelompok2.model.entity.KategoriBarang;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.KategoriBarangRepository;
import com.miniproject.projectkelompok2.util.UserAuth;

@RestController
@RequestMapping("/api/kategoribarang")
public class ApiKategoriBarang {

	@Autowired
	private KategoriBarangRepository kategoriBarangRepository;

	@Autowired
	private ModelMapper modelMapper;
	
	// getAll
	@GetMapping()
	public List<KategoriBarang> getAll(){
		return kategoriBarangRepository.findAll();
	}
	
	// Save KATEGORI
	@PostMapping
	public KategoriBarang save(@RequestBody KategoriBarang kb) {
		Date today = new Date();
		User user = UserAuth.getUser();
		KategoriBarang kba = new KategoriBarang();
    	kba.setNamaKategori(kb.getNamaKategori());    	
    	kb.setCreatedBy(user.getUsername());
    	kb.setCreatedOn(today);
		return kategoriBarangRepository.save(kb);
	}
	
	@DeleteMapping ("/delete/{idKategori}")
	public void delete (@PathVariable String idKategori) {
		KategoriBarang kb = kategoriBarangRepository.findByIdKategoriAndIsDeleteFalse(idKategori);
		Date today = new Date();
		User user = UserAuth.getUser();
		kb.setDeletedBy(user.getUsername());
    	kb.setDeleteOn(today);
    	kb.setIsDelete(true);
    	kategoriBarangRepository.save(kb);
		kategoriBarangRepository.deleteById(idKategori);
	}
	
	@GetMapping("/{idKategori}")
	public KategoriBarang getByIdKategori(@PathVariable (value="idKategori")String idKategori) {
        return kategoriBarangRepository.findByIdKategoriAndIsDeleteFalse(idKategori);
    }
	@GetMapping("/nama/{namaKategoriBarang}")
    public KategoriBarang getByNamaKategoriBarangs(@PathVariable (value="namaKategori")String namaKategori) {
        return kategoriBarangRepository.findByNamaKategoriAndIsDeleteFalse(namaKategori);
    }
//	@GetMapping ("/{idKategori}")
//	public List<KategoriBarang> getByIdKategori(@PathVariable String idKategori) {
//		return kategoriBarangRepository.findAllByIdKategori(idKategori);
//	}
	
	// buat hapus
	@PutMapping("/isdelete/{idKategori}")
	public ResponseEntity<KategoriBarang> editSaveKategori (@PathVariable String idKategori){
		Date today = new Date();
		User user = UserAuth.getUser();
		KategoriBarang newKB = kategoriBarangRepository.findById(idKategori).get();
//		modelMapper.map(newestKB, newKB);
		newKB.setModifiedBy(user.getUsername());
		newKB.setModifiedOn(today);
		newKB.setIsDelete(true);
		final KategoriBarang editSaveKategori = kategoriBarangRepository.save(newKB);
		
		return ResponseEntity.ok(editSaveKategori);
	}
	
	// buat edit
	@PutMapping("/{idBarang}")
    public ResponseEntity<KategoriBarang> edit(@PathVariable String idKategori,
    		@Valid @RequestBody KategoriBarang newestBarang){
    	KategoriBarang newb = kategoriBarangRepository.findById(idKategori).get();
    	modelMapper.map(newestBarang, newb);
    	final KategoriBarang editSaveBarang = kategoriBarangRepository.save(newb);
    	return ResponseEntity.ok(editSaveBarang);
    }
	
	@GetMapping("/id")
	public KategoriBarang getByIdKat (@RequestParam(value = "id_kategori") String idKategori) {
		return kategoriBarangRepository.findByIdKategori(idKategori);
		}

}
