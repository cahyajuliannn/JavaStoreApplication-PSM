package com.miniproject.projectkelompok2.service;

import java.util.List;

import com.miniproject.projectkelompok2.model.dto.StokHistoryDto;
import com.miniproject.projectkelompok2.model.entity.Stok;
//import com.miniproject.projectkelompok2.model.entity.Stok;
import com.miniproject.projectkelompok2.model.entity.StokHistory;

// dipakai BERSAMA utk Stok dan StokHistory
public interface StokService {

	StokHistoryDto saveNew(StokHistoryDto shDto);	// new input
	
	StokHistoryDto savePlusMinus(StokHistoryDto sHDto);	// stok In

	List<StokHistory> saveAllShist(List<StokHistory> shist);

	void saveAllStok(List<Stok> stok);
	
	StokHistory mapDtoToHist(StokHistoryDto shDto);
}