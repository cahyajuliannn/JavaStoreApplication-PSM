package com.miniproject.projectkelompok2.controller.restapi;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.projectkelompok2.model.dto.VariantDto;
import com.miniproject.projectkelompok2.model.entity.Barang;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.model.entity.Variant;
import com.miniproject.projectkelompok2.repository.BarangRepository;
import com.miniproject.projectkelompok2.repository.VariantRepository;
import com.miniproject.projectkelompok2.service.VariantService;
import com.miniproject.projectkelompok2.util.UserAuth;

@RestController
@RequestMapping("/api/variant")
public class ApiVariant {
	
//	Date today = new Date();
//	User user = UserAuth.getUser();
	
	@Autowired
	private VariantRepository variantRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private BarangRepository barangRepository;
	
	@Autowired
	private VariantService varService;
	
	// Ambil semua data variant berdasarkan idBarang D
	@GetMapping("/barang/{idBarang}")
	public List<Variant> getByIdBarang(@RequestParam(value = "id_barang") String barang){
		return variantRepository.findAllByBarangIdBarangAndIsDeleteFalse(barang);
	}
	
	// Ambil semua data Variant berdasarkan idKategori
	@GetMapping("/kate/{idKategori}")
	public List<Variant> getByIdKategori (@RequestParam(value = "id_kategori") String barang){
		return variantRepository.findAllByBarangKategoriBarangIdKategoriAndIsDeleteFalse(barang);
	}
	
	// Ambil semua data berdasarkan idVariant sesuai DTO D
	@GetMapping("/{idVariant}")
	public VariantDto getVariant(@PathVariable String idVariant) {
			Variant variant = variantRepository.findById(idVariant).get();
	        VariantDto varianDto = new VariantDto();
	        varianDto.setIdBarang(variant.getBarang().getIdBarang());
	        varianDto.setNamaBarang(variant.getBarang().getNamaBarang());
	        varianDto.setIdVariant(variant.getIdVariant());
	        varianDto.setNamaVariant(variant.getNamaVariant());
	        varianDto.setNilai(variant.getNilai());
	        varianDto.setSatuan(variant.getSatuan());
	        varianDto.setHargaBeli(variant.getHargaBeli());
	        varianDto.setHargaJual(variant.getHargaJual());
	        varianDto.setKeuntungan(variant.getKeuntungan());

	        return varianDto;
	    }
	//Ambil Data Variant berdasarkan satuan D
    @GetMapping("/sat/{satuan}")
    public Variant getBySatuan(@PathVariable (value="satuan")String satuan) {
        return variantRepository.findBySatuan(satuan);
    }
	
    //Ambil data Asc
    @GetMapping("/asc/{hargaAsc}")
    public List<VariantDto> getByAsc(Long hargaAsc){
    	List<Variant> vL = variantRepository.getAsc(hargaAsc); 
			List<VariantDto> vD = 
					vL.stream()
						.map(variant -> mapVariantToVariantDto(variant))
						.collect(Collectors.toList());
			return vD; 
    }
    
    //Ambil data Desc
    @GetMapping("/desc/{hargaDesc}")
    public List<VariantDto> getByDessc(Long hargaDesc){
    	List<Variant> vL = variantRepository.getDesc(hargaDesc); 
			List<VariantDto> vD = 
					vL.stream()
						.map(variant -> mapVariantToVariantDto(variant))
						.collect(Collectors.toList());
			return vD; 
    }
 
 	 @GetMapping("/getbyrange/{hargaAwal}/{hargaAkhir}")
 	 public List<VariantDto> getByRange (@PathVariable Long hargaAwal,
 			 @PathVariable Long hargaAkhir){
 		 List<Variant> vL = variantRepository.getAllBetweenHarga(hargaAwal, hargaAkhir); 
 			List<VariantDto> vD = 
 					vL.stream()
 						.map(variant -> mapVariantToVariantDto(variant))
 						.collect(Collectors.toList());
 			return vD; 
 	 }
 	 
	// Mendapatkan List semua Variant
	@GetMapping("/id")
	public List<VariantDto> getList(){
		List<Variant> variantList = variantRepository.findAll();
		List<VariantDto> variantDtos =
				variantList.stream()
							.map(variant -> mapVariantToVariantDto(variant))
							.collect(Collectors.toList());
		return variantDtos;
	}
	
	private VariantDto mapVariantToVariantDto(Variant variant) {
		// TODO Auto-generated method stub
		VariantDto vDto = modelMapper.map(variant, VariantDto.class);
		modelMapper.map(variant.getBarang(), vDto);
		vDto.setIdBarang(variant.getBarang().getIdBarang());
		vDto.setNamaBarang(variant.getBarang().getNamaBarang());
		vDto.setIdVariant(variant.getIdVariant());
		vDto.setNamaVariant(variant.getNamaVariant());
		vDto.setNilai(variant.getNilai());
		vDto.setSatuan(variant.getSatuan());
		vDto.setKeuntungan(variant.getKeuntungan());
		vDto.setHargaBeli(variant.getHargaBeli());
		vDto.setHargaJual(variant.getHargaJual());
		return vDto;
	}
	
	// Mendapatkan List semua variant baru D
	@GetMapping()
	public List<VariantDto> getListVariant(){
		List<Variant> variantList = variantRepository.findAll();
		List<VariantDto> variantDtos = new ArrayList<>();			
		for (int i=0; i<variantList.size(); i++) {
			VariantDto variantDto = new VariantDto();
			variantDto.setIdVariant((variantList.get(i).getIdVariant()));
			variantDto.setNamaVariant(variantList.get(i).getNamaVariant());
			variantDto.setNilai(variantList.get(i).getNilai());
			variantDto.setSatuan(variantList.get(i).getSatuan());
			variantDto.setHargaBeli(variantList.get(i).getHargaBeli());
			variantDto.setHargaJual(variantList.get(i).getHargaJual());
			variantDto.setKeuntungan(variantList.get(i).getKeuntungan());
			variantDto.setIdBarang(variantList.get(i).getBarang().getIdBarang());
			variantDto.setNamaBarang(variantList.get(i).getBarang().getNamaBarang());
			variantDtos.add(variantDto);
		}
		return variantDtos;
	}
	
	// Post Data Variant sesuai entity D
	@PostMapping
	public Variant save (@RequestBody Variant variant) {
		Date today = new Date();
		User user = UserAuth.getUser();
		variant.setCreatedOn(today);
		variant.setCreatedBy(user.getUsername());
		variantRepository.save(variant);
		return variant;
	}
	
	//	Post List Data Variant D
    @ResponseBody
	@PostMapping("/all")
	public List<Variant> SaveAllVariant(@Valid @RequestBody List<Variant> variant) {
		List<Variant> data =  varService.saveAllVariant(variant);
		
		return data;
	}
    
	// sesuai DTO
	@PostMapping ("/post")
	public VariantDto saveVariant (@RequestBody VariantDto vDto) {
		Variant va = new Variant();
		Barang ba = new Barang();
		Date today = new Date();
		User user = UserAuth.getUser();
		va.setCreatedBy(user.getUsername());
		va.setCreatedOn(today);
		ba.setIdBarang(vDto.getIdBarang());
		ba.setNamaBarang(vDto.getNamaBarang());
		va.setBarang(ba);
		modelMapper.map(vDto, va);
		Barang ba1 = barangRepository.findAllByIdBarang(vDto.getIdBarang());
		vDto.setIdBarang(ba1.getIdBarang());
		vDto.setNamaBarang(ba.getNamaBarang());
		variantRepository.save(va);
		modelMapper.map(va, vDto);
		
		return vDto;
		
	}

	// Hapus
//	@DeleteMapping("/{idVariant}")
//	public void delete (@PathVariable String idVariant) {
//		variantRepository.deleteById(idVariant);
//	}
	@DeleteMapping("/del/{idVariant}")
    public void delete(@PathVariable (value="idVariant") String idVariant) {
 
    	Variant var = variantRepository.findByIdVariant(idVariant);
    	Date today = new Date();
    	User user = UserAuth.getUser();
    	var.setDeletedBy(user.getUsername());
    	var.setDeleteOn(today);
    	var.setIsDelete(true);
    	
    	variantRepository.save(var);
    }
	
	//editupdate
//	@PutMapping("/{idVariant}")
//	public ResponseEntity<Variant> editSaveVariant (@PathVariable String idVariant,
//			@Valid @RequestBody Variant newestVariant){
//		Variant newVariant = variantRepository.findById(idVariant).get();
//		modelMapper.map(newestVariant, newVariant);
//		final Variant editSaveVariant = variantRepository.save(newVariant);
//		return ResponseEntity.ok(editSaveVariant);
//	}
	
	//isdelete
	@PutMapping("/isdelete/{idVariant}")
	public ResponseEntity<Variant> isDelete (@PathVariable String idVariant){
		Variant newVariant = variantRepository.findById(idVariant).get();
		Date today = new Date();
		User user = UserAuth.getUser();
		newVariant.setModifiedBy(user.getUsername());
		newVariant.setModifiedOn(today);
		newVariant.setIsDelete(true);
		final Variant editSaveVariant = variantRepository.save(newVariant);
		return ResponseEntity.ok(editSaveVariant);
	}
	// buat edit
	@PutMapping("/{idVariant}")
    public ResponseEntity<Variant> save(@PathVariable String idVariant,
    		@Valid @RequestBody Variant variant){
		Variant newb = variantRepository.findById(idVariant).get();
    	modelMapper.map(variant, newb);
    	final Variant editSaveBarang = variantRepository.save(newb);
    	return ResponseEntity.ok(editSaveBarang);
    }

	
	@ResponseBody
	@PostMapping("/simpan")
	public List<Variant> simpan(@Valid @RequestBody List<Variant> variant) {
		List<Variant> list = varService.simpanSemua(variant);
			    
	 return list;
			  }

}
