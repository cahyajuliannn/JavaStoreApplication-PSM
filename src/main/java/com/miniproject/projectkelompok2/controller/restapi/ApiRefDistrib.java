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
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.projectkelompok2.model.dto.DistriBarangDto;
import com.miniproject.projectkelompok2.model.dto.DistribuDto;
import com.miniproject.projectkelompok2.model.entity.BankAccount;
import com.miniproject.projectkelompok2.model.entity.Barang;
import com.miniproject.projectkelompok2.model.entity.Distributor;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.model.entity.Variant;
import com.miniproject.projectkelompok2.repository.BankAccountRepository;
import com.miniproject.projectkelompok2.repository.BarangRepository;
import com.miniproject.projectkelompok2.repository.RefDistribRepository;
import com.miniproject.projectkelompok2.repository.VariantRepository;
import com.miniproject.projectkelompok2.service.DistributorService;
import com.miniproject.projectkelompok2.util.UserAuth;


@RestController
@RequestMapping("/api/ref-dist")
public class ApiRefDistrib {
    @Autowired
    private RefDistribRepository refDistribRepository;

    @Autowired
    private BarangRepository barangRepository;
    
    @Autowired
    private VariantRepository variRepository;
    
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private DistributorService distService;
    
    @Autowired
    private BankAccountRepository bankAccRepository;
    
    @GetMapping()
    public List<DistribuDto> getAllDist() {
    	List<Distributor> dList = refDistribRepository.findAll();
    	List<DistribuDto> dDtos = 
    			dList.stream()
    				.map(dis -> mapDisToDisDto(dis))
    				.collect(Collectors.toList());
        return dDtos;
    }

    private DistribuDto mapDisToDisDto(Distributor dis) {
    	DistribuDto dDto = modelMapper.map(dis, DistribuDto.class);
    	modelMapper.map(dis.getBankAccount(), dDto);
    	dDto.setIdAkunBank(dis.getBankAccount().getIdAkun());
    	dDto.setNoRekening(dis.getBankAccount().getNoRekening());
    	dDto.setAtasNama(dis.getBankAccount().getNamaPemilik());
    	dDto.setIdManejBank(dis.getBankAccount().getManajemenBank().getIdBank());
    	dDto.setNamaBank(dis.getBankAccount().getManajemenBank().getNamaBank());
    	
    	dDto.setDistID(dis.getDistID());
    	return dDto;
    }
    
    @GetMapping("/filter/{namaPT}/{alamatPT}/{npwpPT}")
    public List<DistribuDto> getByFilter(@PathVariable String namaPT, 
    		@PathVariable String alamatPT, 
    		@PathVariable String npwpPT) {
    	List<Distributor> dList = refDistribRepository.cariBerdasarkanFilter(namaPT, alamatPT, npwpPT);
    	List<DistribuDto> dDtos = 
    			dList.stream()
    				.map(dis -> mapDisToDisDto(dis))
    				.collect(Collectors.toList());
        return dDtos;
    }
    
    @GetMapping("/filterbank/{namaPT}/{namaBank}")
    public List<DistribuDto> getByBank(@PathVariable String namaPT, @PathVariable String namaBank){
    	List<Distributor> dList = refDistribRepository.findByNamaPTContainingIgnoreCaseAndBankAccountManajemenBankNamaBankContainingIgnoreCaseAndIsDeleteFalse(namaPT, namaBank);
    	List<DistribuDto> dDtos = 
    			dList.stream()
    				.map(dis -> mapDisToDisDto(dis))
    				.collect(Collectors.toList());
        return dDtos;
    }
    
    @PostMapping	// use /posthree instead
    public Distributor save(@RequestBody Distributor refDistributor) {

        return refDistribRepository.save(refDistributor);
    }

    @PutMapping("/{DistID}")
    public ResponseEntity<Distributor> save(@PathVariable String DistID,
    		@Valid @RequestBody Distributor newestDist) {
    	User userLogin = UserAuth.getUser(); //
        Date currentDate = new Date();  //
    	Distributor newDist = refDistribRepository.findById(DistID).get();
    	BankAccount newBank = bankAccRepository.findById(newDist.getBankAccount().getIdAkun()).get();
    	modelMapper.map(newestDist, newDist);
    	
    	newDist.setModifiedBy(userLogin.getUsername());
    	newDist.setModifiedOn(currentDate);
    	
    	modelMapper.map(newestDist.getBankAccount(), newBank);
    	newBank.setModifiedBy(userLogin.getUsername());
    	newBank.setModifiedOn(currentDate);
    	
    	bankAccRepository.save(newBank);
    	refDistribRepository.save(newDist);
    	
    	final Distributor save2 = refDistribRepository.save(newDist);
    	return ResponseEntity.ok(save2);
    }
    
	@DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        refDistribRepository.deleteById(id);	
    }
    
    @GetMapping("/{DistID}")
    public DistribuDto getDist(@PathVariable String DistID) {
    	Distributor d = refDistribRepository.findById(DistID).get();
    	DistribuDto dDto = new DistribuDto();
    	dDto.setDistID(d.getDistID());
    	dDto.setNamaPT(d.getNamaPT());
    	dDto.setAlamatPT(d.getAlamatPT());
    	dDto.setNpwpPT(d.getNpwpPT());
    	dDto.setEmailPT(d.getEmailPT());
    	dDto.setNoTelpPT(d.getNoTelpPT());
    	dDto.setIdManejBank(d.getBankAccount().getManajemenBank().getIdBank());
    	dDto.setNamaBank(d.getBankAccount().getManajemenBank().getNamaBank());
    	dDto.setIdAkunBank(d.getBankAccount().getIdAkun());
    	dDto.setNoRekening(d.getBankAccount().getNoRekening());
    	dDto.setAtasNama(d.getBankAccount().getNamaPemilik());
    	
    	
    	return dDto;
    }
    
    @GetMapping("/get")
    public Distributor getByDistID(@RequestParam(value="id_dist") String DistID) {
    	return refDistribRepository.findByDistID(DistID);
    }
   
    @PostMapping("/posthree")
    public DistribuDto save(@RequestBody DistribuDto dDto) {
    	   	distService.save(dDto);
    	return dDto;
    }
    
    @GetMapping("/barang/{distID}")		// get barang dgn var msg2 by id distrib
    public List<DistriBarangDto> showBarang (@PathVariable String distID) {
    	List<Barang> bList = barangRepository.findAllByDistributorDistID(distID);
    	List<DistriBarangDto> dbDtoList = new ArrayList<>();
    	
    	for (int i = 0; i < bList.size(); i++) {
			DistriBarangDto dbDto = new DistriBarangDto();
			
//			Long stok = 
			dbDto.setIdBarang(bList.get(i).getIdBarang());
			dbDto.setNamaBarang(bList.get(i).getNamaBarang());
			dbDto.setIdKategori(bList.get(i).getKategoriBarang().getIdKategori());
			dbDto.setNamaKategori(bList.get(i).getKategoriBarang().getNamaKategori());
			dbDto.setDistID(bList.get(i).getDistributor().getDistID());
			dbDto.setNamaPT(bList.get(i).getDistributor().getNamaPT());
			List<Variant> vaList = variRepository.findAllByBarangIdBarang(dbDto.getIdBarang());
			dbDto.setVariants(vaList);
			dbDtoList.add(dbDto);
		}
    	
    	return dbDtoList;
    }
    
//    @PostMapping("/isdeleted/{distID}")
//    public Distributor isdelete(@PathVariable String distID) {
//    	
//    	User userLogin = UserAuth.getUser(); //
//        Date currentDate = new Date();  //
//    	
//    	Distributor dist = refDistribRepository.findByDistID(distID);
//
//    	dist.setCreatedBy(userLogin.getUsername());
//    	dist.setCreatedOn(currentDate);
//    	dist.setIsDelete(Boolean.TRUE);
//    	
//    	return refDistribRepository.save(dist);
//    }
    
    @PutMapping("/isdelete/{id}")
    public ResponseEntity<Distributor> isDelete(@PathVariable String id){
    	User userLogin = UserAuth.getUser(); 
        Date currentDate = new Date();  
        Distributor newdist = refDistribRepository.findById(id).get();

        newdist.setDeletedBy(userLogin.getUsername());
        newdist.setDeleteOn(currentDate);
        newdist.setIsDelete(Boolean.TRUE);
        
        final Distributor updateDist = refDistribRepository.save(newdist);
        return ResponseEntity.ok(updateDist);
    }
    
    @GetMapping("/brg/filters/{nmBrg}/{nmKtg}/{nmPT}")
    public List<Barang> filterBrg(@PathVariable String nmBrg, @PathVariable String nmKtg, @PathVariable String nmPT){
    		return barangRepository.findByNamaBarangContainingIgnoreCaseAndKategoriBarangNamaKategoriContainingIgnoreCaseAndDistributorNamaPTContainingIgnoreCaseAndIsDeleteFalse(nmBrg, nmKtg, nmPT);
    }
    
}
