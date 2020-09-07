package com.miniproject.projectkelompok2.service;

import java.util.List;

import com.miniproject.projectkelompok2.model.dto.TokoDto;
import com.miniproject.projectkelompok2.model.entity.Cabang;

public interface CabangService {
	
	TokoDto save(TokoDto tDto);
	
	void saveAllList(List<Cabang> cList);
	
}
