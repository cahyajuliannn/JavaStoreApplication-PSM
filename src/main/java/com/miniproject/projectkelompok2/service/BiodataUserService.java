package com.miniproject.projectkelompok2.service;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.miniproject.projectkelompok2.model.dto.BiodataUserDto;

public interface BiodataUserService {
	
	BiodataUserDto saveBio(BiodataUserDto biodataUserDto);
	
	ResponseEntity<BiodataUserDto> updateBiodataUser(String id, BiodataUserDto biodataUserDto);
	
	ResponseEntity<BiodataUserDto> deleteBiodataUser(String id, BiodataUserDto biodataUserDto);

}
