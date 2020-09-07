var idEdit;
$("#btn-edit-distrib").click(function () {
	formDistrib.editForm(idEdit);
});

var idDelete;
var idakundata;



var tableDistrib = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableDistrib')) {
            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
            $('#tableDistrib').DataTable().clear();
            $('#tableDistrib').DataTable().destroy();
        }

        $("#nameF").val('');
    	$("#bankF").val('');
    	
        $.ajax({
            url: '/api/ref-dist',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableDistrib').DataTable({
                        data: res,
                        columns: [
                            {
                                title: "ID",
                                data: "distID"
                            },
                            {
                                title: "Nama Perusahaan",
                                data: "namaPT"
                            },
                            {
                            	title: "Bank Rekening",
                            	data: "namaBank"
                            },
                            {
                                title: "No. Rekening",
                                data: "noRekening"
                            },
                            {
                            	title: "Atas Nama",
                                data: "atasNama"
                            }
//                            {
//                                title: "Action",
//                                data: null,
//                                render: function (data, type, row) {
//                                    return 	"<div class='btn-group'>"+"<button class='btn btn-secondary btn-sm' onclick=formDistrib.infoData('" + data.distID + "')><i class='fas fa-info-circle'></i></button>"+
//                                    		"<button class='btn btn-primary btn-sm' onclick=formDistrib.setEditData('" + data.distID + "')><i class='fas fa-edit'></i></button>"+
//                                    		"<button class='btn btn-info btn-sm' id='show-barang' onclick=tableBarang.showBarang('" + data.distID +"')><i class='fas fa-box-open'></i></button>"+
//                                    		"<button class='btn btn-danger btn-sm' onclick=formDistrib.deleteData('" + data.distID + "')><i class='fas fa-trash-alt'></i></button>"+"</div>"
//                                    }
//                                }
                            
                        ]
                    });

                } else {

                }
            },
            error: function (xhr, status, error) {
                console.log(status);
            }
        });


    },
    
    createByFilters: function() {
    	if ($.fn.DataTable.isDataTable('#tableDistrib')) {
            $('#tableDistrib').DataTable().clear();
            $('#tableDistrib').DataTable().destroy();
        }
    	
    	var namaPT = $("#nameF").val();
    	var bankPT = $("#bankF").val();
    	
        $.ajax({
            url: '/api/ref-dist/filterbank/' + namaPT + '/' + bankPT,
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableDistrib').DataTable({
                        data: res,
                        columns: [
                            {title: "ID",data: "distID"},
                            {title: "Nama Perusahaan",data: "namaPT"},
                            {title: "Bank Rekening",data: "namaBank"},
                            {title: "No. Rekening",data: "noRekening"},
                            {title: "Atas Nama",data: "atasNama"}
//                            {
//                                title: "Action",
//                                data: null,
//                                render: function (data, type, row) {
//                                	console.log(data);
//                                    return 	"<div class='btn-group'>"+"<button class='btn btn-secondary btn-sm' onclick=formDistrib.infoData('" + data.distID + "')><i class='fas fa-info-circle'></i></button>"+
//                                    		"<button class='btn btn-primary btn-sm' onclick=formDistrib.setEditData('" + data.distID + "')><i class='fas fa-edit'></i></button>"+
//                                    		"<button class='btn btn-info btn-sm' id='show-barang' onclick=tableBarang.showBarang('" + data.distID +"')><i class='fas fa-box-open'></i></button>"+
//                                    		"<button class='btn btn-danger btn-sm' onclick=formDistrib.deleteData('" + data.distID + "')><i class='fas fa-trash-alt'></i></button>"+"</div>"
//                                    }
//                                }
                        ]
                    });

                } else {

                }
            },
            error: function (xhr, status, error) {
                console.log(status);
            }
        });
    	
	}
};

var dataBanks;



var populateCombo = {
		
		getAllBank: function(idSel) {
			 $.ajax({
		            url: '/api/manbank',
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	if (xhr.status==200|| xhr.status==201) {
		            		
		            	console.log("resBank",res);
		            var dynamicSelect = document.getElementById("selectBank");
		            res.forEach(element=> {
		            	var newOption = document.createElement("option");
		            	newOption.setAttribute("id", element.idBank);
		            	newOption.text = element.namaBank;
		            	newOption.value = element.namaBank;
		            	dynamicSelect.add(newOption);
		            	
		            	$("#selectBank").select2();
		            	console.log("newopt", newOption)
		            });
		           
		            if (idSel != 0){
						$("#selectBank option[id='"+idSel+"']").attr("selected","selected");
					}
		         } 
		            	
		         },
		         error: function (err){
		        	 console.log(err);
		         }
		    });
		}
};

var populateComboEdit = {
		
		getAllBank: function(idSel) {
			 $.ajax({
		            url: '/api/manbank',
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	if (xhr.status==200|| xhr.status==201) {
		            		
		            	console.log("resBank",res);
		            var dynamicSelect2 = document.getElementById("selectBank2");
		            res.forEach(element=> {
		            	var newOption = document.createElement("option");
		            	newOption.setAttribute("id", element.idBank);
		            	newOption.text = element.namaBank;
		            	newOption.value = element.namaBank;
		            	dynamicSelect2.add(newOption);
		            	
		            	$("#selectBank2").select2();
		            	console.log("newopt", newOption)
		            });
		           
//		            if (idSel != 0){
//						$("#selectBank option[id='"+idSel+"']").attr("selected","selected");
//					}
		         } 
		            	
		         },
		         error: function (err){
		        	 console.log(err);
		         }
		    });
		}
};

//select2 error searching pake ini
//$.ajax({
//    url: '/api/manbank',
//    method: 'get',
//    contentType: 'application/json',
//    success: function (res, status, xhr) {
//        if (xhr.status == 200 || xhr.status == 201) {
//        	dataBanks = res;
//          // Get select
//            var select = document.getElementById('selectBank');
//            var select2 = document.getElementById('selectBank2');
//            $("#selectBank").select2();
//            $("#selectBank2").select2();
//            // Add options
//          for (var i in res) {
//            $(select).append('<option id="'+ res[i].idBank +'" value="' + res[i].namaBank + '">' + res[i].namaBank + '</option>');
//            $(select2).append('<option id="'+ res[i].idBank +'" value="' + res[i].namaBank + '">' + res[i].namaBank + '</option>');
//          }
//        } else {
//
//        }
//    },
//    error: function(xhr, status, error) {
//  	  var err = eval("(" + xhr.responseText + ")");
//  	  console.log(err.Message);
//    }
//});


var formDistrib = {
    resetForm: function () {
        $('#form-distrib')[0].reset();
    },
    saveForm: function () {
        if ($('#form-distrib').parsley().validate()) {
//            var dataResult = getJsonForm($("#form-distrib").serializeArray(), true);
//            console.log(dataResult);
//          console.log( sel.options[sel.selectedIndex].value );
//          var myBank = {
////          		kota : sel.options[sel.selectedIndex].value	
//          		idManejBank : id
//          };
            var selbank = document.getElementById("selectBank"); 		// id="selectID" utk select option
            var idB = selbank.options[selbank.selectedIndex].id;		// id dari option yg diselect/dipilih
            
            var dataDistributor = {	// DTO Distrib
            		namaPT: document.getElementById("name").value,
            		alamatPT: document.getElementById("address").value,
            		npwpPT: document.getElementById("npwpID").value,
            		noRekening: document.getElementById("noacc").value,
            		atasNama: document.getElementById("holder").value,
            		noTelpPT: document.getElementById("phone").value,
            		emailPT: document.getElementById("email").value,
            		idManejBank : idB
            		
            }
            
            console.log(dataDistributor);
            
            $.ajax({
                url: '/api/ref-dist/posthree',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataDistributor),	// ganti dataResult -> dataDistributor
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableDistrib.create();
                        $('#modal-distrib').modal('hide');
                        toastr.success('Data berhasil ditambahkan dan disimpan.')

                    } else { 

                    } 
                },
                error: function (xhr, status, error) {
                    console.log(status);
                } 
            }); 
        } 
    }
    , setEditData: function (idCabang) {	// tombol Edit hanya utk tampilin data yg udah terisi & show modal
        formDistrib.resetForm();
        idEdit = idCabang;		// new, supaya idCabang bisa dibawa ke fungsi editForm
        
        $.ajax({
            url: '/api/ref-dist/' + idCabang,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
            	console.log(res);
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#form-distrib2').fromJSON(JSON.stringify(res));
                    var obj = res;
                    
                    idakundata = obj.idAkunBank;	// di keep agar bisa post, tidak 'save instance before flushing
//                    $('#phone2').val(obj.noTelpPT); // notelp yg smula di DB ada slain angka tdk akan muncul di form edit
                    populateComboEdit.getAllBank(obj.idBank);
//                    $('#selectBank2 option:selected').attr("id");
                    $('#selectBank2').val(obj.namaBank).trigger('change');
                	$('#form-distrib2').parsley().reset();	// reset parsley dahulu supaya hijau hilang sebelum modal muncul
                    $('#modal-distrib2').modal('show')

                } else {

                }
            },
            error: function (xhr, status, error) {
                console.log(status);
            }
        });


    }, editForm: function (idCabang) {
    	if ($('#form-distrib2').parsley().validate()) {
//	    	var sel = document.getElementById("selectID2"); 		
//	        var id = sel.options[sel.selectedIndex].id;		
//	        
//	        console.log( sel.options[sel.selectedIndex].value );
//	        
//	        var myRefData = {
//	        		kddati2 : id
//	        };
    		var selbank = document.getElementById("selectBank2"); 		// id="selectID" utk select option
            var idB = selbank.options[selbank.selectedIndex].id;
            console.log("selected index value", selbank.options[selbank.selectedIndex].value);
            var myManBank = {
            		idBank: idB,
            		namaBank: selbank.options[selbank.selectedIndex].value
            }
            
            var myAcc = {
            		idAkun: idakundata,
            		manajemenBank: myManBank,
            		namaPemilik: document.getElementById("holder2").value,
            		noRekening: document.getElementById("noacc2").value
            }
            
	        var dataDistributor = {		// PUT itu TIDAK DTO
	        		distID: idCabang, //idcbg=parameter
            		namaPT: document.getElementById("name2").value,
            		alamatPT: document.getElementById("address2").value,
            		npwpPT: document.getElementById("npwpID2").value,
            		noTelpPT: document.getElementById("phone2").value,
            		emailPT: document.getElementById("email2").value,
            		bankAccount: myAcc
	        }
	        console.log("idakundata=", idakundata);
	        console.log(dataDistributor);
	        
	        $.ajax({
	            url: '/api/ref-dist/' + idCabang,
	            method: 'put',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(dataDistributor),	// ganti dataResult -> dataDistributor
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    tableDistrib.create();
	                    $('#modal-distrib2').modal('hide');
	                    toastr.success('Data berhasil diubah dan disimpan.')
	
	                } else {
	
	                }
	            },
	            error: function (xhr, status, error) {
	                console.log(status);
	                console.log("idakundata=", idakundata);
	            }
	        });
    	}
    }
    , deleteData: function (idCabang) {
//    	idEdit = idCabang;
    	
    	if (confirm('Anda yakin ingin menghapus data ini?')) {
	    	$.ajax({
	            url: '/api/ref-dist/isdelete/' + idCabang,
	            method: 'put',
	            contentType: 'application/json',
	            dataType: 'json',
//	            data: JSON.stringify(dataDel),
	            success: function (res, status, xhr) {
	            	tableDistrib.create();
	            	toastr.success('Data berhasil dihapus.');
	            },
	            error: function(xhr, status, error) {
	        	  console.log(error);
	        	  console.log(status);
//	        	  if(xhr.status == 500){
//	        		  $('#modal-alertdist').modal('show')
//	        	  }
	            }
	        });
    	}
    }
    , infoData: function (idCabang) {
    	
    	$.ajax({
    		url: '/api/ref-dist/' + idCabang,
    		method: 'get',
    		contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
            	console.log("res", res);
            	$("#infonamapt").text(res.namaPT);
            	$("#infoalamat").text(res.alamatPT);
            	$("#infonpwp").text(res.npwpPT);
            	$("#infobank").text(res.namaBank);
            	$("#infonorek").text(res.noRekening);
            	$("#infoatasnama").text(res.atasNama);
            	$("#infonotelp").text(res.noTelpPT);
            	$("#infoemail").text(res.emailPT);
            	
            	$("#modal-info").modal("show");
            },
            error: function(xhr, status, error) {
            
            }
    	})
    }
    
};

var selDist;

var tableBarang = {
		
		resetFilter: function() {
			$("#barangF").val('');
			$("#kateF").val('');
			$("#distF").val('');
		},
		
		showBarang: function(idCabang) {
			selDist = idCabang;	// utk dibawa ke id di selopDist(selDist) supaya lgsg terpilih
			
			if ($.fn.DataTable.isDataTable('#tableBarang')) {
	            $('#tableBarang').DataTable().clear();
	            $('#tableBarang').DataTable().destroy();
	        }
			
			tableBarang.resetFilter();
			
			$("#modal-barang").modal("show");
			
			$.ajax({
				url: '/api/barang/getbydist?id_dist=' + idCabang,
				method: 'get',
				contentType: 'application/json',
	            dataType: 'json',
				success: function (res, status, xhr) {
	            	
	                if (xhr.status == 200 || xhr.status == 201) {
//	                	console.log("distrib selected=",res[0].distributor.namaPT);
	                	$('#tableBarang').DataTable({
	                        data: res,
	                        columns: [
	                            {
	                                title: "ID Barang",
	                                data: "idBarang"
	                            },
	                            {
	                                title: "Kategori",
	                                data: "kategoriBarang.namaKategori"
	                            },
	                            {
	                                title: "Nama Barang",
	                                data: "namaBarang"
	                            },
	                            
	                            {
	                                title: "Distributor",
	                                data: "distributor.namaPT"
	                            }
	                        ]
	                	
	                	});
	                	
	                } else {

	                }
	            },
	            error: function (xhr, status, error) {
	                console.log(status);
	            }
			})
		},
		
		showBarang2: function() {
			if ($.fn.DataTable.isDataTable('#tableBarang')) {
	            $('#tableBarang').DataTable().clear();
	            $('#tableBarang').DataTable().destroy();
	        }
			
			tableBarang.resetFilter();
			
			$.ajax({
				url: '/api/barang/getbydist?id_dist=' + selDist,
				method: 'get',
				contentType: 'application/json',
	            dataType: 'json',
				success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
//	                	console.log("distrib selected=",res[0].distributor.namaPT);
	                	$('#tableBarang').DataTable({
	                        data: res,
	                        columns: [
	                            {
	                                title: "ID Barang",
	                                data: "idBarang"
	                            },
	                            {
	                                title: "Kategori",
	                                data: "kategoriBarang.namaKategori"
	                            },
	                            {
	                                title: "Nama Barang",
	                                data: "namaBarang"
	                            },
	                            
	                            {
	                                title: "Distributor",
	                                data: "distributor.namaPT"
	                            }
	                        ]
	                	
	                	});
	                	
	                } else {

	                }
	            },
	            error: function (xhr, status, error) {
	                console.log(status);
	            }
			})
		},
		
		showBarangByFilter: function() {
			if ($.fn.DataTable.isDataTable('#tableBarang')) {
	            $('#tableBarang').DataTable().clear();
	            $('#tableBarang').DataTable().destroy();
	        }
			
			var nmBrg =  $("#barangF").val();
			var nmKtg = $("#kateF").val();
			var nmPT = $("#distF").val();
			
			$.ajax({
				url: '/api/ref-dist/brg/filters/'+nmBrg+'/'+nmKtg+'/'+nmPT,
				method: 'get',
				contentType: 'application/json',
	            dataType: 'json',
				success: function (res, status, xhr) {
	            	
	                if (xhr.status == 200 || xhr.status == 201) {
	                	$('#tableBarang').DataTable({
	                        data: res,
	                        columns: [
	                            {title: "ID Barang",data: "idBarang"
	                            },
	                            { title: "Kategori", data: "kategoriBarang.namaKategori"
	                            },
	                            {title: "Nama Barang",data: "namaBarang"
	                            },
	                            { title: "Distributor", data: "distributor.namaPT"
	                            }
	                        ]
	                	});
	                } 
	            },
	            error: function (xhr, status, error) {
	                console.log(status);
	            }
			})
		}
}

//dropdown data kategori barang
var selopKategori = {
	    getAllKategori: function (idAja) {
	    	
	        $.ajax({
	            url: '/api/kategoribarang',
 	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
//	                	console.log(res);
	                	//looping id namaKategori
//	                	var ds = [];
//	                	var num = $('#cobaselect').val();
//	                	console.log("$('#cobaselect').val()=",num);
//	                	// definisikan max length sbg VALUE DARI OPTION
//	                	for (var i = 0; i < num; i++){
//            				ds[i] = document.getElementById("namaKategori"+(i+1));
//            				console.log("ds["+i+"]=",ds[i]);
//            				console.log("ds.length=",ds.length);
	                	
            			var dynamicSelect = document.getElementById("namaKategori1");
	                	 res.forEach(element => {
	                		 var newOption = document.createElement("option");
	                		 newOption.setAttribute("id", element.idKategori);
	                		 newOption.setAttribute("value", element.namaKategori);
	                		 newOption.text = element.namaKategori;
	                		 
	                		 console.log("newOption=",newOption);
//	                				ds[i].add(newOption);
	                		 dynamicSelect.add(newOption);
	                	 	});
//	                	} 	// kurwal loop for
	                	 
//	                	 for (var i = 0; i < num; i++) {
//	                	 if (idAja!=0){
//	                		 $("#namaKategori"+(i+1)+" option[id='"+idAja+"']").attr("selected","selected");
//	                	 	}
//	                	 }
	                } 
	        			else {
	                }
	            },
	            error: function (err) {
	                console.log(err);
	            }
	        });
	    }
};

var num;	// dipakai utk postlist jg

//dropdown data distributor
var selopDistributor = {
	    getAllDistributor: function (idAja) {
	    	
	        $.ajax({
	            url: '/api/ref-dist',
 	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	console.log(res);
	                	//looping id namaPT Distributor
//	                	var ds = [];
//	                	num = $('#cobaselect').val();	// element loop by selected value option
//	                	console.log("$('#cobaselect').val()=",num);
//
//	                	for (var i = 0; i < num; i++){
//            				ds[i] = document.getElementById("namaPT"+(i+1));
//            				console.log("ds["+i+"]=",ds[i]);
//            				console.log("ds.length=",ds.length);
            				
	                	 //$('#namaPT'"+i+"'').find('option').remove();
	                	var dynamicSelect = document.getElementById("namaPT1");
	                	 res.forEach(element => {
	                		 var newOption = document.createElement("option");
	                		 newOption.setAttribute("id", element.distID);
	                		 newOption.setAttribute("value", element.namaPT);
	                		 newOption.text = element.namaPT;
	                		 
	                		 console.log("newOption=",newOption);
	                		 dynamicSelect.add(newOption);
//             				 ds[i].add(newOption);
	                		 
	                		 
	                	 	});
//	                	} 	// kurwal loop for
	                	
//	                	 for (var i = 0; i < num; i++) {
//	                	 if (idAja!=0){
//	                		 $("#namaPT"+(i+1)+" option[id="+idAja+"]").attr("selected","selected");
//	                	 	}
//	                	 }
	                } else {
	                }
	            },
	            error: function (err) {
	                console.log(err);
	            }
	        });
	    }
	};


//form data barang
var formBarang = {
    resetForm: function () {
        $('#form-barang').trigger("reset");
        $("#namaKategori1").val('0').trigger('change');
        $("#namaPT1").val('0').trigger('change');
        $("#namaBarang1").val("");
    },
    saveForm: function () {
        if ($('#form-barang').parsley().validate()) {

        var selkat = [];
        var id1 = [];
        var seldi = [];
        var id2 = [];
        var myKategoriBarang = [];
        var myDistributor = [];
        var dataBarang;
        var arrDataJson = [];
        
        for (var i = 0; i < 2; i++){
        	
        	selkat[i] = document.getElementById("namaKategori"+(i+1)); 		
            id1[i] = selkat[i].options[selkat[i].selectedIndex].id;			// id option
            
            seldi[i] = document.getElementById("namaPT"+(i+1));
            id2[i] = seldi[i].options[seldi[i].selectedIndex].id;
            
        	myKategoriBarang[i] = {
        			idKategori: id1[i]
        	}
        	myDistributor[i] = {
        			distID: id2[i]
        	}
        	
        	//Dto
        	dataBarang = {
        			namaBarang: document.getElementById("namaBarang"+(i+1)).value,
//        			hargaBeli: document.getElementById("hargaBeli"+(i+1)).value,
//        			hargaJual: document.getElementById("hargaJual"+(i+1)).value,
        			idKategori: id1[i],
        			distID: id2[i],
        			idBarang: "string"
        	}
        	
        	arrDataJson.push(dataBarang);			//push data to array, in loop ssuai datanya jg loop
        
        } // kurwal for loop
        
        	console.log("hasil push arrdataJson=", arrDataJson); //=banyak data klo arr.push()
        	
            $.ajax({
                url: '/api/barang/postlistDTO',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(arrDataJson),
                success: function (res, status, xhr) {
                	console.log("res=",res)
                    if (xhr.status == 200 || xhr.status == 201) {
                        
                        $('#modal-add-item').modal('hide');
                        toastr.success('Data Anda berhasil ditambahkan dan disimpan.');
                        tableBarang.showBarang(selDist);


                    } else {

                    }
                },
                error: function (err) {
                    console.log(err);
                	}
            	})
        	
        }
    },
    
    saveAll: function() {
    	
    	//if ($('#form-barang').parsley().validate()){
    		
    	$.ajax({
			url: '/api/barang/postlistDTO',
			method: 'post',
			contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(kumpulan),  // kumpulan = arrJson
            success: function (res, status, xhr) {
             	console.log(res)
             	
                 if ((xhr.status == 200 || xhr.status == 201) && res.length > 0) {
                	 $('#modal-add-item').modal('hide');
                     toastr.success('Data Anda berhasil ditambahkan dan disimpan.');
                     tableBarang.showBarang(selDist);
                     formBarang.resetForm();
                 } else {
                	 toastr.error('Mohon tambah dan masukkan data terlebih dahulu.')
                 } 
             },
             error: function (status, xhr) {
            	 toastr.error('Mohon tambah dan masukkan data terlebih dahulu.')
                 console.log(status);
             }
		})
		
    	//}//parsley
	}
}
//
//$(document).ready(function() {
//selopKategori.getAllKategori(0);
//selopDistributor.getAllDistributor(selDist);
////	populateCombo.getAllBank();	
//})
