package com.miniproject.projectkelompok2.controller.restapi;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.miniproject.projectkelompok2.model.dto.StokDto;
import com.miniproject.projectkelompok2.model.dto.StokHistoryDto;
import com.miniproject.projectkelompok2.model.entity.Barang;
import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.Stok;
import com.miniproject.projectkelompok2.model.entity.StokHistory;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.BarangRepository;
import com.miniproject.projectkelompok2.repository.CabangRepository;
import com.miniproject.projectkelompok2.repository.StokHistoryRepository;
import com.miniproject.projectkelompok2.repository.StokRepository;
//import com.miniproject.projectkelompok2.service.StokService;
import com.miniproject.projectkelompok2.util.UserAuth;


@RestController
@RequestMapping("/api/stok")
public class ApiStok {
	// Ref/Detail ada 2: BARANG dan CABANG
	
    @Autowired
    private StokRepository stokRepository;
    
    @Autowired
    private BarangRepository barangRepository;
    
    @Autowired
    private CabangRepository cabangRepository;
    
    @Autowired
    private StokHistoryRepository shistRepo;

    @Autowired
    private ModelMapper modelMapper;

//    @Autowired
//    private StokService stokService;
    
    @GetMapping()
    public List<StokDto> getListStok() {
        List<Stok> stList = stokRepository.findAll();
        List<StokDto> sDtos =
                stList.stream()
                		.map(stok -> mapStokToStokDto(stok))
                        .collect(Collectors.toList());
                	
        return sDtos;
    }
    
//    private StokDto setStokDto(Stok stok) {
//    	StokDto s = modelMapper.map(stok, StokDto.class);
//    	if(stok.getBarang() != null) {
//        	modelMapper.map(stok.getBarang(), s);
//    	}
//    	if(stok.getCabang() != null) {
//    		modelMapper.map(stok.getCabang(), s);
//    	}
//    	return s;
//    }
    
    @GetMapping("/{idAja}")
    public StokHistoryDto getStok(@PathVariable String idAja) {	
        Stok stok = stokRepository.findById(idAja).get();
        StokHistoryDto sDto = new StokHistoryDto();
        sDto.setIdStok(stok.getIdStok());
        sDto.setIdBarang(stok.getBarang().getIdBarang());
        sDto.setNamaBarang(stok.getBarang().getNamaBarang());
        sDto.setIdKategori(stok.getBarang().getKategoriBarang().getIdKategori()); // NEW
        sDto.setNamaKategori(stok.getBarang().getKategoriBarang().getNamaKategori()); // NEW
        sDto.setJumlahStok(stok.getJumlahStok());
        sDto.setGudang(stok.getGudang());
        sDto.setIdCabang(stok.getCabang().getIdCabang());
        sDto.setNamaCabang(stok.getCabang().getNamaCabang());
        sDto.setVariantAja(stok.getVariantAja());
//        stok.getBarang().getVariants()
//        Barang b = new Barang();
//        Variant v = new Variant();
//        Set<Variant> varSet = new HashSet<Variant>();
//        varSet.add(v);
//        b.setVariants(varSet);
//        sDto.setGudang(b.getVariants());
        
        return sDto;
    }

    @PostMapping	
    public StokDto editSaveStok(@RequestBody StokDto sDto) {
        Stok stok = new Stok();
        Barang barang = new Barang();
        Cabang cabang = new Cabang();
        cabang.setIdCabang(sDto.getIdCabang());
        barang.setIdBarang(sDto.getIdBarang());
        stok.setBarang(barang);
        stok.setCabang(cabang);
        modelMapper.map(sDto, stok);
        Barang barang1 = barangRepository.findById(sDto.getIdBarang()).get();
        Cabang cabang1 = cabangRepository.findById(sDto.getIdCabang()).get();
        sDto.setNamaBarang(barang1.getNamaBarang());
        sDto.setIdKategori(barang1.getKategoriBarang().getIdKategori()); // NEW
        sDto.setNamaKategori(barang1.getKategoriBarang().getNamaKategori()); // NEW
        sDto.setNamaCabang(cabang1.getNamaCabang());
        stokRepository.save(stok);
        modelMapper.map(stok, sDto);
          return sDto;
      }

    private StokDto mapStokToStokDto(Stok stok) {
        StokDto sDto = modelMapper.map(stok, StokDto.class);
        modelMapper.map(stok.getBarang(), sDto);
        modelMapper.map(stok.getCabang(), sDto);
        sDto.setIdBarang(stok.getBarang().getIdBarang()); 
        sDto.setIdKategori(stok.getBarang().getKategoriBarang().getIdKategori()); // NEW
        sDto.setNamaKategori(stok.getBarang().getKategoriBarang().getNamaKategori()); // NEW
        sDto.setIdCabang(stok.getCabang().getIdCabang());
        
        sDto.setIdStok(stok.getIdStok());
        return sDto;
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Stok> editSaveStok(@PathVariable String id,
    		@Valid @RequestBody Stok newestStok) {
    	Stok newStok = stokRepository.findById(id).get();
    	modelMapper.map(newestStok, newStok);
    	final Stok editSaveStok = stokRepository.save(newStok);
    	return ResponseEntity.ok(editSaveStok);
    }
    
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        stokRepository.deleteById(id);	
    }
    
    // get stok by cabang
    @GetMapping("/getbycabang")
    public List<StokDto> getByIdCabang (@RequestParam(value = "id_cabang") Cabang cabang){
    	 List<Stok> stList = stokRepository.findAllByCabang(cabang);
    	 List<StokDto> sDtos =
    			 stList.stream()
    			 .map(stok -> mapStokToStokDto(stok))
    			 .collect(Collectors.toList());
    	 return sDtos;
    }
    
    // hanya bisa value PK, kasih value supaya bisa spesifik cari based field/column apa
    @GetMapping("/getfilter")
    public List<StokDto> getByFilter (@RequestParam(value = "id_barang") Barang barang,
    		@RequestParam(value = "id_cabang") Cabang cabang,
    		@RequestParam(value = "gudang") String gudang){
    	List<Stok> stList = stokRepository.cariBasedFilter(barang, cabang, gudang);
    	List<StokDto> sDtos =
   			 stList.stream()
   			 .map(stok -> mapStokToStokDto(stok))
   			 .collect(Collectors.toList());
    	return sDtos;
    }

    //use this
    @GetMapping("/getbyfilters/{namaCabang}/{namaBarang}/{variantAja}")
    public List<StokDto> getByFiltersNew (@PathVariable String namaCabang, 
    		@PathVariable String namaBarang, @PathVariable String variantAja){
    	
    	List<Stok> stList = 
    	stokRepository.findByCabangNamaCabangContainingIgnoreCaseAndBarangNamaBarangAndVariantAjaAndIsDeleteFalse(namaCabang, namaBarang, variantAja);
    	List<StokDto> sDtos =
      			 stList.stream()
      			 .map(stok -> mapStokToStokDto(stok))
      			 .collect(Collectors.toList());
       	return sDtos;
    }
    
    @GetMapping("/countbycabang/{idCabang}")
    public long countStok1 (@PathVariable String idCabang) {
    	return stokRepository.countByCabangIdCabangAndIsDeleteFalse(idCabang);
    }
    
    @PostMapping("/isdelete/{id}")
    public Stok isdelete (@PathVariable String id) {
    	User userlogin = UserAuth.getUser();
    	Date currentDate = new Date();
    	Stok stok = stokRepository.findById(id).get();
    	stok.setDeletedBy(userlogin.getUsername());
    	stok.setDeleteOn(currentDate);
    	stok.setIsDelete(Boolean.TRUE);
    	
    	return stokRepository.save(stok);
    }
    
    
    
}