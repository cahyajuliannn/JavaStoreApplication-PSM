package com.miniproject.projectkelompok2.service;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniproject.projectkelompok2.model.dto.DistribuDto;
import com.miniproject.projectkelompok2.model.entity.BankAccount;
import com.miniproject.projectkelompok2.model.entity.Distributor;
import com.miniproject.projectkelompok2.model.entity.ManajemenBank;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.BankAccountRepository;
import com.miniproject.projectkelompok2.repository.ManajemenBankRepository;
import com.miniproject.projectkelompok2.repository.RefDistribRepository;
import com.miniproject.projectkelompok2.util.UserAuth;

@Transactional
@Service
public class DistribServiceImpl implements DistributorService {

	 	@Autowired
	    private RefDistribRepository refDistribRepository;

	    @Autowired
	    private ManajemenBankRepository manBankRepository;
	    
	    @Autowired
	    private BankAccountRepository baAccRepository;
	    
	
	@Override
	public DistribuDto save(DistribuDto dDto) {
		// TODO Auto-generated method stub
		User userLogin = UserAuth.getUser(); //
        Date currentDate = new Date();  //
		
		BankAccount ba = new BankAccount();
    	Distributor d = new Distributor();
    	
    	// FK dari FK (jika ada)
    	ManajemenBank m = new ManajemenBank();
    	ManajemenBank m1 = manBankRepository.findById(dDto.getIdManejBank()).get();
    	dDto.setNamaBank(m1.getNamaBank());
    	
    	m.setIdBank(dDto.getIdManejBank());
    	
    	// FK terdekat, akunbank 
//    	ba.setIdAkun(dDto.getIdAkunBank());
    	ba.setNoRekening(dDto.getNoRekening());
    	ba.setNamaPemilik(dDto.getAtasNama());
    	ba.setManajemenBank(m);
    	ba.setCreatedOn(currentDate);
    	ba.setCreatedBy(userLogin.getUsername());
    	baAccRepository.save(ba);
    	
    	// entity itself
    	d.setNamaPT(dDto.getNamaPT());
    	d.setAlamatPT(dDto.getAlamatPT());
    	d.setNpwpPT(dDto.getNpwpPT());
    	d.setEmailPT(dDto.getEmailPT());
    	d.setNoTelpPT(dDto.getNoTelpPT());
    	d.setBankAccount(ba);
    	
    	d.setCreatedBy(userLogin.getUsername());
    	d.setCreatedOn(currentDate);
    	
    	Distributor d2 = refDistribRepository.save(d);
    	
    	dDto.setIdAkunBank(ba.getIdAkun());
    	dDto.setDistID(d2.getDistID());
    	
    	return dDto;
	}

}
