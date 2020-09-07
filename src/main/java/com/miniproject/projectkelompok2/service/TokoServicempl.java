package com.miniproject.projectkelompok2.service;

import java.util.List;

import javax.transaction.Transactional;

//import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniproject.projectkelompok2.model.entity.Cabang;
import com.miniproject.projectkelompok2.model.entity.Toko;
//import com.miniproject.projectkelompok2.model.entity.Cabang;
//import com.miniproject.projectkelompok2.model.entity.Toko;
import com.miniproject.projectkelompok2.repository.CabangRepository;
//import com.miniproject.projectkelompok2.repository.TokoRepository;
import com.miniproject.projectkelompok2.repository.TokoRepository;

@Transactional
@Service
public class TokoServicempl implements TokoService {

  @Autowired
  private TokoRepository tokoRepos;
  
  @Autowired
  private CabangRepository cabangRepos;
  
  //tambah
//  @Transactional
  public List<Cabang> saveAllCabang (List<Cabang>cList){
	  List<Cabang> response = (List<Cabang>)cabangRepos.saveAll(cList);
	  
	  return response;
  }
  
  //diubah hari ini
  
  @Override
  public void countJumlahCabang(String idToko) {
    Toko toko = tokoRepos.findById(idToko).get();
    List<Cabang> listCabang = cabangRepos.findAllByTokoIdToko(idToko);
    toko.setJumlahCabang(listCabang.size());
    tokoRepos.save(toko);
  }
  
  //ditambah 17 Apr 2020
  
  @Override
  public void countJumlahAktif (String idToko) {
	  Toko toko = tokoRepos.findById(idToko).get();
	  List<Cabang> listhitung= cabangRepos.findAllByStatus("Aktif");
	  toko.setCabangAktif(listhitung.size());
	  tokoRepos.save(toko);
  }
  
  //hitung non-aktif
  @Override
  public void countJumlahTidakAktif(String idToko) {
	  Toko toko = tokoRepos.findById(idToko).get();
	  List<Cabang> listhitunglagi= cabangRepos.findAllByStatus("Non Aktif");
	  toko.setCabangTidakAktif(listhitunglagi.size());
	  tokoRepos.save(toko);
  }
  
}
