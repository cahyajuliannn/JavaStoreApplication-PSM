package com.miniproject.projectkelompok2.service;

import java.util.List;

import com.miniproject.projectkelompok2.model.entity.Cabang;

public interface TokoService {
	
	public List<Cabang> saveAllCabang (List<Cabang>cList);


	//ditambah kan hari ini
	
	void countJumlahCabang(String idToko);


	void countJumlahAktif(String status);


	void countJumlahTidakAktif(String idToko);
}