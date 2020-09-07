var idEdit;
$("#update").click(function () {
	formBank.editForm(idEdit);
//	formBank2.editForm(idEdit);
});

var idDelete;

//tambah
var tableBank = {
	    create: function () {
	        // jika table tersebut datatable, maka clear and dostroy
	        if ($.fn.DataTable.isDataTable('#tableBank')) {
//	            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
	            $('#tableBank').DataTable().clear();
	            $('#tableBank').DataTable().destroy();
	        }
//tanya ipul kalo pake cabang bisa apa engga
	        $.ajax({
	            url: '/api/akun',
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	            	console.log("res",res)
	                if (xhr.status == 200 || xhr.status == 201) {
	                	
	                	$.ajax({
	                		url: '/api/cabang',
	                		method : 'get',
//	                		contentType = 'application/json',
	                		success: function (res, status, xhr) {
	                			if (xhr.status == 200 || xhr.status == 201) {
	                				 $('#tableBank').DataTable({
	         	                        data: res,
	         	                        columns: [
	         	                        	{
	        	                                title: "Nama Cabang",
	        	                                data: "namaCabang"
	        	                            },
	        	                            {
	        	                                title: "Alamat Cabang",
	        	                                data: "alamatCabang"
	        	                            },
	        	                            {
	        	                                title: "Kota/Kabupaten",
	        	                                data: "kotaKab"
	        	                            },
	        	                            {
	        	                                title: "Tanggal Didirikan",
	        	                                data: null,
	        	                                render : function(data,type,row) {
	        	                            		namaBln = ["Januari","Februari","Maret","April","Mei","Juni",
	        	                            			"Juli","Agustus","September","Oktober","November","Desember"];
	        	                            		tgl = new Date(data.tanggalBerdiri)
	        	                            		tanggalTampil = tgl.getDate()+" "+namaBln[tgl.getMonth()]+" "+tgl.getFullYear()
	        	                            		return tanggalTampil
	        	                            	}
	        	                            },
	        	                            {
	        	                                title: "Jam Buka",
	        	                                data: "jamBuka"
	        	                            },
	        	                            {
	        	                                title: "Jam Tutup",
	        	                                data: "jamTutup"
	        	                            },
	        	                            {
	        	                                title: "Status",
	        	                                data: "status"
	        	                            },
	        	                            {
	        	                                title: "Toko Induk",
	        	                                data: "idToko"
	        	                            },
	        	                            {
	        	                                title: "Action",
	        	                                data: null,
	        	                                render: function (data, type, row) {
//	        	                                	console.log(data);
	        	                                    return 	"<div class='btn-group'>"+"<button class='btn btn-info btn-sm' onclick=lihat.lihatData('" + data.idCabang + "')><i class='fas fa-box-open'></i></button>"
	        	                                    }
	        	                                } 
	         	                            
	         	                        ]
	         	                    });
	                				
	                				
	                			}
	                		}
	                	})

	                } else {

	                }
	            },
	            erorrr: function (err) {
	                console.log(err);
	            }
	        });


	    }
	};

var formBank = {
    resetForm: function () {
        $('#formBank')[0].reset();
    },
     setEditData: function (idAkun) {
        formBank.resetForm();
        idEdit = idAkun
        
        $.ajax({
            url: '/api/akun/' + idAkun,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                   
                    var idBank = res.idBank
                    var idBar = $("#bank option:selected").attr("id");
                    getBank.getAllBank(idBank)
                    
                    var obj = res;
                    $('#idAkun').val(obj.idAkun);
                    $('#noRekening').val(obj.noRekening);
                    $('#namaPemilik').val(obj.namaPemilik);
                    $('#formBank').parsley().reset();
                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });
        
        
    }, editForm : function(idCabang){
    	if ($('#formBank').parsley().validate()) {
    		
    		var cc =  document.getElementById("bank");
            var dd = cc.options[cc.selectedIndex].id
            
            var dataBank = {
            		idBank : dd,
            		namaBank : cc.options[cc.selectedIndex].value
            };
            var dataget = {
            		noRekening : document.getElementById("noRekening").value,
              		namaPemilik : document.getElementById("namaPemilik").value,
              		manajemenBank: dataBank
            };
            console.log(JSON.stringify(dataget));
            
            $.ajax({
	            url: '/api/akun/' + idCabang,
	            method: 'put',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(dataget),	// ganti dataResult -> dataget
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    tableBank.create();
	                    formBank.resetForm();
	                    $('#formBank').parsley().reset();
	                    toastr.success('Data Akun berhasil diubah.')
	                    
	                } else {
	
	                }
	            },
	            erorrr: function (err) {
	                console.log(err);
	            }
	        });
           
    	}
    }
    , deleteData: function (idCabang) {
    	idEdit = idCabang;
    	if (confirm('Apakah anda yakin ingin menghapus data ini?')) {
	    	$.ajax({
	            url: '/api/cabang/' + idCabang,
	            method: 'delete',
	           /* contentType: 'application/json',
	            dataType: 'json',*/
	            success: function (res, status, xhr) {
	            	tableBiodata.create();
                    toastr.success('Data cabang berhasil dihapus.')
//	            	Swal.fire(
//	            		      'Berhasil!',
//	            		      'Data cabang telah dihapus.',
//	            		      'success'
//	            		    )
	            },
	            error: function(xhr, status, error) {
	        	  console.log(error);
	        	  console.log(status);
	            }
	        });
    	}
    }
    

};

var getBank = {
		
		getAllBank: function(idSel) {
			 $.ajax({
		            url: '/api/manbank',
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	if (xhr.status==200|| xhr.status==201) {
		            		

		            var dynamicSelect = document.getElementById("bank")
		            $("#bank").find("option").remove();
		            res.forEach(element=> {
		            	$("#bank").select2();
		            	
		            	var newOption = document.createElement("option");
		            	newOption.setAttribute("id", element.idBank);
		            	newOption.text = element.namaBank
		            	dynamicSelect.add(newOption);
		            	
		            });
		           
		            if (idSel != 0){
						$("#bank option[id='"+idSel+"']").attr("selected","selected");
					}
		         } 
		            	
		         },
		         error: function (err){
		        	 console.log(err);
		         }
		    });
		}
};


//var populateCombo = {
//		
//		getAllToko: function(idSel) {
//			 $.ajax({
//		            url: '/api/toko/tabel_toko',
//		            method: 'get',
//		            contentType: 'application/json',
//		            dataType: 'json',
//		            success: function (res, status, xhr) {
//		            	if (xhr.status==200|| xhr.status==201) {
//		            		$("#tokoInduk").select2();
////		            	console.log(res);
//		            var dynamicSelect = document.getElementById("tokoInduk")
//		            $("#tokoInduk").find("option").remove();
//		            res.forEach(element=> {
//		            	
//		            	var newOption = document.createElement("option");
//		            	newOption.setAttribute("id", element.idToko);
//		            	newOption.text = element.namaToko
//		            	dynamicSelect.add(newOption);
//		            	
//		            });
//		           
//		            if (idSel != 0){
//						$("#tokoInduk option[id='"+idSel+"']").attr("selected","selected");
//					}
//		         } 
//		            	
//		         },
//		         error: function (err){
//		        	 console.log(err);
//		         }
//		    });
//		}
//};


//var kotaKab = {
//		
//		getAllKota: function(idSel) {
//			 $.ajax({
//		            url: '/api/kota/getAll',
//		            method: 'get',
//		            contentType: 'application/json',
//		            dataType: 'json',
//		            success: function (res, status, xhr) {
//		            	if (xhr.status==200|| xhr.status==201) {
//		            		$("#kotaKab").select2();
//		            var dynamicSelect = document.getElementById("kotaKab")
////		            $("#tokoInduk").find("option").remove();
//		            res.forEach(element=> {
//		            	
//		            	var newOption = document.createElement("option");
//		            	newOption.setAttribute("id", element.kotaKab);
//		            	newOption.text = element.kotaKab
//		            	dynamicSelect.add(newOption);
//		            	
//		            });
//		           
//		            if (idSel != 0){
//						$("#kotaKab option[id='"+idSel+"']").attr("selected","selected");
//					}
//		         } 
//		            	
//		         },
//		         error: function (err){
//		        	 console.log(err);
//		         }
//		    });
//		}
//};

var lihat = {
		lihatData: function (idCabang){
			 $.ajax({
		            url: '/api/cabang/' + idCabang,
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		                	$("#lihatnama").text(res.namaCabang);
		                	$("#lihatAlamat").text(res.alamatCabang);
		                	$("#lihatKota").text(res.kotaKab);
		                	$("#lihatTanggal").text(res.tanggalBerdiri);
		                	$("#lihatBuka").text(res.jamBuka);
		                	$("#lihatTutup").text(res.jamTutup);
		                	$("#lihatstatus").text(res.status); //ini masi belom bisa ya!
		                	$("#modal-info").modal("show");
		            },
		            erorrr: function (err) {
		                console.log(err);
		            }
		        });
		}
};


$(document).ready(function() {
	getBank.getAllBank();
	
//	populateCombo.getAllToko();
//	populateCombo2.getAllToko();
//	kotaKab.getAllKota();
//	
})