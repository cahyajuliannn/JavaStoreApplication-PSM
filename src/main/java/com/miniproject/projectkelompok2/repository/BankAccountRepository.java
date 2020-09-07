package com.miniproject.projectkelompok2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.BankAccount;

@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, String>{

	void deleteByIdAkun(String idAkun);

	BankAccount findAllByidAkun(String idAkun);

	BankAccount findByIdAkun(String idAkun);

//	BankAccount findAllByidAkun(String idAkun);

//	void deleteByCabangIdCabang(String idCabang);

//	void deleteById(Integer idBank);

//	void deleteByIdBank(Integer idBank);

}
