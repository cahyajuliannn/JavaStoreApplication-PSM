package com.miniproject.projectkelompok2.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.Biodata;
import com.miniproject.projectkelompok2.model.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String>{
	Customer findAllByIdCustomer(String idCustomer);

	Customer findByBiodataIdBiodata(String idAja);

	void deleteByBiodataIdBiodata(String idBiodata);

	Customer findByBankAccountIdAkun(String idAkun);

	Customer findByIdCustomer(String idCustomer);
	
	List<Customer> findAllByIsDelete(boolean isDelete);

	List<Customer> findByBiodataNamaLengkapContainingIgnoreCaseAndBiodataKotaLokasiContainingIgnoreCaseAndIsDeleteFalse(
			String namaLengkap, String kotaLokasi);
	
	List<Customer> findByBiodataNamaLengkapContainingIgnoreCaseAndBiodataKotaLokasiContainingIgnoreCaseAndIsDeleteFalseAndTglMasuk(
			String namaLengkap, String kotaLokasi, @DateTimeFormat(pattern = "yyyy-MM-dd") Date tglMasuk);

}
