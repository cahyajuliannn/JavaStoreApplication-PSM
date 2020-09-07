package com.miniproject.projectkelompok2.controller.restapi;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.projectkelompok2.model.dto.BiodataCustomerDto;
import com.miniproject.projectkelompok2.model.entity.BankAccount;
import com.miniproject.projectkelompok2.model.entity.Biodata;
import com.miniproject.projectkelompok2.model.entity.ContactBiodata;
import com.miniproject.projectkelompok2.model.entity.Customer;
import com.miniproject.projectkelompok2.model.entity.JenisContact;
import com.miniproject.projectkelompok2.model.entity.User;
import com.miniproject.projectkelompok2.repository.BankAccountRepository;
import com.miniproject.projectkelompok2.repository.BiodataRepository;
import com.miniproject.projectkelompok2.repository.ContactBiodataRepository;
import com.miniproject.projectkelompok2.repository.CustomerRepository;
import com.miniproject.projectkelompok2.repository.JenisContactRepository;
import com.miniproject.projectkelompok2.service.ContactPersonService;
import com.miniproject.projectkelompok2.service.CustomerService;
import com.miniproject.projectkelompok2.util.UserAuth;

@RestController
@RequestMapping("/api/biodataCustomer")
public class ApiBiodataCustomer {
	
	@Autowired
	private BiodataRepository biodataRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private ContactBiodataRepository contactPersonRepository;
	
	@Autowired
	private JenisContactRepository jenisContactRepository;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private BankAccountRepository bankAccountRepository;
	
	
	@GetMapping("/jeniscontact")
	
	public List<JenisContact> getAll(){
		return jenisContactRepository.findAll();
	}
	
	@GetMapping("/getAll/kedua")
	public List<BiodataCustomerDto> getListCustomer() {
		List<BiodataCustomerDto> biodataDtoList = new ArrayList<BiodataCustomerDto>();
		List<Biodata> biodataList = biodataRepository.findAll();

		for (Biodata biodata : biodataList) {
			BiodataCustomerDto biodataCustomerDto = new BiodataCustomerDto();

			Customer customer = customerRepository.findByBiodataIdBiodata(biodata.getIdBiodata());
			Customer customerAkun = customerRepository.findByBankAccountIdAkun(biodata.getIdBiodata());
			
			List<ContactBiodata> contactPersonList = contactPersonRepository
					.findAllByBiodataIdBiodata(biodata.getIdBiodata());
			biodataCustomerDto.setIdBiodata(biodata.getIdBiodata());
			biodataCustomerDto.setNamaLengkap(biodata.getNamaLengkap());
			biodataCustomerDto.setAlamat(biodata.getAlamat());
			biodataCustomerDto.setKotaLokasi(biodata.getKotaLokasi());
			biodataCustomerDto.setTglLahir(biodata.getTglLahir());
			
			biodataCustomerDto.setIdAkun(customerAkun.getBankAccount().getIdAkun());
			biodataCustomerDto.setNoRekening(customerAkun.getBankAccount().getNoRekening());
			biodataCustomerDto.setIdBank(customerAkun.getBankAccount().getManajemenBank().getIdBank());

			biodataCustomerDto.setIdCustomer(customer.getIdCustomer());
			biodataCustomerDto.setTglMasuk(customer.getTglMasuk());
			biodataCustomerDto.setTglKeluar(customer.getTglKeluar());

			biodataCustomerDto.setContactBiodata(contactPersonList);
			biodataDtoList.add(biodataCustomerDto);
		}

		return biodataDtoList;
	}
	
	@GetMapping("/getAll")
	public List<BiodataCustomerDto> getListCustomer2() {
		List<BiodataCustomerDto> biodataDtoList = new ArrayList<BiodataCustomerDto>();
		List<Biodata> biodataList = biodataRepository.findAllByIsDelete(false);
		List<Customer> customerList = customerRepository.findAllByIsDelete(false);

		for (Customer customer : customerList) {
			BiodataCustomerDto biodataCustomerDto = new BiodataCustomerDto();
			
			List<ContactBiodata> contactPersonList = contactPersonRepository.findByBiodataIdBiodataAndIsDelete(customer.getBiodata().getIdBiodata(),false);
			
			biodataCustomerDto.setIdBiodata(customer.getBiodata().getIdBiodata());
			biodataCustomerDto.setNamaLengkap(customer.getBiodata().getNamaLengkap());
			biodataCustomerDto.setAlamat(customer.getBiodata().getAlamat());
			biodataCustomerDto.setKotaLokasi(customer.getBiodata().getKotaLokasi());
			biodataCustomerDto.setTglLahir(customer.getBiodata().getTglLahir());
			
			biodataCustomerDto.setIdAkun(customer.getBankAccount().getIdAkun());
			biodataCustomerDto.setNoRekening(customer.getBankAccount().getNoRekening());
			biodataCustomerDto.setIdBank(customer.getBankAccount().getManajemenBank().getIdBank());
			
			biodataCustomerDto.setIdCustomer(customer.getIdCustomer());
			biodataCustomerDto.setTglMasuk(customer.getTglMasuk());
			biodataCustomerDto.setTglKeluar(customer.getTglKeluar());
			
			biodataCustomerDto.setContactBiodata(contactPersonList);
			biodataDtoList.add(biodataCustomerDto);
		}

		return biodataDtoList;
		
	}
	
	
	
	
//	@GetMapping("/{idAja}")
//	public BiodataCustomerDto getInformasi(@PathVariable String idAja) {
//		Customer customer = customerRepository.findById(idAja).get();
//		List<ContactBiodata> contactPerson = contactPersonRepository.findByBiodataIdBiodata(customer.getBiodata().getIdBiodata());
//		
//		BiodataCustomerDto biodataCustomerDto = new BiodataCustomerDto();
//		biodataCustomerDto.setIdCustomer(customer.getIdCustomer());
//		biodataCustomerDto.setTglMasuk(customer.getTglMasuk());
//		biodataCustomerDto.setTglKeluar(customer.getTglKeluar());
//		
//		biodataCustomerDto.setIdAkun(customer.getBankAccount().getIdAkun());
//		biodataCustomerDto.setNoRekening(customer.getBankAccount().getNoRekening());
//		biodataCustomerDto.setIdBank(customer.getBankAccount().getManajemenBank().getIdBank());
//		
//		biodataCustomerDto.setIdBiodata(customer.getBiodata().getIdBiodata());
//		biodataCustomerDto.setKotaLokasi(customer.getBiodata().getKotaLokasi());
//		biodataCustomerDto.setNamaLengkap(customer.getBiodata().getNamaLengkap());
//		biodataCustomerDto.setAlamat(customer.getBiodata().getAlamat());
//		biodataCustomerDto.setTglLahir(customer.getBiodata().getTglLahir());
//		
//		biodataCustomerDto.setContactBiodata(contactPerson);
//		return biodataCustomerDto;
//	}
	
	@GetMapping("/{idAja}")
	public BiodataCustomerDto getInformasi(@PathVariable String idAja) {
		Biodata biodata = biodataRepository.findById(idAja).get();
		List<ContactBiodata> contactPerson = contactPersonRepository.findByBiodataIdBiodata(biodata.getIdBiodata());
		Customer customer = customerRepository.findByBiodataIdBiodata(idAja);
		
		BiodataCustomerDto biodataCustomerDto = new BiodataCustomerDto();
		biodataCustomerDto.setIdCustomer(customer.getIdCustomer());
		biodataCustomerDto.setTglMasuk(customer.getTglMasuk());
		biodataCustomerDto.setTglKeluar(customer.getTglKeluar());
		
		biodataCustomerDto.setIdAkun(customer.getBankAccount().getIdAkun());
		biodataCustomerDto.setNoRekening(customer.getBankAccount().getNoRekening());
		biodataCustomerDto.setIdBank(customer.getBankAccount().getManajemenBank().getIdBank());
		
		biodataCustomerDto.setIdBiodata(customer.getBiodata().getIdBiodata());
		biodataCustomerDto.setKotaLokasi(customer.getBiodata().getKotaLokasi());
		biodataCustomerDto.setNamaLengkap(customer.getBiodata().getNamaLengkap());
		biodataCustomerDto.setAlamat(customer.getBiodata().getAlamat());
		biodataCustomerDto.setTglLahir(customer.getBiodata().getTglLahir());
		
		biodataCustomerDto.setContactBiodata(contactPerson);
		return biodataCustomerDto;
	}
	
	@GetMapping("/search/{namaLengkap}/{kotaLokasi}")
	public List<BiodataCustomerDto> pencarianBarang(@PathVariable String namaLengkap, @PathVariable String kotaLokasi){
		List<BiodataCustomerDto> biodataDtoList = new ArrayList<BiodataCustomerDto>();
		List<Biodata> biodataList = biodataRepository.findByNamaLengkapContainingIgnoreCaseAndKotaLokasiContainingIgnoreCaseAndIsDeleteFalse(namaLengkap, kotaLokasi);
		List<Customer> customerList = customerRepository.findByBiodataNamaLengkapContainingIgnoreCaseAndBiodataKotaLokasiContainingIgnoreCaseAndIsDeleteFalse(namaLengkap, kotaLokasi);

		for (Customer customer : customerList) {
			BiodataCustomerDto biodataCustomerDto = new BiodataCustomerDto();
			
			List<ContactBiodata> contactPersonList = contactPersonRepository.findByBiodataIdBiodataAndIsDelete(customer.getBiodata().getIdBiodata(),false);
			
			biodataCustomerDto.setIdBiodata(customer.getBiodata().getIdBiodata());
			biodataCustomerDto.setNamaLengkap(customer.getBiodata().getNamaLengkap());
			biodataCustomerDto.setAlamat(customer.getBiodata().getAlamat());
			biodataCustomerDto.setKotaLokasi(customer.getBiodata().getKotaLokasi());
			biodataCustomerDto.setTglLahir(customer.getBiodata().getTglLahir());
			
			biodataCustomerDto.setIdAkun(customer.getBankAccount().getIdAkun());
			biodataCustomerDto.setNoRekening(customer.getBankAccount().getNoRekening());
			biodataCustomerDto.setIdBank(customer.getBankAccount().getManajemenBank().getIdBank());
			
			biodataCustomerDto.setIdCustomer(customer.getIdCustomer());
			biodataCustomerDto.setTglMasuk(customer.getTglMasuk());
			biodataCustomerDto.setTglKeluar(customer.getTglKeluar());
			
			biodataCustomerDto.setContactBiodata(contactPersonList);
			biodataDtoList.add(biodataCustomerDto);
		}

		return biodataDtoList;
		 
	}
	
	
	/* get dengan ambil id biodata */
	
//	@GetMapping("/get/{idAja}")
//	public BiodataCustomerDto getInformasiByIdBio(@PathVariable String idAja) {
//		Customer customer2 = customerRepository.findByBiodataIdBiodata(idAja).get();
//
//		BiodataCustomerDto biodataCustomerDto2 = new BiodataCustomerDto();
//		biodataCustomerDto2.setIdBiodata(customer2.getBiodata().getIdBiodata());
//		biodataCustomerDto2.setNamaLengkap(customer2.getBiodata().getNamaLengkap());
//		biodataCustomerDto2.setAlamat(customer2.getBiodata().getAlamat());
//		biodataCustomerDto2.setTglLahir(customer2.getBiodata().getTglLahir());
//		biodataCustomerDto2.setKotaLokasi(customer2.getBiodata().getKotaLokasi());
//		
//		biodataCustomerDto2.setIdContact(customer2.getContactPerson().getIdContact());
//		biodataCustomerDto2.setEmail(customer2.getContactPerson().getEmail());
//		biodataCustomerDto2.setNoHandphone(customer2.getContactPerson().getNoHandphone());
//		biodataCustomerDto2.setFacebookCP(customer2.getContactPerson().getFacebookCP());
//		biodataCustomerDto2.setTwitterCP(customer2.getContactPerson().getTwitterCP());
//		biodataCustomerDto2.setInstagramCP(customer2.getContactPerson().getIntagramCP());
//		
//		
//		biodataCustomerDto2.setTglKeluar(customer2.getTglKeluar());
//		biodataCustomerDto2.setIdCustomer(customer2.getIdCustomer());
//		biodataCustomerDto2.setTglMasuk(customer2.getTglMasuk());
//		
//		return biodataCustomerDto2;
//	}
	
	
	@PostMapping
	public BiodataCustomerDto save (@RequestBody BiodataCustomerDto biodataCustomerDto) {
		customerService.updateBiodataCustomer(biodataCustomerDto);
		return biodataCustomerDto;
	}
	
	
	@DeleteMapping("/delete/{idBiodata}")
	public void delete (@PathVariable String idBiodata) {
		customerService.delete(idBiodata);
	}
	
	@DeleteMapping("/delete/sementara/{idContact}")
	public void deleteSementara(@PathVariable String idContact) {
	      contactPersonRepository.deleteById(idContact);
	  }
	
	@DeleteMapping("/deleteAll/{idCustomer}")
	public void deleteSemua (@PathVariable String idCustomer) {
		customerService.deleteByIdCustomer(idCustomer);;
	}
	
//	@PostMapping("/contact")
//	public ContactBiodata save (@RequestBody ContactBiodata contactBiodata) {
//		User userLogin = UserAuth.getUser();
//		Date currentDate = new Date();
//		ContactBiodata contactBiodata2 = new ContactBiodata();
//		contactBiodata2.setIdContact(contactBiodata.getIdContact());
//		contactBiodata2.setAccountName(contactBiodata.getAccountName());
//		contactBiodata2.setJenisCP(contactBiodata.getJenisCP());
//		contactBiodata2.setBiodata(contactBiodata.getBiodata());
//		
//		contactPersonRepository.save(contactBiodata2);
//		return contactBiodata2;
//	}
	
	@GetMapping("/contact/{idAmbil}")
	public List<ContactBiodata> getAllContact(String idAmbil){
		return contactPersonRepository.findAllByBiodataIdBiodata(idAmbil);
	}
	  

}
