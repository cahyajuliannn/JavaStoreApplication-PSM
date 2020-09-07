package com.miniproject.projectkelompok2.controller.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/")
public class BaseMvcController {

//	@GetMapping()
//	public String login() {
//		return "dashboard/index3";	// nama file (tanpa '.html')
//	}
	
	@GetMapping("distributor")
	public String dist() {
		return "diststok/distributor";
	}
	@GetMapping("bankdistrib")
	public String distbank() {
		return "diststok/bankdistrib";
	}
	@GetMapping("barang")
	public String barang() {
		return "barang/newIndex2";
	}
	@GetMapping("variant")
	public String variant() {
		return "barang/variant";
	}
	@GetMapping("barangs")
	public String barangs() {
		return "barang/newBarang";
	}
	@GetMapping("kategori")
	public String kategoribarang() {
		return "barang/newKategoriBarang";
//		return "barang/kategoriBarang";
	}
	
	@GetMapping("loginuser")
	public String loginuser() {
		return "user/login";
	}
	
	@GetMapping("manage-user")
	public String register() {
		return "user/register";
	}
	
	@GetMapping("manage-role")
	public String role() {
		return "role/role";
	}
	
	@GetMapping("register")
	public String register2() {
		return "user/register2";
	}
	
	@GetMapping("laptopdankomputer")
	public String ldank() {
		return "barang/laptopdankomputer";
	}
	
	@GetMapping("buku")
	public String books() {
		return "barang/buku";
	}
	
	@GetMapping("olahraga")
	public String sports() {
		return "barang/olahraga";
	}
	
	@GetMapping("makanan")
	public String makanan() {
		return "barang/makanan";
	}
	
	@GetMapping("stok")
	public String stok() {
		return "diststok/stok";
	}
	
	@GetMapping("histok")
	public String historystok() {
		return "diststok/histstok";
	}
	
//	@GetMapping("cabang")
//	public String cabang() {
//		return "cabang/cabang";
//	}
	
	@GetMapping("toko")
	public String toko() {
		return "cabang/toko";
	}
	
	@GetMapping("customer")
	public String customer() {
		return "customer/customer";
	}
	
	@GetMapping("biodata")
	public String biodata() {
		return "biodata/biodata";
	}
	@GetMapping("tokocabang")
	public String tokocabang() {
		return "cabang/cabangtoko";
	}
	@GetMapping("cabang3")
	public String cabang3() {
		return "cabang/cabang3";
	}
	@GetMapping("cabang4")
	public String cabang4() {
		return "cabang/cabang4";
	}
	@GetMapping("aksescabang")
	public String aksescabang() {
		return "cabang/aksescabang";
	}
	@GetMapping("editbank")
	public String editbank() {
		return "cabang/editbankcabang";
	}
	@GetMapping("pilihcabang")
	public String pilihcabang() {
		return "cabang/pilihcabang";
	}
	@GetMapping("home")
	public String home() {
		return "home/home";
	}
	@GetMapping("cabang")
	public String cabang() {
		return "cabang/cabangmodal";
	}
	
}
