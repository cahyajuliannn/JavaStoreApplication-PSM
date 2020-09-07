package com.miniproject.projectkelompok2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.KotaKabupaten;

@Repository
public interface KotaKabRepository extends JpaRepository<KotaKabupaten, Integer>{
	
	List<KotaKabupaten> findByKdProv(Integer kdProv);
	
	KotaKabupaten findByKotaKab(String kotaKab);

}
