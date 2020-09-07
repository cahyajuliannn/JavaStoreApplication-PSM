package com.miniproject.projectkelompok2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniproject.projectkelompok2.model.entity.Provinsi;

@Repository
public interface ProvinsiRepository extends JpaRepository<Provinsi, Integer>{

}
