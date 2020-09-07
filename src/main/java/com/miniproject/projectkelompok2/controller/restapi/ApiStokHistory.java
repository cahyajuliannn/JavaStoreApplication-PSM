package com.miniproject.projectkelompok2.controller.restapi;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.projectkelompok2.model.dto.StokHistoryDto;
import com.miniproject.projectkelompok2.model.dto.VariantDto;
import com.miniproject.projectkelompok2.model.entity.Barang;
import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.Stok;
import com.miniproject.projectkelompok2.model.entity.StokHistory;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.model.entity.Variant;
import com.miniproject.projectkelompok2.repository.BarangRepository;
import com.miniproject.projectkelompok2.repository.CabangRepository;
import com.miniproject.projectkelompok2.repository.StokHistoryRepository;
import com.miniproject.projectkelompok2.repository.StokRepository;
import com.miniproject.projectkelompok2.repository.VariantRepository;
import com.miniproject.projectkelompok2.service.StokService;
import com.miniproject.projectkelompok2.util.UserAuth;

@RestController
@RequestMapping("/api/histok")
public class ApiStokHistory {

	// histok -> stok -> barang
	
	@Autowired
	private StokHistoryRepository stokhistRepository;
	
	@Autowired
	private BarangRepository barangRepository;
	
	@Autowired
	private CabangRepository cabangRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	@Autowired
	private StokService stokService;	
	
	@Autowired
	private VariantRepository variantRepository;
	
	@GetMapping()	// Menampilkan History Keluar Masuk Barang
	public List<StokHistoryDto> getListHistok(){
		List<StokHistory> shList = stokhistRepository.findAll();
		List<StokHistoryDto> shDtos = 
				shList.stream()
					.map(stokhis -> mapStokHisToStokHistDto(stokhis))
					.collect(Collectors.toList());
		return shDtos;
	}

	private StokHistoryDto mapStokHisToStokHistDto(StokHistory stokhis) {
		// TODO Auto-generated method stub
		StokHistoryDto shDto = modelMapper.map(stokhis, StokHistoryDto.class);
		modelMapper.map(stokhis.getStok(), shDto);
		//PK
		shDto.setIdHistok(stokhis.getIdHistok());	// di-set dr entity krna generate auto
		//FK dan turunannya
		shDto.setIdStok(stokhis.getStok().getIdStok());
		shDto.setIdBarang(stokhis.getStok().getBarang().getIdBarang());
		shDto.setNamaBarang(stokhis.getStok().getBarang().getNamaBarang());
		shDto.setIdKategori(stokhis.getStok().getBarang().getKategoriBarang().getIdKategori());
		shDto.setNamaKategori(stokhis.getStok().getBarang().getKategoriBarang().getNamaKategori());
		shDto.setIdCabang(stokhis.getStok().getCabang().getIdCabang());
		shDto.setNamaCabang(stokhis.getStok().getCabang().getNamaCabang());
		shDto.setGudang(stokhis.getStok().getGudang());
		return shDto;
	}
	
	@GetMapping("/{idHistok}")
	public StokHistoryDto getStokHistory(@PathVariable String idHistok) {
//		Stok stok = stokRepository.findById(id).get();
		StokHistory stokHist = stokhistRepository.findById(idHistok).get();
		StokHistoryDto sHDto = new StokHistoryDto();
		sHDto.setIdHistok(stokHist.getIdHistok());
		sHDto.setIdStok(stokHist.getStok().getIdStok());
		sHDto.setIdBarang(stokHist.getStok().getBarang().getIdBarang());
		sHDto.setNamaBarang(stokHist.getStok().getBarang().getNamaBarang());
		sHDto.setIdKategori(stokHist.getStok().getBarang().getKategoriBarang().getIdKategori());
		sHDto.setNamaKategori(stokHist.getStok().getBarang().getKategoriBarang().getNamaKategori());
		sHDto.setIdCabang(stokHist.getStok().getCabang().getIdCabang());
		sHDto.setNamaCabang(stokHist.getStok().getCabang().getNamaCabang());
		sHDto.setGudang(stokHist.getStok().getGudang());
		sHDto.setVariantAja(stokHist.getStok().getVariantAja());
		sHDto.setKuantitas(stokHist.getKuantitas());
		sHDto.setStatus(stokHist.getStatus());
		sHDto.setTglTransaksi(stokHist.getTglTransaksi());
		sHDto.setAlasan(stokHist.getAlasan());
		sHDto.setJumlahStok(stokHist.getStok().getJumlahStok());
		return sHDto;
	}
	
	@PostMapping("/postnew")	// input baru ke stok dan histok sekaligus (generate 2 id skaligus)
	 public StokHistoryDto save(@RequestBody StokHistoryDto shDto) {
		 stokService.saveNew(shDto);
		 return shDto;
	 }
	
	// UPDATE JUMLAHSTOK (MASUK/KELUAR)
	 @PostMapping("/inout")
	 public StokHistoryDto updateStokHistPlusMinus(@RequestBody StokHistoryDto sHDto) { 
		 stokService.savePlusMinus(sHDto);
		 return sHDto;
	  }
	 
	 // post list new.
//	 @ResponseBody
	 
	 @PostMapping("/isdeletehistok/{id}")
	    public StokHistory isdeletehistok (@PathVariable String id) {
	    	User userlogin = UserAuth.getUser();
	    	Date currentDate = new Date();
	    	StokHistory shist = stokhistRepository.findById(id).get();
	    	shist.setDeletedBy(userlogin.getUsername());
	    	shist.setDeleteOn(currentDate);
	    	shist.setIsDelete(Boolean.TRUE);
	    	
	    	return stokhistRepository.save(shist);
	    }
	 
	 @PostMapping("/liststok") 
	 public  List<StokHistory> saveList(@RequestBody List<StokHistoryDto> shDtolist) {
//		 List<Stok> stokList = shDtolist.stream()
//				 .map(shDto -> mapShDtoToStok(shDto))
//				 .collect(Collectors.toList());
		 
		 List<StokHistory> shistList = shDtolist.stream()
				 .map(shDto -> stokService.mapDtoToHist(shDto))
				 .collect(Collectors.toList());
		 
		 //stokService.saveAllStok(stokList); 
		 return stokService.saveAllShist(shistList); //works.
//		   void
	 }


	private Stok mapShDtoToStok(StokHistoryDto shDto) {
		// TODO Auto-generated method stub
		Barang barang1 = barangRepository.findById(shDto.getIdBarang()).get();
		Cabang cabang1 = cabangRepository.findById(shDto.getIdCabang()).get();
		Stok stok = modelMapper.map(shDto, Stok.class);
		stok.setJumlahStok(shDto.getKuantitas());  
		stok.setGudang(shDto.getGudang());
		stok.setVariantAja(shDto.getVariantAja());
		
		stok.setBarang(barang1);
		stok.setCabang(cabang1);
		
		return stok;
	}

	@GetMapping("/statusbrg/{st}/{nmbrg}")
	public List<StokHistoryDto> getByStatusandItemName (@PathVariable String st, @PathVariable String nmbrg){
		List<StokHistory> shList = stokhistRepository.findByStatusAndStokBarangNamaBarangContainingIgnoreCase(st, nmbrg); 
		List<StokHistoryDto> shDtos = 
				shList.stream()
					.map(stokhis -> mapStokHisToStokHistDto(stokhis))
					.collect(Collectors.toList());
		return shDtos; 
	}
	
	@GetMapping("/statuscbg/{st}/{nmcbg}")
	public List<StokHistoryDto> getByStatusandCbgname (@PathVariable String st, @PathVariable String nmcbg){
		List<StokHistory> shList = stokhistRepository.findByStatusAndStokCabangNamaCabangContainingIgnoreCase(st, nmcbg); 
		List<StokHistoryDto> shDtos = 
				shList.stream()
					.map(stokhis -> mapStokHisToStokHistDto(stokhis))
					.collect(Collectors.toList());
		return shDtos; 
	}
	
	@GetMapping("/statusktg/{st}/{nmktg}")
	public List<StokHistoryDto> getbystatusandkate (@PathVariable String st, @PathVariable String nmktg) {
		List<StokHistory> shList = stokhistRepository.findByStatusAndStokBarangKategoriBarangNamaKategoriContainingIgnoreCase(st, nmktg); 
		List<StokHistoryDto> shDtos = 
				shList.stream()
					.map(stokhis -> mapStokHisToStokHistDto(stokhis))
					.collect(Collectors.toList());
		return shDtos; 
	}
	
	// It works.
	 @GetMapping("/getbydaterange/{startDate}/{endDate}")
	 public List<StokHistoryDto> getByRangeDate (@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
			 @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate){
		 List<StokHistory> shList = stokhistRepository.getAllBetweenDates(startDate, endDate); 
			List<StokHistoryDto> shDtos = 
					shList.stream()
						.map(stokhis -> mapStokHisToStokHistDto(stokhis))
						.collect(Collectors.toList());
			return shDtos; 
	 }
	 
	 @GetMapping("/getbystatus/{status}") // select2
	 public List<StokHistoryDto> getByStatus(@PathVariable String status) {
		 List<StokHistory> shList = stokhistRepository.findByStatusAndIsDeleteFalse(status);  
			List<StokHistoryDto> shDtos = 
					shList.stream()
						.map(stokhis -> mapStokHisToStokHistDto(stokhis))
						.collect(Collectors.toList());
			return shDtos; 
		 
	 }
	 
	 //hanya bs berdiri sendiri
	 @GetMapping("/getbydate/{tglTransaksi}") // datepicker
	 public List<StokHistoryDto> getByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date tglTransaksi) {
		 List<StokHistory> shList = stokhistRepository.findByTglTransaksi(tglTransaksi); 
			List<StokHistoryDto> shDtos = 
					shList.stream()
						.map(stokhis -> mapStokHisToStokHistDto(stokhis))
						.collect(Collectors.toList());
			return shDtos; 
	 }
	 
	// Ambil semua data variant berdasarkan idBarang
		@GetMapping("/variant")
		public List<VariantDto> getByIdBarang(@RequestParam(value = "id_barang") String barang){
			List<Variant> vList = variantRepository.findAllByBarangIdBarang(barang);
			List<VariantDto> vDtos =
		   			 vList.stream()
		   			 .map(variant -> mapVariantToVariantDto(variant))
		   			 .collect(Collectors.toList());
			return vDtos;
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
			return vDto;
		}
	 
	// get stok by cabang, Percobaan
//	    @GetMapping("/getbycabang")
//	    public List<StokHistory> getByIdCabang (@RequestParam(value = "id_cabang") Cabang cabang){
//	    	return stokhistRepository.findByIdCabang(cabang);
//	    }
	 
}
