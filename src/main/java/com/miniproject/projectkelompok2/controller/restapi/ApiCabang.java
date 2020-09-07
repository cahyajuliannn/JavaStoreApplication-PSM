package com.miniproject.projectkelompok2.controller.restapi;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
//import java.util.Map;
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
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.projectkelompok2.model.dto.TokoDto;
import com.miniproject.projectkelompok2.model.entity.BankAccount;
import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.ManajemenBank;
import com.miniproject.projectkelompok2.model.entity.Toko;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.BankAccountRepository;
import com.miniproject.projectkelompok2.repository.CabangRepository;
import com.miniproject.projectkelompok2.repository.ManajemenBankRepository;
import com.miniproject.projectkelompok2.repository.TokoRepository;
import com.miniproject.projectkelompok2.service.CabangService;
import com.miniproject.projectkelompok2.service.TokoService;
//import com.miniproject.projectkelompok2.service.TokoService;
import com.miniproject.projectkelompok2.util.UserAuth;

@RestController
@RequestMapping("/api/cabang")

public class ApiCabang {
	
	@Autowired
	private TokoService tokoService;
	
	@Autowired
	private CabangRepository cabangRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private CabangService cbService;
	
	@Autowired
	private ManajemenBankRepository mbRepo;
	
	@Autowired
	private BankAccountRepository baRepo;
	
	@Autowired
	private TokoRepository tRepository;
	
	
	
	@PostMapping
	public Cabang editSaveCabang (@RequestBody Cabang cabang) {
		cabangRepository.save(cabang);
//		
		tokoService.countJumlahCabang(cabang.getToko().getIdToko()); //tambah cabang
		return cabang;
	}

	@GetMapping
	public List<TokoDto> getListCabang () {
	List<Cabang> cList = cabangRepository.findAllAndIsDelete();
	List<TokoDto> tDtos = new ArrayList<>();
	for (int i = 0; i<cList.size(); i++) {
		TokoDto tDto = new TokoDto();
		tDto.setIdCabang(cList.get(i).getIdCabang());
		tDto.setNamaCabang(cList.get(i).getNamaCabang());
		tDto.setAlamatCabang(cList.get(i).getAlamatCabang());
		tDto.setTanggalBerdiri(cList.get(i).getTanggalBerdiri());
		tDto.setJamBuka(cList.get(i).getJamBuka());
		tDto.setJamTutup(cList.get(i).getJamTutup());
		
		tDto.setKotaKab(cList.get(i).getKotaKab());
		tDto.setStatus(cList.get(i).getStatus());
		
		tDto.setIdAkun(cList.get(i).getBAccount().getIdAkun());
		tDto.setNoRekening(cList.get(i).getBAccount().getNoRekening());
		tDto.setNamaPemilik(cList.get(i).getBAccount().getNamaPemilik());
		
		tDto.setIdBank(cList.get(i).getBAccount().getManajemenBank().getIdBank());
		tDto.setNamaBank(cList.get(i).getBAccount().getManajemenBank().getNamaBank());
		
		
		tDto.setIdToko(cList.get(i).getToko().getIdToko());
		tDto.setNamaToko(cList.get(i).getToko().getNamaToko());
		tDto.setNpwp(cList.get(i).getToko().getNpwp());
		tDto.setAlamatToko(cList.get(i).getToko().getAlamatToko());
		tDto.setDeskripsi(cList.get(i).getToko().getDeskripsi());
		tDto.setJumlahCabang(cList.get(i).getToko().getJumlahCabang());
		
		tDtos.add(tDto);
	}
		return tDtos;
	}

	@GetMapping("/{idCabang}")
	public TokoDto getCabang (@PathVariable String idCabang) {
		Cabang cabang = cabangRepository.findById(idCabang).get();
		
		TokoDto tokoDto = new TokoDto();
		tokoDto.setIdCabang(cabang.getIdCabang());
		tokoDto.setNamaCabang(cabang.getNamaCabang());
		tokoDto.setAlamatCabang(cabang.getAlamatCabang());
		tokoDto.setTanggalBerdiri(cabang.getTanggalBerdiri());
		tokoDto.setJamBuka(cabang.getJamBuka());
		tokoDto.setJamTutup(cabang.getJamTutup());
		tokoDto.setIdCabang(cabang.getIdCabang());
		
		tokoDto.setKotaKab(cabang.getKotaKab());
		tokoDto.setStatus(cabang.getStatus());
		
		tokoDto.setIdAkun(cabang.getBAccount().getIdAkun());
		tokoDto.setNamaPemilik(cabang.getBAccount().getNamaPemilik());
		tokoDto.setNoRekening(cabang.getBAccount().getNoRekening());
		
		tokoDto.setIdBank(cabang.getBAccount().getManajemenBank().getIdBank());
		tokoDto.setNamaBank(cabang.getBAccount().getManajemenBank().getNamaBank());
		
		tokoDto.setIdToko(cabang.getToko().getIdToko());
		tokoDto.setAlamatToko(cabang.getToko().getAlamatToko());
		tokoDto.setNamaToko(cabang.getToko().getNamaToko());
		tokoDto.setNpwp(cabang.getToko().getNpwp());
		tokoDto.setDeskripsi(cabang.getToko().getDeskripsi());
		
		return tokoDto;
		
	}
	@DeleteMapping("/{idCabang}")
	public void delete(@PathVariable String idCabang) {
		Cabang c = cabangRepository.findAllByIdCabang(idCabang);
//		Cabang a = cabangRepository.findById(idCabang).get();
//		ManajemenBank mb = mbRepo.findByIdAkun(a.getBAccount().getManajemenBank().getIdBank()).;
		BankAccount ba = baRepo.findById(c.getBAccount().getIdAkun()).get();
				
//		cabangRepository.deleteById(idCabang);
//		baRepo.deleteById(a.getBAccount().getIdAkun());
		
		
		User userLogin = UserAuth.getUser();
		Date currentDate = new Date();
		
		c.setIsDelete(true);
		c.setDeletedBy(userLogin.getUsername());
//		c.setCreatedOn(currentDate);
		c.setDeleteOn(currentDate);
		
		ba.setIsDelete(true);
		ba.setDeletedBy(userLogin.getUsername());
		ba.setDeleteOn(currentDate);
	
		
		cabangRepository.save(c);
//		tokoService.countJumlahCabang(c.getToko().getIdToko());
//		tokoService.countJumlahAktif(c.getToko().getIdToko());
//		tokoService.countJumlahTidakAktif(c.getToko().getIdToko());
	}
	
//	@PutMapping ("/{id}")
//	public ResponseEntity<Cabang> editSaveCabang (@PathVariable String id,
//			@Valid @RequestBody Cabang newestCabang) {
//		
//		User userLogin = UserAuth.getUser();
//		Date currentDate = new Date();
//		
//		Cabang newCb = cabangRepository.findById(id).get();
//		modelMapper.map(newestCabang, newCb);
//		
//		newCb.setModifiedBy(userLogin.getUsername());
//		newCb.setModifiedOn(currentDate);
//		
//		newCb.setBAccount();
//		
//		
//		final Cabang editSaveCabang = cabangRepository.save(newCb);
////		tokoService.countJumlahAktif(newestCabang.getToko().getIdToko());
////		tokoService.countJumlahTidakAktif(newestCabang.getToko().getIdToko());
//		
//		return ResponseEntity.ok(editSaveCabang);
//	}
	
	
	@PutMapping ("/{idCabang}")
	public ResponseEntity<TokoDto> editsaveToko (@PathVariable String idCabang, @Valid @RequestBody TokoDto tDto) {
//		
//		Cabang ca = new Cabang();
		
//		BankAccount ba = new BankAccount();
//		Cabang ca = cabangRepository.findById(idCabang).get();
		Cabang ca = cabangRepository.findAllByIdCabang(idCabang);
		BankAccount ba = baRepo.findById(ca.getBAccount().getIdAkun()).get();
		
		Date currentDate = new Date();
		User userLogin = UserAuth.getUser();
		
//		ba.setIdAkun(ca.getBAccount().getIdAkun());
		ba.setNamaPemilik(tDto.getNamaPemilik());
		ba.setNoRekening(tDto.getNoRekening());
		
		ba.setModifiedBy(userLogin.getUsername());
		ba.setModifiedOn(currentDate);
		ca.setModifiedBy(userLogin.getUsername());
		ca.setModifiedOn(currentDate);
		
		ca.setAlamatCabang(tDto.getAlamatCabang());
		ca.setNamaCabang(tDto.getNamaCabang());
		ca.setJamBuka(tDto.getJamBuka());
		ca.setJamTutup(tDto.getJamTutup());
		ca.setKotaKab(tDto.getKotaKab());
		ca.setTanggalBerdiri(tDto.getTanggalBerdiri());
		ca.setStatus(tDto.getStatus());
		ca.setBAccount(ba);
		
		ManajemenBank mb = mbRepo.findAllByIdBank(tDto.getIdBank());
		
		mb.setIdBank(tDto.getIdBank());
		ba.setManajemenBank(mb);
		
		
//		ca.setCreatedBy(userLogin.getUsername());
//		ca.setCreatedOn(currentDate);
////		
//		ba.setCreatedBy(userLogin.getUsername());
//		ba.setCreatedOn(currentDate);
		
		final Cabang editSaveToko = cabangRepository.save(ca);
//		final BankAccount editSavebank = baRepo.save(ba);
		baRepo.save(ba);
		
		tDto.setIdAkun(ba.getIdAkun());
		tDto.setNamaPemilik(ba.getNamaPemilik());
		tDto.setNoRekening(ba.getNoRekening());
		
//		tDto.setIdBank(mb.getIdBank());
//		tDto.setNamaBank(mb.getNamaBank());
		
		tDto.setAlamatCabang(ca.getAlamatCabang());
//		tDto.setIdCabang(ca.getIdCabang());
		tDto.setJamBuka(ca.getJamBuka());
		tDto.setJamTutup(ca.getJamTutup());
		tDto.setTanggalBerdiri(ca.getTanggalBerdiri());
		tDto.setKotaKab(ca.getKotaKab());
		
		tDto.setIdCabang(editSaveToko.getIdCabang());
		tDto.setIdAkun(editSaveToko.getBAccount().getIdAkun());
		tDto.setIdBank(editSaveToko.getBAccount().getManajemenBank().getIdBank());
		
		return ResponseEntity.ok(tDto);
		
	}
	
	@PostMapping("/savelist")
	public List<Cabang> saveAll(@RequestBody List<Cabang> cabang){
		List<Cabang> listresponse = (List<Cabang>) tokoService.saveAllCabang(cabang);
		for (int i = 0; i<listresponse.size(); i++) {
		tokoService.countJumlahCabang(cabang.get(i).getToko().getIdToko()); //tambah cabang
		tokoService.countJumlahAktif(cabang.get(i).getToko().getIdToko()); //17 Aprl 2020
		tokoService.countJumlahTidakAktif(cabang.get(i).getToko().getIdToko());
		
		}
		return listresponse;
		
	}
	
	//ditambah pada 16 April 2020
	//filter by status
	@GetMapping ("/filter/{status}")
	public List<Cabang> getBySts(@PathVariable String status){
	return cabangRepository.caristatus(status);
	}

	//menghitung jumlah cabang yang aktif/non aktif
	@GetMapping("/hitung/{status}")
	public Integer getJumlahStatus (@PathVariable String status) {
		List<Cabang> jumlahsts = cabangRepository.findAllByStatus(status);
		return jumlahsts.size();
	}
	//filter by Kota
	@GetMapping ("/namakota/{kotaKab}")
	public List<Cabang> getByKota(@PathVariable String kotaKab){
	return cabangRepository.carikota(kotaKab);
	}
	
	//filter by nama cabang
	@GetMapping("/namacabang/{namaCabang}")
	public List<Cabang> getByCabang(@PathVariable String namaCabang){
		return cabangRepository.caricabang(namaCabang);
	}
	
	//nambain
	@PostMapping("/savebaru")
//	public void saveList (@RequestBody List<TokoDto> tDtoList) {
	public List<Cabang> saveList (@RequestBody List<TokoDto> tDtoList) {
		List<Cabang> cList = tDtoList.stream()
				.map(tDto -> maptDtoToCabang(tDto))
				.collect(Collectors.toList());
		cbService.saveAllList(cList);
//		for (int i = 0; i<cList.size(); i++) {
////			tokoService.countJumlahCabang(cList.get(i).getToko().getIdToko()); //tambah cabang
////			tokoService.countJumlahAktif(cList.get(i).getToko().getIdToko()); //17 Aprl 2020
////			tokoService.countJumlahTidakAktif(cList.get(i).getToko().getIdToko());
//			
//			}
		return cList;
	}

	private Cabang maptDtoToCabang(TokoDto tDto) {
		// TODO Auto-generated method stub
		Toko toko = tRepository.findById(tDto.getIdToko()).get();
		
		Date currentDate = new Date();
		User userLogin = UserAuth.getUser();
		
		BankAccount ba = modelMapper.map(tDto, BankAccount.class);
		
		ba.setNamaPemilik(tDto.getNamaPemilik());
		ba.setNoRekening(tDto.getNoRekening());
		
		ManajemenBank man = mbRepo.findById(tDto.getIdBank()).get();
		ba.setManajemenBank(man);
		
		ba.setCreatedBy(userLogin.getUsername());
		ba.setCreatedOn(currentDate);
		
		BankAccount ba2 = baRepo.save(ba);
		
		Cabang cabang = modelMapper.map(tDto, Cabang.class);
		cabang.setAlamatCabang(tDto.getAlamatCabang());
		cabang.setNamaCabang(tDto.getNamaCabang());
		cabang.setJamBuka(tDto.getJamBuka());
		cabang.setJamTutup(tDto.getJamTutup());
		cabang.setTanggalBerdiri(tDto.getTanggalBerdiri());
		cabang.setBAccount(ba2); // ba 2 sudah save ba
		
		cabang.setToko(toko);
		
		//baru ditambahkan
		cabang.setCreatedBy(userLogin.getUsername());
		cabang.setCreatedOn(currentDate);

		return cabang;
	}
	
	//get semua data berdasarkan id Cabang
	@GetMapping("/cb")
	public List<Cabang> getByIdCabang (@PathParam(value = "idCabang") String idCabang) {
		return cabangRepository.findByIdCabang(idCabang);
	}
	//filter by idCabang
	@GetMapping("/idCabang/{idCabang}")
	public List<Cabang> getByidCabang(@PathVariable String idCabang){
		return cabangRepository.cariIdCabang(idCabang);
	}
	
//	@GetMapping("/cari/{namaCabang}/{kotaKab}/{status}")
//	public List<Cabang> getByNamaKotaStatus(@PathVariable String namaCabang, @PathVariable String kotaKab, @PathVariable String status) {
//		return cabangRepository.findbyFilter(namaCabang, kotaKab, status);
//	}
	
	@GetMapping("/cari/{namaCabang}/{kotaKab}/{status}")
	public List<Cabang> getByNamaKotaStatus(@PathVariable String namaCabang, @PathVariable String kotaKab, @PathVariable String status) {
		return cabangRepository.findByNamaCabangContainingIgnoreCaseAndKotaKabContainingIgnoreCaseAndStatusAndIsDeleteFalse(namaCabang, kotaKab, status);
	}
	
	
	@GetMapping("/countcabang/{idToko}")
	public Long hitungcabang (@PathVariable String idToko) {
		return cabangRepository.countByTokoIdTokoAndIsDeleteFalse(idToko);
	}

	@GetMapping("/countstatus/{status}")
	public Long hitungstatus (@PathVariable String status) {
		return cabangRepository.countByStatusAndIsDeleteFalse(status);
	}
	
//	@GetMapping("/carisemua/{namaCabang}/{kotaKab}/{status}")
//	public List<TokoDto> getByAll (@PathVariable String namaCabang, @PathVariable String kotaKab, @PathVariable String status) {
//		List<Cabang> cList = cabangRepository.findByNamaCabangContainingIgnoreCaseAndKotaKabContainingIgnoreCaseAndStatusAndIsDeleteFalse(namacabang, kotakab, status);
//		
//	}
	
}
	
