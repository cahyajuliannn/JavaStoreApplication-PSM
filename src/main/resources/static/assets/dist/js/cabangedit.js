var idEdit;
$("#update").click(function () {
	formBiodata.editForm(idEdit);
//	formBiodata2.editForm(idEdit);
});

var idDelete;


$("#selectStatus").change(function() {
	  $( "#selectStatus option:selected" ).each(function() {
	    statusValue= $( this ).text();
	    console.log("statusval", statusValue)
	  });
	}).trigger("change");

$("#statusfilter").change(function() {
	  $( "#statusfilter option:selected" ).each(function() {
	    status2Value= $( this ).text();
	    console.log("statusval", status2Value)
	  });
	}).trigger("change");

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
                                title: "Status",
                                data: "status"
                            },
                            
                            {
                                title: "Toko Induk",
                                data: "namaToko"
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
                                   return  "<button class='btn btn-primary' onclick=formBiodata.setEditData('" + data.idCabang + "')><i class='fas fa-edit'></i></button>&emsp;" +
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
        idEdit = idCabang
        
        $.ajax({
            url: '/api/cabang/' + idCabang,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                   
                    var idTokoo = res.idToko
                    var idBar = $("#tokoInduk option:selected").attr("id");
                    populateCombo.getAllToko(idTokoo)
                    
                    kotaKab.getAllKota(res.kotaKab)
                    
                    $('#status option[value="' + res.status + '"]').prop('selected', true);
         
//                    var idBk = res.idBank
//                    var bk = $("#bank option:selected").attr("id");
//                    getBank.getAllBank(idBk)
                    
                    var obj = res;
                    $('#namaCabang').val(obj.namaCabang);
                    $('#alamatCabang').val(obj.alamatCabang);
                    $('#tanggalBerdiri').val(obj.tanggalBerdiri);
                    $('#jamBuka').val(obj.jamBuka);
                    $('#jamTutup').val(obj.jamTutup);
                    $('#noRekening').val(obj.noRekening);
                    $('#namaPemilik').val(obj.namaPemilik);

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
    	if ($('#formBiodata2').parsley().validate() && $('#formBiodata').parsley().validate()) {
    		
    		var aa = document.getElementById("tokoInduk");
            var id = aa.options[aa.selectedIndex].id
            
            var dd = document.getElementById("bank");
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
           
            var dataget = {
            		namaCabang : document.getElementById("namaCabang").value,
              		alamatCabang : document.getElementById("alamatCabang").value,
              		tanggalBerdiri : document.getElementById("tanggalBerdiri").value,
              		status :  document.getElementById("status").value,
              		jamBuka : document.getElementById("jamBuka").value,
              		jamTutup : document.getElementById("jamTutup").value,
              		kotaKab : document.getElementById("kotaKab").value,
              		noRekening : document.getElementById("noRekening").value,
            		namaPemilik : document.getElementById("namaPemilik").value,
            		idBank : cc,
            		namaBank : dd.options[dd.selectedIndex].value
//              		toko: dataToko,
//              		bAccount : dataAkun
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
	                    $('#formBiodata2').parsley().reset();
	                    $('#formBiodata').parsley().reset();
	                    
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
	},

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
var getBank = {
		
		getAllBank: function(idSel) {
			 $.ajax({
		            url: '/api/manbank',
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	if (xhr.status==200|| xhr.status==201) {
		            		$("#bank").select2();
//		            	console.log(res);
		            var dynamicSelect = document.getElementById("bank")
		            $("#bank").find("option").remove();
		            res.forEach(element=> {
		            	
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
$(document).ready(function() {
	
	populateCombo.getAllToko();
	kotaKab.getAllKota();
	getBank.getAllBank();
//	
})