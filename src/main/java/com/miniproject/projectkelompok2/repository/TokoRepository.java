package com.miniproject.projectkelompok2.repository;

//import java.util.List;
//import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.Toko;


@Repository
public interface TokoRepository extends JpaRepository<Toko, String>{
	
	Toko findAllByidToko(String idToko);

//	Toko findAll(String cabangAktif);

	
//	Toko findAllBystatus(String status);

}


