var statusValue;

$("#selectStatus").change(function() {
  $( "#selectStatus option:selected" ).each(function() {
    statusValue= $( this ).text();
    console.log("statusval", statusValue)
  });
}).trigger("change");

var startDate;
var endDate;

var tableHistok = {
    create: function () {
        // jika table tersebut datatable, maka clear and destroy
        if ($.fn.DataTable.isDataTable('#tableHistok')) {
            //table yg sudah dibentuk menjadi datatable harus di rebuild lagi untuk di instantiasi ulang
            $('#tableHistok').DataTable().clear();
            $('#tableHistok').DataTable().destroy();
        }

        $.ajax({
            url: '/api/histok',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableHistok').DataTable({
                        data: res,
                        columns: [
                        	{title: "ID", data: "idHistok"},
                        	{title: "Cabang",data: "namaCabang"},
                        	{title: "Kategori",data: "namaKategori"},
                            {title: "Nama Barang", data: "namaBarang"},
                            {title: "Variant", data: "variantAja"},
                            {title: "Gudang", data: "gudang"},
                            {title: "Kuantitas",data: "kuantitas"},
                            {title: "Status",data: "status"},
//                            {title: "Tanggal Transaksi",data: "tglTransaksi"},
                            {title: "Tanggal Transaksi",
                                data: null,
                                render : function(data,type,row) {
                            		namaBln = ["Januari","Februari","Maret","April","Mei","Juni",
                            			"Juli","Agustus","September","Oktober","November","Desember"];
                            		tgl = new Date(data.tglTransaksi)
                            		tanggalTampil = (tgl.getDate()+1) +" "+namaBln[tgl.getMonth()]+" "+tgl.getFullYear()
                            		return tanggalTampil
                            	}
                            },
                            {title: "Keterangan/Alasan",data: "alasan"},
                            {title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                	console.log(data);
                                    return "<button class='btn btn-danger btn-sm' onclick=formHistok.deleteData('" + data.idHistok + "') id='del'><i class='fas fa-trash-alt'></i></button>"
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

    createByStatus: function() {
        if ($.fn.DataTable.isDataTable('#tableHistok')) {
            $('#tableHistok').DataTable().clear();
            $('#tableHistok').DataTable().destroy();
        }

        var barangValue = $("#barangF").val();
        
        $.ajax({
//            url: '/api/histok/getbystatus/' + statusValue,
            url: '/api/histok/statusbrg/' + statusValue+ '/' + barangValue,
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableHistok').DataTable({
                        data: res,
                        columns: [
                            {title: "ID", data: "idHistok"},
                            {title: "Cabang",data: "namaCabang"},
                            {title: "Kategori",data: "namaKategori"},
                            {title: "Nama Barang", data: "namaBarang"},
                            {title: "Variant", data: "variantAja"},
                            {title: "Gudang", data: "gudang"},
                            {title: "Kuantitas",data: "kuantitas"},
                            {title: "Status",data: "status"},
                            {title: "Tanggal Transaksi",
                                data: null,
                                render : function(data,type,row) {
                            		namaBln = ["Januari","Februari","Maret","April","Mei","Juni",
                            			"Juli","Agustus","September","Oktober","November","Desember"];
                            		tgl = new Date(data.tglTransaksi)
                            		tanggalTampil = (tgl.getDate()+1) +" "+namaBln[tgl.getMonth()]+" "+tgl.getFullYear()
                            		return tanggalTampil
                            	}
                            },
                            {title: "Keterangan/Alasan",data: "alasan"},
                            {title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                	console.log(data);
                                    return "<button class='btn btn-danger btn-sm' onclick=formHistok.deleteData('" + data.idHistok + "') id='del'><i class='fas fa-trash-alt'></i></button>"
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
	
	createByDate: function() {
			if ($.fn.DataTable.isDataTable('#tableHistok')) {
	            $('#tableHistok').DataTable().clear();
	            $('#tableHistok').DataTable().destroy();
	        }
			
			// get date value must be in specific function
			startDate = $("#startDate").val();
			endDate = $("#endDate").val();
			console.log(startDate, endDate);
			
			$.ajax({
	            url: '/api/histok/getbydaterange/' + startDate + '/' + endDate,
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#tableHistok').DataTable({
	                        data: res,
	                        columns: [
	                            { title: "ID", data: "idHistok"},
	                            {title: "Cabang",data: "namaCabang"},
	                            { title: "Kategori",data: "namaKategori"},
	                            {title: "Nama Barang", data: "namaBarang"},
	                            {title: "Variant", data: "variantAja"},
	                            { title: "Gudang", data: "gudang"},
	                            {title: "Kuantitas",data: "kuantitas"},
	                            {title: "Status",data: "status"},
	                            {title: "Tanggal Transaksi", //data: "tglTransaksi"
	                            	data: null,
	                                render : function(data,type,row) {
	                            		namaBln = ["Januari","Februari","Maret","April","Mei","Juni",
	                            			"Juli","Agustus","September","Oktober","November","Desember"];
	                            		tgl = new Date(data.tglTransaksi)
	                            		tanggalTampil = (tgl.getDate()+1) +" "+namaBln[tgl.getMonth()]+" "+tgl.getFullYear()
	                            		return tanggalTampil
	                            	}	
	                            },
	                            {title: "Keterangan/Alasan",data: "alasan"},
	                            {title: "Action",
	                                data: null,
	                                render: function (data, type, row) {
	                                	console.log(data);
	                                    return "<button class='btn btn-danger btn-sm' onclick=formHistok.deleteData('" + data.idHistok + "') id='del'><i class='fas fa-trash-alt'></i></button>"
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
	
    createByFilters: function() {	// not as expected
        if ($.fn.DataTable.isDataTable('#tableHistok')) {
            $('#tableHistok').DataTable().clear();
            $('#tableHistok').DataTable().destroy();
        }

     // get date value must be in specific function
		startDate = $("#startDate").val();
		endDate = $("#endDate").val();
		console.log(startDate, endDate);
        
        $.ajax({
            url: '/api/histok/getbystatus/' + statusValue,
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                	
        			$.ajax({
        	            url: '/api/histok/getbydaterange/' + startDate + '/' + endDate,
        	            method: 'get',
        	            contentType: 'application/json',
        	            success: function (res, status, xhr) {
        	                if (xhr.status == 200 || xhr.status == 201) {
        	                    $('#tableHistok').DataTable({
        	                        data: res,
        	                        columns: [
        	                            { title: "ID", data: "idHistok"},
        	                            {title: "Nama Barang", data: "namaBarang"},
        	                            { title: "Kategori",data: "namaKategori"},
        	                            {title: "Cabang",data: "namaCabang"},
        	                            { title: "Gudang", data: "gudang"},
        	                            {title: "Kuantitas",data: "kuantitas"},
        	                            {title: "Status",data: "status"},
        	                            {title: "Tanggal Transaksi",data: "tglTransaksi"},
        	                            {title: "Keterangan/Alasan",data: "alasan"}
        	                        ]
        	                    });
        	                } else {
        	                }
        	            },
        	            error: function (status, xhr) {
        	                console.log(status, xhr);
        	            }
        	        });
                	
                } else {
                }
            },
            error: function (status, xhr) {
                console.log(status, xhr);
            }
        });
	}
};

var formHistok = {
		deleteData: function(idCabangg) {
			if (confirm('Anda yakin ingin menghapus data ini?')) {
		    	$.ajax({
		            url: '/api/histok/isdeletehistok/' + idCabangg,
		            method: 'post',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	tableHistok.create();
		            	toastr.success('Data berhasil dihapus.');
		            },
		            error: function(xhr, status, error) {
		        	  console.log(error);
		        	  console.log(status);
		            }
		        });
	    	}
		}
}

//var formHistok = {
//    resetForm: function () {
//        $('#form-histok').trigger("reset");
//    },
//    saveForm: function () {
//        if ($('#form-histok').parsley().validate()) {
//            
//            var selbar = document.getElementById("selectIDbarang"); 		// id="selectID" utk select option
//            var id1 = selbar.options[selbar.selectedIndex].id;		// id dari option yg diselect/dipilih
//            
//            var selcab = document.getElementById("selectIDalamatCabang");
//            var id2 = selcab.options[selcab.selectedIndex].id;
////            var id2 = 
//            
//            console.log( selbar.options[selbar.selectedIndex].value );
//            console.log( selcab.options[selcab.selectedIndex].value );
//            console.log(id2);
//            
//            var dataHistok = {
//            		idBarang : id1,
//            		jumlahHistok: document.getElementById("amount").value,
//            		gudang: document.getElementById("warehouse").value,
//            		idCabang : id2
//            }
//            
//         // dataHistok dibuat setingkat krna hasil PostMapping setingkat (sesuai Dto).
//            
//            console.log(dataHistok);
//            
//            $.ajax({
//                url: '/api/histok',
//                method: 'post',
//                contentType: 'application/json',
//                dataType: 'json',
//                data: JSON.stringify(dataHistok),	// ganti dataResult -> dataHistok
//                success: function (res, status, xhr) {
//                	console.log(res);
//                    if (xhr.status == 200 || xhr.status == 201) {
//                        tableHistok.create();
//                        
//                        $('#modal-histok').modal('hide');
////                        location.reload();
//                        $("#selectIDbarang").append("<option value = '1' hidden selected> -- Pilih Barang -- </option>");
//                        $("#selectIDalamatCabang").append("<option value = '1' hidden selected> -- Pilih Cabang -- </option>");
//                        toastr.success('Data berhasil ditambahkan dan disimpan.')
//                        $("#selectIDbarang").find("option[value='1']").remove();
//                        $("#selectIDalamatCabang").find("option[value='1']").remove();
////                        $("#selectIDbarang option[value='0']").attr("selected","selected");
////                        $("#selectIDalamatCabang option[value='0']").attr("selected","selected");
//                        
//                    } else { 
//
//                    } 
//                },
//                error: function (status, xhr) {
//                    console.log(status, xhr);
//                } 
//            }); 
//        } 
//    }			// idCabangg disini hanya sbg parameter
//    , setEditData: function (idCabangg) {	// tombol Edit hanya utk tampilin data yg udah terisi & show modal
//        formHistok.resetForm();
//        idEdit = idCabangg;		// new, supaya idCabang bisa dibawa ke fungsi editForm
//        console.log(idCabangg);
//        $.ajax({
//            url: '/api/histok/' + idCabangg,
//            method: 'get',
//            contentType: 'application/json',
//            dataType: 'json',
//            success: function (res, status, xhr) {
//            	console.log(res);
//                if (xhr.status == 200 || xhr.status == 201) {
//                    $('#form-histok2').fromJSON(JSON.stringify(res));
//
////                    var idBar = $("#selectIDbarang2 option:selected").attr("id");			// TIDAK BERFUNGSI.
////                    
////                    var idCab = $("#selectIDalamatCabang2 option:selected").attr("id");	//
////                    console.log(idBar);
////                    console.log(idCab);
//                    populateCombo2.getAllBarang(res.idBarang);
//                    populateCombo4.getAllalamatCabang(res.idCabang);
//                    
//                	$('#form-histok2').parsley().reset();	// reset parsley dahulu supaya hijau hilang sebelum modal muncul
//                    $('#modal-histok2').modal('show')
//
//                } else {
//
//                }
//            },
//            error: function (status, xhr) {
//                console.log(status, xhr);
//            }
//        });
//
//
//    }, editForm: function (idCabangg) {
//    	if ($('#form-histok2').parsley().validate()) {
//    		var selbar = document.getElementById("selectIDbarang2"); 		// id="selectID" utk select option
//            var id1 = selbar.options[selbar.selectedIndex].id;		// id dari option yg diselect/dipilih
//            
//            var selcab = document.getElementById("selectIDalamatCabang2");
//            var id2 = selcab.options[selcab.selectedIndex].id;
//            
//            console.log( selbar.options[selbar.selectedIndex].value );
//            console.log( selcab.options[selcab.selectedIndex].value );
//            
//            var myRefData1 = {
//            		idBarang : id1
//            }
//            
//            var myRefData2 = {
//            		idCabang : id2
//            }
//            
//            var dataHistok = {
//            		barang : myRefData1,		
//            		jumlahHistok: document.getElementById("amount2").value,
//            		gudang: document.getElementById("warehouse2").value,
//            		cabang : myRefData2
//            }
//            
//            // dataHistok dibuat bertingkat krna hasil PutMapping bertingkat.
//            console.log(dataHistok);
//	        
//            
//            
//	        $.ajax({
//	            url: '/api/histok/' + idCabangg,
//	            method: 'put',
//	            contentType: 'application/json',
//	            dataType: 'json',
//	            data: JSON.stringify(dataHistok),	// ganti dataResult -> dataHistok
//	            success: function (res, status, xhr) {
//	                if (xhr.status == 200 || xhr.status == 201) {
//	                    tableHistok.create();
//	                    $('#modal-histok2').modal('hide');
//	                    toastr.success('Data berhasil diubah dan disimpan.')
//	
//	                } else {
//	
//	                }
//	            },
//	            error: function (status, xhr) {
//	                console.log(status, xhr);
//	            }
//	        });
//    	}
//    }
//    , deleteData: function (idCabangg) {
//    	idEdit = idCabangg;
//    	if (confirm('Anda yakin ingin menghapus data ini?')) {
//	    	$.ajax({
//	            url: '/api/histok/' + idCabangg,
//	            method: 'delete',
//	           /* contentType: 'application/json',
//	            dataType: 'json',*/
//	            success: function (res, status, xhr) {
//	            	tableHistok.create();
//	            	toastr.success('Data berhasil dihapus.');
//	            },
//	            error: function(xhr, status, error) {
//	        	  console.log(error);
//	        	  console.log(status);
//	            }
//	        });
//    	}
//    }
//};

//var itemlist;
//
//var populateCombo = {
//		getAllBarang: function (idSel) {
//			$.ajax({
//				url: '/api/barang',
//				method: 'get',
//				contentType: 'application/json',
//				dataType: 'json',
//				success: function (res, status, xhr) {
//					if(xhr.status == 200 || xhr.status == 201){
//						$("#selectIDbarang").select2();
//						var dynamicSelect = document.getElementById("selectIDbarang");
////						$("#selectIDbarang").find("option").remove();
//						
////						var newO = document.createElement("option");
////						newO.setAttribute("value", element.(""));		
////						newO.text = element.("--Pilih Barang--");
////						dynamicSelect.add(newO);
//						
//						res.forEach(element => {
//						
//							var newOption = document.createElement("option");
//							newOption.setAttribute("id", element.idBarang);		
//							newOption.text = element.namaBarang;
//							dynamicSelect.add(newOption);
//					
//					});
//						if (idSel != 0){
//							$("#selectIDbarang option[id='"+idSel+"']").attr("selected","selected");
//						}
//					}
//				},
//				error: function (status, xhr) {
//	                console.log(status, xhr);
//					}
//			
//		});
//	}
//}
//	
//
//var populateCombo2 = {
//		getAllBarang: function (idSel) {
//			$.ajax({
//				url: '/api/barang',
//				method: 'get',
//				contentType: 'application/json',
//				dataType: 'json',
//				success: function (res, status, xhr) {
//					if(xhr.status == 200 || xhr.status == 201){
//						$("#selectIDbarang2").select2();
//						var dynamicSelect = document.getElementById("selectIDbarang2");
//						$("#selectIDbarang2").find("option").remove();
//						res.forEach(element => {
//						
//							var newOption = document.createElement("option");
//							newOption.setAttribute("id", element.idBarang);		// kd_dati2 sebagai id dari element option
//							newOption.text = element.namaBarang;
//							dynamicSelect.add(newOption);
//					
//					});
//						if (idSel != 0){
//							$("#selectIDbarang2 option[id='"+idSel+"']").attr("selected","selected");
//						}
//					}
//				},
//				error: function (status, xhr) {
//	                console.log(status, xhr);
//					}
//			
//		});
//	}
//}
//	
//var storelist;
//
//var populateCombo3 = {
//		getAllalamatCabang: function (idSel) {
//			$.ajax({
//				url: '/api/cabang',
//				method: 'get',
//				contentType: 'application/json',
//				dataType: 'json',
//				success: function (res, status, xhr) {
//					if(xhr.status == 200 || xhr.status == 201){
//						$("#selectIDalamatCabang").select2();
//						var dynamicSelect = document.getElementById("selectIDalamatCabang");
////						$("#selectIDalamatCabang").find("option").remove();
//						res.forEach(element => {
//						
//							var newOption = document.createElement("option");
//							newOption.setAttribute("id", element.idCabang);		
//							newOption.text = element.namaCabang;
//							dynamicSelect.add(newOption);
//					
//					});
//						
//						if (idSel != 0){
//							$("#selectIDalamatCabang option[id='"+idSel+"']").attr("selected","selected");
//						}
//					}
//				},
//				error: function (status, xhr) {
//	                console.log(status, xhr);
//					}
//			
//		});
//	}
//}
//	
//var populateCombo4 = {
//		getAllalamatCabang: function (idSel) {
//			$.ajax({
//				url: '/api/cabang',
//				method: 'get',
//				contentType: 'application/json',
//				dataType: 'json',
//				success: function (res, status, xhr) {
//					if(xhr.status == 200 || xhr.status == 201){
//						$("#selectIDalamatCabang2").select2();
//						var dynamicSelect = document.getElementById("selectIDalamatCabang2");
//						$("#selectIDalamatCabang2").find("option").remove();
//						res.forEach(element => {
//						
//							var newOption = document.createElement("option");
//							newOption.setAttribute("id", element.idCabang);		
//							newOption.text = element.namaCabang;
//							dynamicSelect.add(newOption);
//							console.log(idSel);
//					});
//						if (idSel != 0){
//							$("#selectIDalamatCabang2 option[id='"+idSel+"']").attr("selected","selected");
//						}
//					}
//				},
//				error: function (status, xhr) {
//	                console.log(status, xhr);
//					}
//			
//		});
//	}
//}
