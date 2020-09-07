package com.miniproject.projectkelompok2.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniproject.projectkelompok2.model.dto.TokoDto;
import com.miniproject.projectkelompok2.model.entity.BankAccount;
import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.ManajemenBank;
import com.miniproject.projectkelompok2.model.entity.Toko;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.BankAccountRepository;
import com.miniproject.projectkelompok2.repository.CabangRepository;
import com.miniproject.projectkelompok2.repository.ManajemenBankRepository;
import com.miniproject.projectkelompok2.util.UserAuth;

@Transactional
@Service
public class CabangServicempl implements CabangService{
	
	@Autowired
	private CabangRepository cRepository;
	
	@Autowired
	private ManajemenBankRepository mbRepo;
	
	@Autowired
	private BankAccountRepository baRepo;
	
	@Override
	public TokoDto save(TokoDto tDto) {
		
		//tambah
		User userLogin = UserAuth.getUser();
		Date currentDate = new Date();
		//batas
		
		
		BankAccount ba = new BankAccount();
		Cabang ca = new Cabang();
		Toko to = new Toko();
		
		
		
		ManajemenBank mb = new ManajemenBank();
		ManajemenBank mb1 = mbRepo.findById(tDto.getIdBank()).get();
		tDto.setNamaBank(mb1.getNamaBank());
		
		mb.setIdBank(tDto.getIdBank());
		
		ba.setNoRekening(tDto.getNoRekening());
		ba.setNamaPemilik(tDto.getNamaPemilik());
		ba.setManajemenBank(mb);
		
//		ba.setCreatedBy(userLogin.getUsername());
//		ba.setCreatedOn(currentDate);
		
		baRepo.save(ba);
		
		to.setAlamatToko(tDto.getAlamatToko());
		to.setIdToko(tDto.getIdToko());
		to.setNamaToko(tDto.getNamaToko());
		to.setNpwp(tDto.getNpwp());
		to.setJumlahCabang(tDto.getJumlahCabang());
		

//		ca.setCreatedBy("admin");
		ca.setNamaCabang(tDto.getNamaCabang());
		ca.setAlamatCabang(tDto.getAlamatCabang());
		ca.setKotaKab(tDto.getKotaKab());
		ca.setTanggalBerdiri(tDto.getTanggalBerdiri());
//		ca.setIdCabang(tDto.getIdCabang());
		ca.setJamBuka(tDto.getJamBuka());
		ca.setJamTutup(tDto.getJamTutup());
		ca.setStatus(tDto.getStatus());
		
		
		ca.setToko(to);
		ca.setBAccount(ba);
		
		
		//tambah
//		ca.setCreatedBy(userLogin.getUsername());
//		ca.setCreatedOn(currentDate);
		//tambah batas tambah
		
		Cabang ca2 = cRepository.save(ca);
		
		tDto.setIdAkun(ba.getIdAkun());	
		tDto.setIdCabang(ca2.getIdCabang());
		tDto.setIdToko(to.getIdToko());
		
		return tDto;
		
	}
	@Override
	public void saveAllList(List<Cabang> cList) {
		cRepository.saveAll(cList);
	}
//	
//	@Override
//	

}
