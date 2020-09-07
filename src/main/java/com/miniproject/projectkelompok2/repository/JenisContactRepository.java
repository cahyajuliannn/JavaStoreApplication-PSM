package com.miniproject.projectkelompok2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.JenisContact;

@Repository
public interface JenisContactRepository extends JpaRepository<JenisContact, Integer>{
	
	List<JenisContact> findByidJenisContact(Integer idJenisContact);
	
	JenisContact findByJenisContact(String jenisContact);

}
