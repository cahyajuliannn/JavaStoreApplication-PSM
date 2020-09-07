package com.miniproject.projectkelompok2.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniproject.projectkelompok2.model.dto.BiodataCustomerDto;
import com.miniproject.projectkelompok2.model.entity.BankAccount;
import com.miniproject.projectkelompok2.model.entity.Biodata;
import com.miniproject.projectkelompok2.model.entity.ContactBiodata;
import com.miniproject.projectkelompok2.model.entity.Customer;
import com.miniproject.projectkelompok2.model.entity.ManajemenBank;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.BankAccountRepository;
import com.miniproject.projectkelompok2.repository.BiodataRepository;
import com.miniproject.projectkelompok2.repository.ContactBiodataRepository;
import com.miniproject.projectkelompok2.repository.CustomerRepository;
import com.miniproject.projectkelompok2.repository.ManajemenBankRepository;
import com.miniproject.projectkelompok2.util.UserAuth;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired 
	CustomerRepository customerRepository;
	
	@Autowired
	BiodataRepository biodataRepository;
	
	@Autowired
	ContactBiodataRepository contactPersonRepository;
	
	@Autowired
	BankAccountRepository bankAccountRepository;
	
	@Autowired
	ManajemenBankRepository manajemenBankRepository;

	@Override
	public Customer latTransactional() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Customer saveCustomerMater(Customer customer) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BiodataCustomerDto updateBiodataCustomer(BiodataCustomerDto biodataCustomerDto) {
		// new buat pake common entity
		User userLogin = UserAuth.getUser();
		Date currentDate = new Date();
		
		List<ContactBiodata> contactBiodataDelete = contactPersonRepository.findAllByBiodataIdBiodata(biodataCustomerDto.getIdBiodata());
		
		// TODO Auto-generated method stub
		Biodata biodata = new Biodata();	
		BankAccount bankAccount = new BankAccount();		
		Customer customer = new Customer();
		
		ManajemenBank manajemenBank = new ManajemenBank();
		List<ContactBiodata> cpList = new ArrayList<>();
		
		if(biodataCustomerDto.getIdCustomer() != null && !biodataCustomerDto.getIdCustomer().equals("") &&
			biodataCustomerDto.getIdBiodata() != null && !biodataCustomerDto.getIdBiodata().equals(""))
		{
			Biodata biodata2 = biodataRepository.findByIdBiodata(biodataCustomerDto.getIdBiodata());
			BankAccount bankAccount2 = bankAccountRepository.findById(biodataCustomerDto.getIdAkun()).get();
			Customer customer2 = customerRepository.findByIdCustomer(biodataCustomerDto.getIdCustomer());
				
			biodata.setIdBiodata(biodataCustomerDto.getIdBiodata());
			customer.setIdCustomer(biodataCustomerDto.getIdCustomer());
			biodata.setCreatedBy("admin");
			biodata.setCreatedOn(biodata2.getCreatedOn());
			biodata.setModifiedBy("admin");
			biodata.setModifiedOn(currentDate);
			customer.setModifiedBy("admin");
			customer.setModifiedOn(currentDate);
			biodata.setNamaLengkap(biodataCustomerDto.getNamaLengkap());
			biodata.setAlamat(biodataCustomerDto.getAlamat());
			biodata.setKotaLokasi(biodataCustomerDto.getKotaLokasi());
			biodata.setTglLahir(biodataCustomerDto.getTglLahir());
			
			biodata.setCreatedBy("admin");
			biodata.setCreatedOn(currentDate);
			biodataRepository.save(biodata);
			
			for (ContactBiodata cp : biodataCustomerDto.getContactBiodata()) {
				ContactBiodata contactPerson = new ContactBiodata();
				contactPerson.setIdContact(cp.getIdContact());
				contactPerson.setJenisCP(cp.getJenisCP());
				contactPerson.setAccountName(cp.getAccountName());
				
				contactPerson.setBiodata(biodata);
				contactPerson.setCreatedBy("admin");
				contactPerson.setCreatedOn(currentDate);
				contactPerson.setModifiedBy("admin");
				contactPerson.setModifiedOn(currentDate);
				cpList.add(contactPerson);
				
			}
			if (contactBiodataDelete != null) {
				delete(biodataCustomerDto.getIdBiodata());
			}
			
			contactPersonRepository.saveAll(cpList);
			
			
			manajemenBank.setIdBank(biodataCustomerDto.getIdBank());
			
			bankAccount.setIdAkun(biodataCustomerDto.getIdAkun());
			bankAccount.setNamaPemilik(biodataCustomerDto.getNamaLengkap());
			bankAccount.setNoRekening(biodataCustomerDto.getNoRekening());
			bankAccount.setManajemenBank(manajemenBank);
			bankAccount.setModifiedBy("admin");
			bankAccount.setModifiedOn(currentDate);
			bankAccount.setCreatedBy(bankAccount2.getCreatedBy());
			bankAccount.setCreatedOn(bankAccount2.getCreatedOn());
			
			bankAccountRepository.save(bankAccount);
			
			customer.setTglMasuk(biodataCustomerDto.getTglMasuk());
			customer.setTglKeluar(biodataCustomerDto.getTglKeluar());
			customer.setBankAccount(bankAccount);
			customer.setBiodata(biodata);
			/* customer.setContactPerson(contactPerson); */
			customer.setCreatedBy(customer2.getCreatedBy());
			customer.setCreatedOn(customer2.getCreatedOn());
			customerRepository.save(customer);
			
			return null;
			
		}
		else {
			biodata.setIdBiodata(null);
			customer.setIdCustomer(null);
		
		biodata.setNamaLengkap(biodataCustomerDto.getNamaLengkap());
		biodata.setAlamat(biodataCustomerDto.getAlamat());
		biodata.setKotaLokasi(biodataCustomerDto.getKotaLokasi());
		biodata.setTglLahir(biodataCustomerDto.getTglLahir());
		
		biodata.setCreatedBy("admin");
		biodata.setCreatedOn(currentDate);
		biodataRepository.save(biodata);
		
		for (ContactBiodata cp : biodataCustomerDto.getContactBiodata()) {
			ContactBiodata contactPerson = new ContactBiodata();
			contactPerson.setIdContact(cp.getIdContact());
			contactPerson.setJenisCP(cp.getJenisCP());
			contactPerson.setAccountName(cp.getAccountName());
			
			contactPerson.setBiodata(biodata);
			
			contactPerson.setCreatedBy("admin");
			contactPerson.setCreatedOn(currentDate);
			cpList.add(contactPerson);
			
		}
		if (contactBiodataDelete != null) {
			delete(biodataCustomerDto.getIdBiodata());
		}
		
		contactPersonRepository.saveAll(cpList);
		
		
		manajemenBank.setIdBank(biodataCustomerDto.getIdBank());
		
//		bankAccount.setIdAkun(biodataCustomerDto.getIdAkun());
		bankAccount.setNamaPemilik(biodataCustomerDto.getNamaLengkap());
		bankAccount.setNoRekening(biodataCustomerDto.getNoRekening());
		bankAccount.setManajemenBank(manajemenBank);
		bankAccount.setCreatedBy("admin");
		bankAccount.setCreatedOn(currentDate);
		bankAccountRepository.save(bankAccount);
		
		customer.setTglMasuk(biodataCustomerDto.getTglMasuk());
		customer.setTglKeluar(biodataCustomerDto.getTglKeluar());
		customer.setBankAccount(bankAccount);
		customer.setBiodata(biodata);
		/* customer.setContactPerson(contactPerson); */
		customer.setCreatedBy("admin");
		customer.setCreatedOn(currentDate);
		customerRepository.save(customer);
		
		return null;
		}
	}

	
//	@Override
//	public BiodataCustomerDto updateBiodataCustomer(BiodataCustomerDto biodataCustomerDto) {
//		// TODO Auto-generated method stub
//		Biodata biodata = new Biodata();
//		BankAccount bankAccount = new BankAccount();
//		Customer customer = new Customer();
//		ManajemenBank manajemenBank = new ManajemenBank();
//		List<ContactBiodata> cpList = new ArrayList<>();
//		
//		if(biodataCustomerDto.getIdCustomer() != null && !biodataCustomerDto.getIdCustomer().equals("") &&
//			biodataCustomerDto.getIdBiodata() != null && !biodataCustomerDto.getIdBiodata().equals(""))
//		{
//				
//			biodata.setIdBiodata(biodataCustomerDto.getIdBiodata());
//			customer.setIdCustomer(biodataCustomerDto.getIdCustomer());
//			
//		}
//		else {
//			biodata.setIdBiodata(null);
//			customer.setIdCustomer(null);
//		}
//		
//		biodata.setNamaLengkap(biodataCustomerDto.getNamaLengkap());
//		biodata.setAlamat(biodataCustomerDto.getAlamat());
//		biodata.setKotaLokasi(biodataCustomerDto.getKotaLokasi());
//		biodata.setTglLahir(biodataCustomerDto.getTglLahir());
//		
//		biodataRepository.save(biodata);
//		
//		for (ContactBiodata cp : biodataCustomerDto.getContactBiodata()) {
//			ContactBiodata contactPerson = new ContactBiodata();
//			contactPerson.setIdContact(cp.getIdContact());
//			contactPerson.setJenisCP(cp.getJenisCP());
//			contactPerson.setAccountName(cp.getAccountName());
//			
//			contactPerson.setBiodata(biodata);
//			cpList.add(contactPerson);
//			
//		}
//		
//		contactPersonRepository.saveAll(cpList);
//		
//		
//		manajemenBank.setIdBank(biodataCustomerDto.getIdBank());
//		
//		bankAccount.setIdAkun(biodataCustomerDto.getIdAkun());
//		bankAccount.setNamaPemilik(biodataCustomerDto.getNamaLengkap());
//		bankAccount.setNoRekening(biodataCustomerDto.getNoRekening());
//		bankAccount.setManajemenBank(manajemenBank);
//		
//		bankAccountRepository.save(bankAccount);
//		
//		customer.setTglMasuk(biodataCustomerDto.getTglMasuk());
//		customer.setTglKeluar(biodataCustomerDto.getTglKeluar());
//		customer.setBankAccount(bankAccount);
//		customer.setBiodata(biodata);
//		/* customer.setContactPerson(contactPerson); */
//		customerRepository.save(customer);
//		
//		return null;
//	}
	
	@Override
	public void delete (String idBiodata) {
		contactPersonRepository.deleteAllByBiodataIdBiodata(idBiodata);
	}
	
	@Override
	public void deleteByIdCustomer (String idCustomer) {
		User userLogin = UserAuth.getUser();
		Date currentDate = new Date();
		
		Customer customer = customerRepository.findByIdCustomer(idCustomer);
		customer.setDeletedBy("admin");
		customer.setDeleteOn(currentDate);
		customer.setIsDelete(true);
		customerRepository.save(customer);
		
		BankAccount bankAccount = customer.getBankAccount();
		bankAccount.setDeletedBy("admin");
		bankAccount.setDeleteOn(currentDate);
		bankAccount.setIsDelete(true);
		bankAccountRepository.save(bankAccount);
		
		Biodata biodata = customer.getBiodata();
		biodata.setDeletedBy("admin");
		biodata.setDeleteOn(currentDate);
		biodata.setIsDelete(true);
		biodataRepository.save(biodata);
		
		List<ContactBiodata> biodatas = contactPersonRepository.findAllByBiodataIdBiodata(customer.getBiodata().getIdBiodata());
		for (ContactBiodata contacts : biodatas) {
			contacts.setDeletedBy("admin");
			contacts.setDeleteOn(currentDate);
			contacts.setIsDelete(true);
			contactPersonRepository.save(contacts);
		}
	}

}
