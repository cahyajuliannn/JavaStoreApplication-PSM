package com.miniproject.projectkelompok2.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
import com.miniproject.projectkelompok2.util.UserAuth;

@Transactional
@Service
public class StokServiceImpl implements StokService {
	// histok -> stok -> barang
	
		@Autowired
		private StokHistoryRepository stokhistRepository;
		
		@Autowired
		private BarangRepository barangRepository;
		
		@Autowired
		private CabangRepository cabangRepository;
		
		@Autowired
		private StokRepository stokRepository;
		
		@Autowired
		private ModelMapper modelMapper;

    @Override
	public StokHistoryDto saveNew(StokHistoryDto shDto) {   // ID Histok Generated
		// TODO Auto-generated method stub
    	Stok stok = new Stok();
		 StokHistory sHist = new StokHistory();
		 // FK dari FK (jika ada)
		 Barang barang = new Barang();
	     Cabang cabang = new Cabang();
	     
	     Barang barang1 = barangRepository.findById(shDto.getIdBarang()).get();
	     Cabang cabang1 = cabangRepository.findById(shDto.getIdCabang()).get();
	     shDto.setNamaBarang(barang1.getNamaBarang());
	     shDto.setIdKategori(barang1.getKategoriBarang().getIdKategori()); 
	     shDto.setNamaKategori(barang1.getKategoriBarang().getNamaKategori()); 
	     shDto.setNamaCabang(cabang1.getNamaCabang());
	     
	     barang.setIdBarang(shDto.getIdBarang());
	     cabang.setIdCabang(shDto.getIdCabang());
	     
	     // FK tdekat (Stok)
//		 stok.setIdStok(shDto.getIdStok()); // 
		 stok.setVariantAja(shDto.getVariantAja());    
	     stok.setGudang(shDto.getGudang());
		 stok.setJumlahStok(shDto.getKuantitas());	
		 stok.setBarang(barang);	// FK set FK yg jauh namun terkait
	     stok.setCabang(cabang);
	     stokRepository.save(stok);
	     
		 // entitynya itself
//		 sHist.setIdHistok(shDto.getIdHistok());
		 sHist.setKuantitas(shDto.getKuantitas());
		 sHist.setStatus(shDto.getStatus());
		 sHist.setTglTransaksi(shDto.getTglTransaksi());
		 sHist.setAlasan(shDto.getAlasan());
		 sHist.setStok(stok);
		 
		 
		 StokHistory sHist2 = stokhistRepository.save(sHist);
		 
		 // id utk response // 
		 shDto.setIdStok(stok.getIdStok());			
		 shDto.setIdHistok(sHist2.getIdHistok());
		 shDto.setJumlahStok(stok.getJumlahStok());
		 
		 return shDto;	//response
	}
    

	@Override
	public StokHistoryDto savePlusMinus(StokHistoryDto sHDto) { // ID Histok Generated
		// TODO Auto-generated method stub
		 User userLogin = UserAuth.getUser();
		 Date currentDate = new Date();
		
		 StokHistory sHist = new StokHistory(); 
		 Stok stok = new Stok(); 
		 stok.setIdStok(sHDto.getIdStok()); 
		 sHist.setStok(stok);	// save new histok
		 
		 modelMapper.map(sHDto, sHist); 
		 Stok stok2 = stokRepository.findById(sHDto.getIdStok()).get();
		 sHDto.setIdBarang(stok2.getBarang().getIdBarang());
		 sHDto.setNamaBarang(stok2.getBarang().getNamaBarang());
		 sHDto.setIdKategori(stok2.getBarang().getKategoriBarang().getIdKategori());
		 sHDto.setNamaKategori(stok2.getBarang().getKategoriBarang().getNamaKategori());
		 sHDto.setIdCabang(stok2.getCabang().getIdCabang());
		 sHDto.setNamaCabang(stok2.getCabang().getNamaCabang());

		 if (sHDto.getStatus().equalsIgnoreCase("Masuk")) {
			 stok2.setJumlahStok(stok2.getJumlahStok() + sHist.getKuantitas());
		 } else {
			 stok2.setJumlahStok(stok2.getJumlahStok() - sHist.getKuantitas());	
		 }
		 
		 stok2.setGudang(sHDto.getGudang());  // edit gudang
		 stok2.setCreatedBy(userLogin.getUsername());
		 stok2.setCreatedOn(currentDate);
		 sHist.setCreatedBy(userLogin.getUsername());
		 sHist.setCreatedOn(currentDate);
//		 Barang b = barangRepository.findById(sHDto.getIdBarang()).get();
//		 b.setIdBarang(sHDto.getIdBarang()); // edit Id Barang
//		 stok2.setBarang(b); // edit Id Barang
		 
		 sHDto.setJumlahStok(stok2.getJumlahStok());	
		 sHDto.setVariantAja(stok2.getVariantAja());    
		 stokhistRepository.save(sHist); 
		 modelMapper.map(sHist, sHDto); 
		 return sHDto;
	  
	}
	

	@Override
	public List<StokHistory> saveAllShist(List<StokHistory> shistList) {
		// TODO Auto-generated method stub
		return stokhistRepository.saveAll(shistList);
	}


	@Override
	public void saveAllStok(List<Stok> stokList) {
		// TODO Auto-generated method stub
		stokRepository.saveAll(stokList);
		
	 // void
	}


	@Override
	public StokHistory mapDtoToHist(StokHistoryDto shDto) {
		// TODO Auto-generated method stub
		User userLogin = UserAuth.getUser();
		Date currentDate = new Date();
		
		Barang barang1 = barangRepository.findById(shDto.getIdBarang()).get();
		Cabang cabang1 = cabangRepository.findById(shDto.getIdCabang()).get();
		Stok stok = modelMapper.map(shDto, Stok.class);
		
		stok.setJumlahStok(shDto.getKuantitas());  
		stok.setGudang(shDto.getGudang());
		stok.setVariantAja(shDto.getVariantAja());
		
		stok.setBarang(barang1);
		stok.setCabang(cabang1);
		
		stok.setCreatedBy(userLogin.getUsername());
		stok.setCreatedOn(currentDate);
		
		Stok stok2 = stokRepository.save(stok);
		StokHistory shist = modelMapper.map(shDto, StokHistory.class);
		shist.setAlasan(shDto.getAlasan());
		shist.setKuantitas(shDto.getKuantitas());
		shist.setStatus(shDto.getStatus());
		shist.setTglTransaksi(shDto.getTglTransaksi());
		shist.setStok(stok2);
		
		shist.setCreatedBy(userLogin.getUsername());
		shist.setCreatedOn(currentDate);
		return shist;
		
	}
}


