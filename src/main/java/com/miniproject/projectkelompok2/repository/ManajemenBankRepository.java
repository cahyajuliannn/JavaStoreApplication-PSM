package com.miniproject.projectkelompok2.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.BankAccount;
import com.miniproject.projectkelompok2.model.entity.ManajemenBank;

@Repository
public interface ManajemenBankRepository extends JpaRepository<ManajemenBank, Integer>{

//	ManajemenBank findByIdAkun(BankAccount bAccount);

	ManajemenBank findAllByIdBank(Integer idBank);
//
//	ManajemenBank findById(BankAccount bAccount);
//
//	ManajemenBank findByIdAkun(BankAccount bAccount);

//	ManajemenBank findByIdAkun(String idAkun);


	}
