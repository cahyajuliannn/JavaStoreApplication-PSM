package com.miniproject.projectkelompok2.service;

import java.util.List;

import javax.validation.Valid;

import com.miniproject.projectkelompok2.model.entity.Variant;

public interface VariantService {
    
    List<Variant> saveAllVariant(List<Variant> variant);

	Variant save(Variant variant);

	List<Variant> simpanSemua(@Valid List<Variant> variant);
}
