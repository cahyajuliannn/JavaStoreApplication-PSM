package com.miniproject.projectkelompok2.service;

import com.miniproject.projectkelompok2.model.dto.BiodataCustomerDto;
import com.miniproject.projectkelompok2.model.entity.Customer;

public interface CustomerService {
	Customer latTransactional();
	
	Customer saveCustomerMater(Customer customer);
	
	BiodataCustomerDto updateBiodataCustomer(BiodataCustomerDto biodataCustomerDto);
	
	public void delete (String idBiodata);

	void deleteByIdCustomer(String idCustomer);
	
	
}
