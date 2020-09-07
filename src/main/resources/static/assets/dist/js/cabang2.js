var idEdit;
$("#update").click(function () {
	formBiodata.editForm(idEdit);
//	formBiodata2.editForm(idEdit);
});

var idDelete;


$("#statusfilter").change(function() {
	  $( "#statusfilter option:selected" ).each(function() {
	    status2Value= $( this ).text();
	    console.log("statusval", status2Value)
	  });
	}).trigger("change");

$("#selectStatus").change(function() {
	  $( "#selectStatus option:selected" ).each(function() {
	    statusValue= $( this ).text();
	    console.log("statusval", statusValue)
	  });
	}).trigger("change");

//tambah
var tableBiodataLihat = {
	    create: function () {
	        // jika table tersebut datatable, maka clear and dostroy
	        if ($.fn.DataTable.isDataTable('#tableBiodata')) {
//	            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
	            $('#tableBiodata').DataTable().clear();
	            $('#tableBiodata').DataTable().destroy();
	        }

	        $.ajax({
	            url: '/api/cabang',
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	            	console.log("res",res)
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#tableBiodata').DataTable({
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
 	                                title: "Id Akun",
 	                                data: "idAkun"
 	                            },
 	                            {
 	                                title: "Nomor Rekening",
 	                                data: "noRekening"
 	                            },
 	                            {
 	                                title: "Nama Bank",
 	                                data: "namaBank"
 	                            },
 	                            {
 	                                title: "Atas Nama",
 	                                data: "namaPemilik"
 	                            },
	                            {
	                                title: "Action",
	                                data: null,
	                                render: function (data, type, row) {
//	                                	console.log(data);
	                                    return 	"<div class='btn-group'>"+"<button class='btn btn-info btn-sm' onclick=lihat.lihatData('" + data.idCabang + "')><i class='fas fa-box-open'></i></button>"
	                                    }
	                                } 
	                        ]
	                    });

	                } else {

	                }
	            },
	            erorrr: function (err) {
	                console.log(err);
	            }
	        });


	    }
	};

//batas tambah
var tableBiodata = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableBiodata')) {
//            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
            $('#tableBiodata').DataTable().clear();
            $('#tableBiodata').DataTable().destroy();
        }

        $.ajax({
            url: '/api/cabang',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
            	console.log("res",res)
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableBiodata').DataTable({
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
                                title: "Nomor Rekening",
                                data: "noRekening"
                            },
                            {
                                title: "Nama Bank",
                                data: "namaBank"
                            },
                            {
                                title: "Atas Nama",
                                data: "namaPemilik"
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
                                   return  "<button class='btn btn-info btn-sm' onclick=lihat.lihatData('" + data.idCabang + "')><i class='fas fa-box-open'></i></button>&emsp;" +
                                   		"<button class='btn btn-primary' onclick=formBiodata.setEditData('" + data.idCabang + "')><i class='fas fa-edit'></i></button>&emsp;" +
                                   		"<button id = 'warning' data_id = 'aaa' class='btn btn-danger' onclick=formBiodata.deleteData('" + data.idCabang + "') data-toggle='modal' data-target='#modal-warning'><i class='fas fa-trash-alt'></button>"
                                    }
                            }
                        ]
                    });

                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });


    }
};


var formBiodata = {
    resetForm: function () {
        $('#formBiodata')[0].reset();
        $('#formBiodata2')[0].reset();
        $("#kotaKab").select2('val','0');
        $("#bank").select2('val','0');
    },
    setEditData: function (idCabang) {
        formBiodata.resetForm();
        $('#formBiodata-edit1').parsley().reset();
        $('#formBiodata-edit2').parsley().reset();
        $('#modal-cabang-edit').modal('show')
        idEdit = idCabang
        
        $.ajax({
            url: '/api/cabang/' + idCabang,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                	
                    var idTokoo = res.idToko
//                    var idBar = $("#tokoInduk option:selected").attr("id");
                    $('#tokoInduk2').val(res.namaToko)
                    console.log(idTokoo)
                    
                    $('#kotaKab2').val(res.kotaKab).trigger('change');
                    console.log(res.kotaKab)
                    
                    $('#status2 option[value="' + res.status + '"]').prop('selected', true);
         
                    var idBk = res.idBank
                    console.log(idBk)
                     $('#bank2').val(res.namaBank).trigger('change');
                
                  
                    var obj = res;
                    $('#namaCabang2').val(obj.namaCabang);
                    $('#alamatCabang2').val(obj.alamatCabang);
                    $('#tanggalBerdiri2').val(obj.tanggalBerdiri);
                    $('#jamBuka2').val(obj.jamBuka);
                    $('#jamTutup2').val(obj.jamTutup);
                    $('#noRekening2').val(obj.noRekening);
                    $('#namaPemilik2').val(obj.namaPemilik);

                    $('#formBiodata').parsley().reset();
                    $('#formBiodata2').parsley().reset();

                    
                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });
    }, editForm : function(idCabang){
    	if ($('#formBiodata-edit1').parsley().validate()) {
    		
    		var aa = document.getElementById("tokoInduk2");
            var id = aa.options[aa.selectedIndex].id
            
            var dd = document.getElementById("bank2");
            var cc = dd.options[dd.selectedIndex].id
            
            var dataToko = {
            		idToko : id,
            		namaToko : aa.options[aa.selectedIndex].value
            };
            
            var dataBank = {
            		idBank : cc,
            		namaBank : dd.options[dd.selectedIndex].value
            };
            console.log(dataBank)
            
            var dataAkun = {
            		noRekening : document.getElementById("noRekening").value,
            		namaPemilik : document.getElementById("namaPemilik").value,
            		manajemenBank : dataBank
            }
            console.log("Akun: ",dataAkun)
           console.log("aaaaaa")
            var dataget = {
            		namaCabang : document.getElementById("namaCabang2").value,
              		alamatCabang : document.getElementById("alamatCabang2").value,
              		tanggalBerdiri : document.getElementById("tanggalBerdiri2").value,
              		status :  document.getElementById("status2").value,
              		jamBuka : document.getElementById("jamBuka2").value,
              		jamTutup : document.getElementById("jamTutup2").value,
              		kotaKab : document.getElementById("kotaKab2").value,
              		noRekening : document.getElementById("noRekening2").value,
            		namaPemilik : document.getElementById("namaPemilik2").value,
            		idBank : cc,
            		namaBank : dd.options[dd.selectedIndex].value
            };
            console.log(JSON.stringify(dataget));
            
            $.ajax({
	            url: '/api/cabang/' + idCabang,
	            method: 'put',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(dataget),	// ganti dataResult -> dataget
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    tableBiodata.create();
	                    toastr.success('Data cabang berhasil diubah.')
	                    formBiodata.resetForm();
	                    $('#modal-cabang-edit').modal('hide')
	                    $('#formBiodata-edit1').parsley().reset();
	                    $('#formBiodata-edit2').parsley().reset();
	                    
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
    , saveAll: function (){
    	$.ajax({
             url: '/api/cabang/savelist',
             method: 'post',
             contentType: 'application/json',
             dataType: 'json',
             data: JSON.stringify(kumpulan),
             success: function (res, status, xhr) {
             	console.log(res)
                 if (xhr.status == 200 || xhr.status == 201) {
//                	 tableBiodataLihat.create();
                     toastr.success('Data Anda berhasil ditambahkan dan disimpan.');
                     


                 } else {

                 }
             },
             erorrr: function (err) {
                 console.log(err);
             }
         })
    }
    ,saveAllNew: function (){
    	$.ajax({
            url: '/api/cabang/savebaru',
            method: 'post',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(kumpulan),
            success: function (res, status, xhr) {
            console.log(res)
            tableBiodata.create();
            toastr.success('Data Anda berhasil ditambahkan dan disimpan.');
                if (xhr.status == 200 || xhr.status == 201) {
//                	 tableBiodata.create();
//                	 toastr.success('Data Anda berhasil ditambahkan dan disimpan.');
                	 $('#modal-cabang-edit').modal('hide')
                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        })
   }
    , createByStatus: function() {
        if ($.fn.DataTable.isDataTable('#tableBiodata')) {
            $('#tableBiodata').DataTable().clear();
            $('#tableBiodata').DataTable().destroy();
        }

        $.ajax({
            url: '/api/cabang/filter/' + statusValue,
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
            	console.log("ini",res)
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableBiodata').DataTable({
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
                                title: "Nomor Rekening",
                                data: "baccount.noRekening"
                            },
                            {
                                title: "Nama Bank",
                                data: "baccount.manajemenBank.namaBank"
                            },
                            {
                                title: "Atas Nama",
                                data: "baccount.namaPemilik"
                            },
                            {
                                title: "Status",
                                data: "status"
                            },
                            
                            {
                                title: "Toko Induk",
                                data: "toko.idToko"
                            },
                            {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                   return  "<button class='btn btn-info btn-sm' onclick=lihat.lihatData('" + data.idCabang + "')><i class='fas fa-box-open'></i></button>&emsp;" +
                                   		"<button class='btn btn-primary' onclick=formBiodata.setEditData('" + data.idCabang + "')><i class='fas fa-edit'></i></button>&emsp;" +
                                   		"<button id = 'warning' data_id = 'aaa' class='btn btn-danger' onclick=formBiodata.deleteData('" + data.idCabang + "') data-toggle='modal' data-target='#modal-warning'><i class='fas fa-trash-alt'></button>"
                                    }
                            }
                        ]
                    });
                } else {
                }
            },
            error: function (status, xhr) {
                console.log(status, xhr);
            }
        });
     
	},
	filterByAll: function() {
        if ($.fn.DataTable.isDataTable('#tableBiodata')) {
            $('#tableBiodata').DataTable().clear();
            $('#tableBiodata').DataTable().destroy();
        }
        var nama = $("#filterCabang").val();
        var kota = $("#filterKota").val();
        cabangValue = nama
        kotaValue = kota

        $.ajax({
            url: '/api/cabang/cari/' + cabangValue + '/' + kotaValue + '/' + status2Value,
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableBiodata').DataTable({
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
                                title: "Nomor Rekening",
                                data: "baccount.noRekening"
                            },
                            {
                                title: "Nama Bank",
                                data: "baccount.manajemenBank.namaBank"
                            },
                            {
                                title: "Atas Nama",
                                data: "baccount.namaPemilik"
                            },
                            
                            {
                                title: "Toko Induk",
                                data: "toko.namaToko"
                            },
                            {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                   return  "<button class='btn btn-primary' onclick=formBiodata.setEditData('" + data.idCabang + "')><i class='fas fa-edit'></i></button>&emsp;" +
                                   		"<button id = 'warning' data_id = 'aaa' class='btn btn-danger' onclick=formBiodata.deleteData('" + data.idCabang + "') data-toggle='modal' data-target='#modal-warning'><i class='fas fa-trash-alt'></button>"
                                    }
                            }
                        ]
                    });
                } else {
                }
            },
            error: function (status, xhr) {
                console.log(status, xhr);
            }
        });
	}
	, 
    

};


var populateCombo = {
		
		getAllToko: function(idSel) {
			 $.ajax({
		            url: '/api/toko/tabel_toko',
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	if (xhr.status==200|| xhr.status==201) {
//		            		$("#tokoInduk").select2();
//		            	console.log(res);
		            var dynamicSelect = document.getElementById("tokoInduk")
		            $("#tokoInduk").find("option").remove();
		            res.forEach(element=> {
		            	
		            	var newOption = document.createElement("option");
		            	newOption.setAttribute("id", element.idToko);
		            	newOption.text = element.namaToko
		            	dynamicSelect.add(newOption);
		            	
		            });
		           
		            if (idSel != 0){
						$("#tokoInduk option[id='"+idSel+"']").attr("selected","selected");
					}
		         } 
		            	
		         },
		         error: function (err){
		        	 console.log(err);
		         }
		    });
		}
};

var populateCombo2 = {
		
		getAllToko: function(idSel) {
			 $.ajax({
		            url: '/api/toko/tabel_toko',
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	if (xhr.status==200|| xhr.status==201) {
//		            		$("#tokoInduk").select2();
//		            	console.log(res);
		            var dynamicSelect = document.getElementById("tokoInduk2")
		            $("#tokoInduk2").find("option").remove();
		            res.forEach(element=> {
		            	
		            	var newOption = document.createElement("option");
		            	newOption.setAttribute("id", element.idToko);
		            	newOption.text = element.namaToko
		            	dynamicSelect.add(newOption);
		            	
		            });
		           
		            if (idSel != 0){
						$("#tokoInduk option[id='"+idSel+"']").attr("selected","selected");
					}
		         } 
		            	
		         },
		         error: function (err){
		        	 console.log(err);
		         }
		    });
		}
};


var kotaKab = {
		
		getAllKota: function(idSel) {
			 $.ajax({
		            url: '/api/kota/getAll',
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	if (xhr.status==200|| xhr.status==201) {
		            		$("#kotaKab").select2();
		            var dynamicSelect = document.getElementById("kotaKab")
//		            $("#tokoInduk").find("option").remove();
		            res.forEach(element=> {
		            	
		            	var newOption = document.createElement("option");
		            	newOption.setAttribute("id", element.kotaKab);
		            	newOption.text = element.kotaKab
		            	dynamicSelect.add(newOption);
		            	
		            });
		           
		            if (idSel != 0){
						$("#kotaKab option[id='"+idSel+"']").attr("selected","selected");
					}
		         } 
		            	
		         },
		         error: function (err){
		        	 console.log(err);
		         }
		    });
		}
};

var kotaKab2 = {
		
		getAllKota: function(idSel) {
			 $.ajax({
		            url: '/api/kota/getAll',
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	if (xhr.status==200|| xhr.status==201) {
		            		$("#kotaKab2").select2();
		            var dynamicSelect = document.getElementById("kotaKab2")
		            $("#kotaKab2").find("option").remove();
		            res.forEach(element=> {
		            	
		            	var newOption = document.createElement("option");
		            	newOption.setAttribute("id", element.kotaKab);
		            	newOption.text = element.kotaKab
		            	dynamicSelect.add(newOption);
		            	
		            });
		           
		            if (idSel != 0){
						$("#kotaKab2 option[id='"+idSel+"']").attr("selected","selected");
					}
		         } 
		            	
		         },
		         error: function (err){
		        	 console.log(err);
		         }
		    });
		}
};

var lihat = {
		lihatData: function (idCabang){
			 $.ajax({
		            url: '/api/cabang/' + idCabang,
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	var bank = res.idBank
		            	
		                	$("#lihatnama").text(res.namaCabang);
		                	$("#lihatAlamat").text(res.alamatCabang);
		                	$("#lihatKota").text(res.kotaKab);
		                	$("#lihatTanggal").text(res.tanggalBerdiri);
		                	$("#lihatBuka").text(res.jamBuka);
		                	$("#lihatTutup").text(res.jamTutup);
		                	$("#lihatrekening").text(res.noRekening);
		                	$("#lihatpemilik").text(res.namaPemilik);
		                	$("#lihatbank").text(res.namaBank);
		                	$("#lihatstatus").text(res.status); //ini masi belom bisa ya!
		                	$("#modal-info").modal("show");
		            },
		            erorrr: function (err) {
		                console.log(err);
		            }
		        });
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
		            		
//		            	console.log(res);
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
var getBank2 = {
		
		getAllBank: function(idSel) {
			 $.ajax({
		            url: '/api/manbank',
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            
		            	if (xhr.status==200|| xhr.status==201) {
//		            		$("#bank2").select2();
		            var dynamicSelect = document.getElementById("bank2")
		            $("#bank2").find("option").remove();
		            res.forEach(element=> {
		            	var newOption = document.createElement("option");
		            	newOption.setAttribute("id", element.idBank);
		            	newOption.text = element.namaBank
		            	dynamicSelect.add(newOption);
		            	
		            });
		           
		            if (idSel != 0){
						$("#bank2 option[id='"+idSel+"']").attr("selected","selected");
					}
		         } 
		            	
		         },
		         error: function (err){
		        	 console.log(err);
		         }
		    });
		}
};


$(document).ready(function() {
	
	populateCombo.getAllToko();
	getBank.getAllBank();
	kotaKab.getAllKota();
	
	populateCombo2.getAllToko();
	getBank2.getAllBank();
	kotaKab2.getAllKota();
//	
})