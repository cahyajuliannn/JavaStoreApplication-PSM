package com.miniproject.projectkelompok2.controller.restapi;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;
import javax.websocket.server.PathParam;

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

import com.miniproject.projectkelompok2.model.dto.BarangDto;
import com.miniproject.projectkelompok2.model.entity.Barang;
import com.miniproject.projectkelompok2.model.entity.Distributor;
import com.miniproject.projectkelompok2.model.entity.KategoriBarang;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.BarangRepository;
import com.miniproject.projectkelompok2.repository.KategoriBarangRepository;
import com.miniproject.projectkelompok2.repository.RefDistribRepository;
import com.miniproject.projectkelompok2.service.BarangService;
import com.miniproject.projectkelompok2.service.KategoriBarangService;
import com.miniproject.projectkelompok2.util.UserAuth;

@RestController
@RequestMapping ("/api/barang")
public class ApiBarang {	
	@Autowired
	private BarangRepository barangRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private KategoriBarangRepository katebarRepository;
	
	@Autowired
	private RefDistribRepository refdistRepository;
	
	@Autowired
	private BarangService barangService;
	
	@Autowired
	private KategoriBarangService kategoriBarangService;

    @GetMapping()
    public List<BarangDto> getAllnya() {
    	List<Barang> dList = barangRepository.findAll();
    	List<BarangDto> dDtos = 
    			dList.stream()
    				.map(barang -> mapBarangtoBarangDto(barang))
    				.collect(Collectors.toList());
        return dDtos;
    }

//	@GetMapping("/getList")
//	public List<BarangDto> getListNya(){
//		List<Barang> barangList = barangRepository.findAll();
//		List<BarangDto> barangDtos = new ArrayList<>();
//		
//		for (int i=0; i<barangList.size(); i++) {
//			BarangDto barangDto = new BarangDto();
//			barangDto.setIdBarang(barangList.get(i).getIdBarang());
//			barangDto.setNamaBarang(barangList.get(i).getNamaBarang());
//			barangDto.setIdKategori(barangList.get(i).getKategoriBarang().getIdKategori());
//			barangDto.setNamaKategori(barangList.get(i).getKategoriBarang().getNamaKategori());
//			barangDto.setDistID(barangList.get(i).getDistributor().getDistID());
//			barangDto.setNamaPT(barangList.get(i).getDistributor().getNamaPT());
//			
////			barangDto.setIsDelete(barangList.get(i).getIsDeleted());
//		
//			barangDtos.add(barangDto);
//		}
//		return barangDtos;
//	}
    
		// Ambil Semua data barang berdasarkan id Kategori Barang
	    @GetMapping("/kb/{idKategori}")
	    public List<Barang> getByKategoriBarangs(@PathVariable (value="idKategori")String idKategori) {
	    	KategoriBarang kb = new KategoriBarang();
	    	kb.setIdKategori(idKategori);    	
	        return barangRepository.findAllByKategoriBarang(kb);
	    }
	 // Ambil Semua data barang berdasarkan id Kategori Barang
	    @GetMapping("/kb/isdeleted/{idKategori}")
	    public List<Barang> getByKategoriBarangis(@PathVariable (value="idKategori")String idKategori) {
	    	KategoriBarang kb = new KategoriBarang();
	    	kb.setIdKategori(idKategori);    	
	        return barangRepository.findByKategoriBarang(kb);
	    }	
	    
	    // Ambil semua data barang berdasarkan idBaran
	    	@GetMapping("/barang")
	    	public List<Barang> getByIdBarang(@PathParam(value = "id_barang") String idBarang){
	    		return barangRepository.findByIdBarang(idBarang);
    	}
	    	
	    // Berdasarkan namaBarang
	    	@GetMapping("/namBar")
	    	public List<BarangDto> getByNama(@RequestParam(value = "nama_barang") String namaBarang){
	    		List<Barang> bList = barangRepository.cariBasednama(namaBarang);
	    		List<BarangDto> bDtos = 
	    				bList.stream()
	    				.map(barang -> mapBarangtoBarangDto(barang))
	    				.collect(Collectors.toList());
	    		return bDtos;
	    	}
		private BarangDto mapBarangtoBarangDto(Barang barang) {
			// TODO Auto-generated method stub
			BarangDto bDto = modelMapper.map(barang, BarangDto.class);
			modelMapper.map(barang.getKategoriBarang(), bDto);
			modelMapper.map(barang.getDistributor(), bDto);
			bDto.setDistID(barang.getDistributor().getDistID());
			bDto.setIdKategori(barang.getKategoriBarang().getIdKategori());
			bDto.setNamaPT(barang.getDistributor().getNamaPT());
			bDto.setNamaKategori(barang.getKategoriBarang().getNamaKategori());
			
			
			bDto.setIdBarang(barang.getIdBarang());
			bDto.setNamaBarang(barang.getNamaBarang());
			return bDto;
		}
		
		@GetMapping("/{idBarang}")
		public BarangDto getBarang(@PathVariable String idBarang) {
	        Barang barang = barangRepository.findById(idBarang).get();
	        BarangDto barangDto = new BarangDto();
	        	barangDto.setIdBarang(barang.getIdBarang());
		        barangDto.setNamaBarang(barang.getNamaBarang());
		        barangDto.setIdKategori(barang.getKategoriBarang().getIdKategori());;
		        barangDto.setNamaKategori(barang.getKategoriBarang().getNamaKategori());;
		        barangDto.setDistID(barang.getDistributor().getDistID());
		        barangDto.setNamaPT(barang.getDistributor().getNamaPT());

	        return barangDto;
	    }
	    

//knp blm push
//	    @PutMapping("/{idBarang}")
//	    public ResponseEntity<Barang> save(@PathVariable String idBarang,
//	    		@Valid @RequestBody Barang newestBarang){
//	    	Barang newb = barangRepository.findById(idBarang).get();
//	    	modelMapper.map(newestBarang, newb);
//	    	final Barang editSaveBarang = barangRepository.save(newb);
//	    	return ResponseEntity.ok(editSaveBarang);
//	    }
		//editupdate
		@PutMapping("/isdelete/{idCahya}")
		public ResponseEntity<Barang> isDelete (@PathVariable String idCahya){
			Barang newBarang = barangRepository.findById(idCahya).get();
			Date today = new Date();
			User user = UserAuth.getUser();
			newBarang.setModifiedBy(user.getUsername());
			newBarang.setModifiedOn(today);
			newBarang.setIsDelete(Boolean.TRUE);
			final Barang edit = barangRepository.save(newBarang);
			return ResponseEntity.ok(edit);
		}
		
		// buat edit
		@PutMapping("/{idBarang}")
	    public ResponseEntity<Barang> save(@PathVariable String idBarang,
	    		@Valid @RequestBody Barang newestBarang){
	    	Barang newb = barangRepository.findById(idBarang).get();
	    	modelMapper.map(newestBarang, newb);
	    	final Barang editSaveBarang = barangRepository.save(newb);
	    	return ResponseEntity.ok(editSaveBarang);
	    }

		@DeleteMapping("/del/{idBarang}")
	    public void delete(@PathVariable (value="idBarang") String idBarang) {
	 
	    	Barang var = barangRepository.findAllByIdBarang(idBarang);
	    	Date today = new Date();
	    	User user = UserAuth.getUser();
	    	var.setDeletedBy(user.getUsername());
	    	var.setDeleteOn(today);
	    	var.setIsDelete(true);
	    	
	    	barangRepository.save(var);
	    }
	    

//	    @DeleteMapping("/{idBarang}")
//	    public void delete(@PathVariable String idBarang) {
//	        barangRepository.deleteById(idBarang);
//	    }
		
		// get barang bdasarkan distributor
	    @GetMapping("/getbydist")
	    public List<Barang> getByDistID(@RequestParam(value="id_dist") Distributor distributor) {
	    	return barangRepository.findAllByDistributor(distributor);
	    }
	
//	    // post barang Baru one by one (Post sudah sesuai DTO Barang )
//	    @PostMapping("/post")
//	    public BarangDto editSaveBarang(@RequestBody BarangDto bDto) {
//	    	Barang b = new Barang();
//	    	KategoriBarang k = new KategoriBarang();
//	    	Distributor d = new Distributor();
//	    	k.setIdKategori(bDto.getIdKategori());
//	    	d.setDistID(bDto.getDistID());
//	    	b.setKategoriBarang(k);
//	    	b.setDistributor(d);
//	    	modelMapper.map(bDto, b);
//	    	KategoriBarang k1 = katebarRepository.findByIdKategori(bDto.getIdKategori());
//	    	Distributor d1 = refdistRepository.findByDistID(bDto.getDistID());
//	    	bDto.setNamaKategori(k1.getNamaKategori());
//	    	bDto.setNamaPT(d1.getNamaPT());
//	    	barangRepository.save(b);
//	    	modelMapper.map(b, bDto);
//	    	
//	    	return bDto;
//	    }
	    

	    // ke data base
	    @PostMapping("/postList")
	    @ResponseBody
	    public List<Barang> saveListBarang(@RequestBody List<Barang> bList) {
	    	List<Barang> bResponse = barangService.saveAllBarang(bList);
			return bResponse;
	    }
		//	Post List Data Barang D
	    @ResponseBody
		@PostMapping("/all")
		public List<Barang> SaveAllVariant(@Valid @RequestBody List<Barang> brg) {
			List<Barang> data = (List<Barang>) barangService.saveSemua(brg);
			
			return data;
		}
	    
	    
	    
	    @PostMapping("/isdeleted/{idBarang}")
	    public Barang isdelete(@RequestBody Barang barang) {
			Date today = new Date();
			User user = UserAuth.getUser();
			barang.setCreatedOn(today);
			barang.setCreatedBy(user.getUsername());
//	    	Barang brg = barangRepository.findAllByIdBarang(idBarang);
//	    	dto.setIdBarang(brg.getIdBarang());
//	    	dto.setNamaBarang(brg.getNamaBarang());
//	    	dto.setDistID(brg.getDistributor().getDistID());
//	    	dto.setNamaPT(brg.getDistributor().getNamaPT());
//	    	dto.setIdKategori(brg.getKategoriBarang().getIdKategori());
//	    	dto.setNamaKategori(brg.getKategoriBarang().getNamaKategori());
	    	barangRepository.save(barang);    	    	
	    	
	    	return barang;
	    }


	 	@PostMapping
	 	public Barang save(@RequestBody Barang barang) {
	 		barangRepository.save(barang);
	 		return barang;
	 	}
		// menggunakan service 
		@PostMapping("/baru")
		public BarangDto saveBarangKategori (@RequestBody BarangDto barangDto) {
			kategoriBarangService.saveKategoridanBarang(barangDto);
			return barangDto;
		}
		
		//added by al
	    @PostMapping("/postlistDTO")
	    public List<Barang> saveList(@RequestBody List<BarangDto> bDtos){
	    	List<Barang> bList = bDtos.stream()
	    			.map(bDto -> mapBarangDTOtoBarang(bDto))
	    			.collect(Collectors.toList());
	    	return barangService.saveAllBarangOld(bList);
	    }
	    
	    // map DTO -> Barang (kebalikan)
	    private Barang mapBarangDTOtoBarang(BarangDto bDto) {
	    	User userlogin = UserAuth.getUser();
	    	Date today = new Date();
	    	
	    	Barang bar = modelMapper.map(bDto, Barang.class);
	    	bar.setCreatedBy(userlogin.getUsername());
	    	bar.setCreatedOn(today);
	    	bar.setNamaBarang(bDto.getNamaBarang());
	    	KategoriBarang kate = katebarRepository.findByIdKategoriAndIsDeleteFalse(bDto.getIdKategori());
	    	bar.setKategoriBarang(kate);
	    	Distributor dist = refdistRepository.findByDistID(bDto.getDistID());
	    	bar.setDistributor(dist);
	    		
			return bar;
		}
		

	
}