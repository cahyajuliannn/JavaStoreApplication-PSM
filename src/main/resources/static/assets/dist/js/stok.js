var idEdit;
//$("#btn-edit-stok").click(function () {
//	formStok.editForm(idEdit);
//});

// execute edit/update with +- quantity
$("#btn-edit-stok").click(function () {
	formStok.updateOne();
});

var idTabCbg;

var gloIdStok;
var gloBar;
var gloCab;
var gloVar;
var gloGud;

var cabvalF;
var barvalF;
var varvalF;

$("#cabangF").change(function() {
	  $( "#cabangF option:selected" ).each(function() {
	    cabvalF = $( this ).text();
	  });
	}).trigger("change");

$("#barangF").change(function() {
	  $( "#barangF option:selected" ).each(function() {
	    barvalF = $( this ).text();
	  });
	}).trigger("change");

$("#variantF").change(function() {
	  $( "#variantF option:selected" ).each(function() {
	    varvalF = $( this ).text();
	  });
	}).trigger("change");

var tableStok = {
    create: function () {
        // jika table tersebut datatable, maka clear and destroy
        if ($.fn.DataTable.isDataTable('#tableStok')) {
            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
            $('#tableStok').DataTable().clear();
            $('#tableStok').DataTable().destroy();
        }

        $.ajax({
            url: '/api/stok',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableStok').DataTable({
                        data: res,
                        columns: [
                        	{title: "ID Stok",data: "idStok"},
                        	{title: "Cabang",data: "namaCabang"},
//                            {title: "ID Barang", data: "idBarang"},
                            {title: "Nama Barang",data: "namaBarang"},
                            {title: "Variant",data: "variantAja"},
                            {title: "Kategori",data: "namaKategori"},
                            {title: "Gudang",data: "gudang"},
                            {title: "Jumlah Stok",data: "jumlahStok"},
                            {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                	
                                    return "<button class='btn btn-primary btn-sm' onclick=formStok.setEditData('" + data.idStok + "')><i class='fas fa-edit'></i></button>" +
                                    		"<button class='btn btn-danger btn-sm' onclick=formStok.deleteData('" + data.idStok + "') id='del'><i class='fas fa-trash-alt'></i></button>"
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
    
    createByCabang: function() {
    	if ($.fn.DataTable.isDataTable('.table')) {
            $('.table').DataTable().clear();
            $('.table').DataTable().destroy();
        }
    	
    	$.ajax({	// getallcabang 
    		url: '/api/cabang/filter/Aktif',
    		method: 'get',
    		contentType: 'application/json',
    		success: function (res, status, xhr) {
    			if (xhr.status == 200 || xhr.status == 201){
    				console.log("res.length=" ,res.length);

    				
    				res.forEach(element => {
    					
    					idTabCbg = element.idCabang;
    					$("#cardHeader").append("<div class='card'>" +
    						"<div class='card-header'>" +
    						"<h3 class='card-title'>Daftar Stok Barang <b>"+ element.namaCabang +"</b> </h3>" 
    						+"</div><div class='card-body table-responsive'>" +
    						"<table class='table table-striped table-bordered table-hover nowrap' " +
    						"style='width:100%' id='"+element.idCabang+"'></table></div></div>");
    					
    					
    					
    			    	$.ajax({
    			            url: '/api/stok/getbycabang?id_cabang=' + element.idCabang,
    			            method: 'get',
    			            contentType: 'application/json',
    			            success: function (ress, status, xhr) {
    			                if (xhr.status == 200 || xhr.status == 201) {
    			                    $('#'+element.idCabang+'').DataTable({
    			                        data: ress,
    			                        columns: [
    			                        	{title: "ID Stok",data: "idStok"},
    			                        	{title: "Cabang",data: "namaCabang"},
//    			                            {title: "ID Barang", data: "idBarang"},
    			                            {title: "Nama Barang",data: "namaBarang"},
    			                            {title: "Variant",data: "variantAja"},
    			                            {title: "Kategori",data: "namaKategori"},
    			                            {title: "Gudang",data: "gudang"},
    			                            {title: "Jumlah Stok Saat Ini",data: "jumlahStok"}
    			                            ,
    			                            {
    			                                title: "Action",
    			                                data: null,
    			                                render: function (data, type, row) {
    			                                	
    			                                    return "<button class='btn btn-primary btn-sm' onclick=formStok.setEditData('" + data.idStok + "')><i class='fas fa-edit'></i></button>" +
    			                                    		"<button class='btn btn-danger btn-sm' onclick=formStok.deleteData('" + data.idStok + "') id='del'><i class='fas fa-trash-alt'></i></button>"
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
    					
    			    	
    			    	
    				}) // res forEach
    				
    			}
    		}
    	})
	},
	
	createByFilters: function() {
		
		if ($.fn.DataTable.isDataTable('#tableStok')) {
            $('#tableStok').DataTable().clear();
            $('#tableStok').DataTable().destroy();
        }
		
        $.ajax({
            url: '/api/stok/getbyfilters/' + cabvalF +'/'+ barvalF +'/'+ varvalF,
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableStok').DataTable({
                        data: res,
                        columns: [
                        	{title: "ID Stok",data: "idStok"},
                        	{title: "Cabang",data: "namaCabang"},
//                            {title: "ID Barang", data: "idBarang"},
                            {title: "Nama Barang",data: "namaBarang"},
                            {title: "Variant",data: "variantAja"},
                            {title: "Kategori",data: "namaKategori"},
                            {title: "Gudang",data: "gudang"},
                            {title: "Jumlah Stok",data: "jumlahStok"},
                            {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                	
                                    return "<button class='btn btn-primary btn-sm' onclick=formStok.setEditData('" + data.idStok + "')><i class='fas fa-edit'></i></button>" +
                                    		"<button class='btn btn-danger btn-sm' onclick=formStok.deleteData('" + data.idStok + "') id='del'><i class='fas fa-trash-alt'></i></button>"
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
};

var populateComboVar = {	// nanti panggil function(res.idBarang) di dlm populateCombobarang res.forEach
		
		getVariants: function(idSel) {
			 $.ajax({
		            url: '/api/histok/variant?id_barang=' + idSel,
//				 	url: '/api/histok/variant?id_barang=B_1',
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	if (xhr.status==200|| xhr.status==201) {
		            		
		            console.log("resVariant",res);
		            var dynamicSelect = document.getElementById("selectVariant");
		            res.forEach(element=> {
		            	var newOption = document.createElement("option");
		            	newOption.setAttribute("id", element.idVariant);
		            	var n = element.nilai;
		            	var s = element.satuan;
		            	
		            	console.log("n + s",n +' '+ s);
		            	
		            	if (n != 0) {
		            		newOption.text = n +' '+ s; 
			            	newOption.value = n +' '+ s; 
			            	
		            	} else {
		            		newOption.text = s; 
			            	newOption.value = s;
		            	}
		            	
		            	dynamicSelect.add(newOption);
		            	
		            	$("#selectVariant").select2();
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
		},
		
		getVariantsFilter: function(idSel) {
			 $.ajax({
		            url: '/api/histok/variant?id_barang=' + idSel,
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	if (xhr.status==200|| xhr.status==201) {
		            		
		            console.log("resVariant",res);
		            var dynamicSelect = document.getElementById("variantF");
		            res.forEach(element=> {
		            	var newOption = document.createElement("option");
		            	newOption.setAttribute("id", element.idVariant);
		            	var n = element.nilai;
		            	var s = element.satuan;
		            	
		            	console.log("n + s",n +' '+ s);
		            	
		            	if (n != 0) {
		            		newOption.text = n +' '+ s; 
			            	newOption.value = n +' '+ s; 
			            	
		            	} else {
		            		newOption.text = s; 
			            	newOption.value = s;
		            	}
		            	
		            	dynamicSelect.add(newOption);
		            	
		            	$("#variantF").select2();
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

var formStok = {
    resetForm: function () {
        $('#form-stok').trigger("reset");
//        $("#selectIDbarang").select2("val", "0");
//        $("#selectIDalamatCabang").select2("val", "0");
//        $("#selectVariant").select2("val", "0");
//        $("#status").select2("val", "0");
//        $("#warehouse").select2("val", "0");

        $("#selectIDbarang").val('0').trigger('change');
        $("#selectIDalamatCabang").val('0').trigger('change');
        $("#selectVariant").val('0').trigger('change');
        $("#status").val('Masuk').trigger('change');
        $("#warehouse").val('0').trigger('change');
    },
    saveForm: function () {
        if ($('#form-stok').parsley().validate()) {
            
            var selbar = document.getElementById("selectIDbarang"); 		// id="selectID" utk select option
            var id1 = selbar.options[selbar.selectedIndex].id;		// id dari option yg diselect/dipilih
            
            var selcab = document.getElementById("selectIDalamatCabang");
            var id2 = selcab.options[selcab.selectedIndex].id;
            
            var selvar = document.getElementById("selectVariant");
            var varval = selvar.options[selvar.selectedIndex].value;
            
            console.log( selbar.options[selbar.selectedIndex].value );
            console.log( selvar.options[selvar.selectedIndex].value );
            console.log(id2);
            
            var dataStok = {
            		idBarang : id1,
            		idCabang : id2,
            		variantAja: varval,
            		kuantitas: document.getElementById("quantity").value,
            		gudang: document.getElementById("warehouse").value,
            		status: document.getElementById("status").value,
            		tglTransaksi: document.getElementById("transDate").value,
            		alasan: $("#reason").val()
            		
            } 
            
            console.log(dataStok);
            
            $.ajax({
                url: '/api/histok/postnew',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataStok),	
                success: function (res, status, xhr) {
                	console.log(res);
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableStok.createByCabang(); //tbentuk tabel kosong baru
                        
                        $('#modal-stok').modal('hide');
                        $("#selectIDbarang").append("<option value = '1' hidden selected> -- Pilih Barang -- </option>");
                        $("#selectIDalamatCabang").append("<option value = '1' hidden selected> -- Pilih Cabang -- </option>");
                        toastr.success('Data berhasil ditambahkan dan disimpan.')
                        $("#selectIDbarang").find("option[value='1']").remove();
                        $("#selectIDalamatCabang").find("option[value='1']").remove();
                        
                    } else { 

                    } 
                },
                error: function (status, xhr) {
                    console.log(status, xhr);
                } 
            }); 
        } 
    }			// idCabangg disini hanya sbg parameter
    , setEditData: function (idCabangg) {	// tombol Edit hanya utk tampilin data yg udah terisi & show modal
        formStok.resetForm(); // modal stok1
        idEdit = idCabangg;		// new, supaya idCabang bisa dibawa ke fungsi editForm
        console.log(idCabangg);
        $.ajax({
            url: '/api/stok/' + idCabangg,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
            	console.log(res);
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#form-stok2').fromJSON(JSON.stringify(res));

                    gloIdStok = res.idStok;
                    gloBar = res.idBarang;
                    gloCab = res.idCabang;
                    gloVar = res.variantAja;
                    gloGud = res.gudang;
                    
                    $("#selBarang2").val(res.namaBarang);
            		$("#selCabang2").val(res.namaCabang);
            		$("#selVariant2").val(gloVar);
            		$("#jumlah2").val(res.jumlahStok);
                    
                    $("#status2").select2();
                    $("#status2").select2("val", "0");
                    $("#warehouse2").val(gloGud).trigger('change');
                	$('#form-stok2').parsley().reset();	
                    $('#modal-stok2').modal('show')

                } else {

                }
            },
            error: function (status, xhr) {
                console.log(status, xhr);
            }
        });


    }, editForm: function (idCabangg) {
    	if ($('#form-stok2').parsley().validate()) {
    		var selbar = document.getElementById("selectIDbarang2"); 		// id="selectID" utk select option
            var id1 = selbar.options[selbar.selectedIndex].id;		// id dari option yg diselect/dipilih
            
            var selcab = document.getElementById("selectIDalamatCabang2");
            var id2 = selcab.options[selcab.selectedIndex].id;
            
            console.log( selbar.options[selbar.selectedIndex].value );
            console.log( selcab.options[selcab.selectedIndex].value );
            
            var myRefData1 = {
            		idBarang : id1
            }
            
            var myRefData2 = {
            		idCabang : id2
            }
            
            var dataStok = {
            		barang : myRefData1,		
            		jumlahStok: document.getElementById("amount2").value,
            		gudang: document.getElementById("warehouse2").value,
            		cabang : myRefData2
            }
            
            console.log(dataStok);
	        
            
            
	        $.ajax({
	            url: '/api/stok/' + idCabangg,
	            method: 'put',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(dataStok),	// ganti dataResult -> dataStok
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
//	                    tableStok.createByCabang();
	                	
	                    $('#modal-stok2').modal('hide');
	                    location.reload();
	                    toastr.success('Data berhasil diubah dan disimpan.')
	
	                } else {
	
	                }
	            },
	            error: function (status, xhr) {
	                console.log(status, xhr);
	            }
	        });
    	}
    }
    , deleteData: function (idCabangg) {
    	idEdit = idCabangg;
    	if (confirm('Anda yakin ingin menghapus data ini?')) {
	    	$.ajax({
	            url: '/api/stok/isdelete/' + idCabangg,
	            method: 'post',
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (res, status, xhr) {
	            	tableStok.create();
	            	toastr.success('Data berhasil dihapus.');
	            },
	            error: function(xhr, status, error) {
	        	  console.log(error);
	        	  console.log(status);
	            }
	        });
    	}
    }
    , saveAll: function() {
    	
    	if ($('#form-stok').parsley().validate()) {
    		$.ajax({
    			url: '/api/histok/liststok',
    			method: 'post',
    			contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(kumpulan),  // kumpulan = arrJson
                success: function (res, status, xhr) {
                 	console.log(res)
                     if (xhr.status == 200 || xhr.status == 201) {
                    	 $("#modal-stok").modal('hide');
                         toastr.success('Data Anda berhasil ditambahkan dan disimpan.');
                         tableStok.create();
                     } else {

                     }
                 },
                 error: function (err) {
                     console.log(err);
                 }
    		})
    	}
    	
		
		
	}, 
    updateOne: function() {
    	if ($('#form-stok2').parsley().validate()) {
    		
    		
    		
    	var dataStokUpdate = {
        		idStok: gloIdStok,
    			idBarang: gloBar, //global dari get by id
        		idCabang: gloCab,
        		variantAja: gloVar,
    			kuantitas: document.getElementById("quantity2").value,
        		gudang: $("#warehouse2").val(),
        		status: $("#status2").val(),
        		tglTransaksi: $("#transDate2").val(),
        		alasan: $("#reason2").val()
        }
    	
    	console.log("datastokupdate", dataStokUpdate)
    	
    	$.ajax({
    		url: '/api/histok/inout',
    		method: 'post',
			contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(dataStokUpdate),
            success: function(res, status, xhr) {
            	if (xhr.status == 200 || xhr.status == 201) {
            		$("#modal-stok2").modal('hide');
               	 	tableStok.create();
                    toastr.success('Data Anda berhasil diubah dan disimpan.');
                    
                } else {

                }
			},
            error: function (err) {
                console.log(err);
            }
    	})
    } // parsley
	}
	
	
    
};

var stok = [];
var i = 0;
var edit2 = "edit";

var stokBaru = {
		save: function() {
			console.log("i",i)
			
			if ($('#form-stok').parsley().validate()){
			
			var selbar = document.getElementById("selectIDbarang"); 		// id="selectID" utk select option
			var idbar = selbar.options[selbar.selectedIndex].id;		// id dari option yg diselect/dipilih
					            
			var selcab = document.getElementById("selectIDalamatCabang");
			var idcab = selcab.options[selcab.selectedIndex].id;
					            
			var selvar = document.getElementById("selectVariant");
			var varval = selvar.options[selvar.selectedIndex].value;
					            
			console.log( selbar.options[selbar.selectedIndex].value );
			console.log( selcab.options[selcab.selectedIndex].value );
			console.log("idbar idcab idvarval",idbar, idcab, varval);
					            
			var barval = selbar.options[selbar.selectedIndex].value;
			var cabval = selcab.options[selcab.selectedIndex].value;
			var varval = selvar.options[selvar.selectedIndex].value;
			var kuant = $("#quantity").val();
			var gudg = $("#warehouse").val();
			var status = $("#status").val();
			var tgl = $("#transDate").val();
			var alasan = $("#reason").val();
			
			console.log("barval,cabval,varval,kuant,gudg,status,tgl,alasan", barval, cabval, varval, kuant, gudg, status,tgl,alasan);
			
			if (edit2 != "edit") {
				(stok[edit2]).idBarang = idbar;
				(stok[edit2]).namaBarang = barval;
				(stok[edit2]).idCabang = idcab;
				(stok[edit2]).namaCabang = cabval;
				(stok[edit2]).variantAja = varval;
				(stok[edit2]).kuantitas = kuant;
				(stok[edit2]).gudang = gudg;
				(stok[edit2]).status = status;
				(stok[edit2]).tglTransaksi = tgl;
				(stok[edit2]).alasan = alasan;
			} else {
				stok [i] = {
						id : i,
						idBarang: idbar,
						namaBarang: barval,
						idCabang: idcab,
						namaCabang: cabval,
						variantAja: varval,
						kuantitas: kuant,
						gudang: gudg,
						status: status,
						tglTransaksi: tgl,
						alasan: alasan
				}
				i++;
				console.log("stok[i] dlm else", stok[i])
			}
			
			} //parsley validate
			
			$('#form-stok').parsley().reset();
			$('#form-stok')[0].reset();
			
			if (stok.length == 0){
				toastr.info("Mohon tambah dan lengkapi data Anda terlebih dahulu.");
			}
			
            console.log("stok[i] stlah reset",stok[i])
            console.log("stok[edit2]", stok[edit2])
            edit2 = "edit"; //edit2 back to "edit".
            
            stokBaru.table(); // add the created data to temporary table
			
            $("#selectIDbarang").val('0').trigger('change');
	        $("#selectIDalamatCabang").val('0').trigger('change');
	        $("#selectVariant").val('0').trigger('change');
	        $("#warehouse").val('0').trigger('change');
            $("#transDate").val('');
            $("#reason").val('');
            $("#quantity").val('');
            
		},
		
		table: function() {
			// table Sementara
			if($.fn.DataTable.isDataTable("#tableTambahStok")){
				$('#tableTambahStok').DataTable().clear();
				$('#tableTambahStok').DataTable().destroy();
			}
			console.log(stok)
			
			$('#tableTambahStok').DataTable({
				data: stok,
				columns: [
//					{title : "No", data : "id", 
//						render : function(data, type, row, meta){
//							return meta.row + meta.settings._iDisplayStart + 1;
//						} 
//					},
                	{title: "Cabang",data: "namaCabang"},
                    {title: "Nama Barang",data: "namaBarang"},
                    {title: "Variant",data: "variantAja"},
                    {title: "Gudang",data: "gudang"},
                    {title: "Kuantitas",data: "kuantitas"},
                    {title: "Status",data: "status"},
                    {title: "Tgl Transaksi",data:"tglTransaksi"},
                    {title: "Keterangan", data: "alasan"},
                    {
                        title: "Action",
                        data: null,
                        render: function (data, type, row) {
                        	
                            return "<button class='btn btn-primary btn-sm' onclick=stokBaru.editRow('" + data.id + "')><i class='fas fa-edit'></i></button>" +
                            		"<button class='btn btn-danger btn-sm' onclick=stokBaru.deleteRow('" + data.id + "') id='del'><i class='fas fa-trash-alt'></i></button>"
                            }
                        }
				]
			})
			
		},
		
		editRow: function(idd) {
			edit2 = idd;
			console.log("edit=", edit2)
			// id and value from option
			var barang = stok[idd].idBarang;
			var cabang = stok[idd].idCabang;
			var varian = stok[idd].variantAja;
			
			// bring back the value to the form input
			$("#selectIDbarang").val(stok[idd].namaBarang).trigger('change');
	        $("#selectIDalamatCabang").val(stok[idd].namaCabang).trigger('change');
	        $("#selectVariant").val(stok[idd].variantAja).trigger('change');
	        $("#warehouse").val(stok[idd].gudang).trigger('change');
            $("#transDate").val(stok[idd].tglTransaksi);
            $("#reason").val(stok[idd].alasan);
            $("#quantity").val(stok[idd].kuantitas);
            
//            $('#modal-stok').modal('handleUpdate');
//            $('#modal-stok').modal('show');
			
		},
		
		deleteRow: function(idd) {
			if(confirm("Anda yakin ingin menghapus data ini?")){
				var row = $(this).closest("tr");
				var rem = stok.splice(idd, 1);
				
				for(var j=0; j < stok.length; j++){
					(stok[j]).idd = j;
					console.log((stok[j]).idd)
				}
				
				stokBaru.table();
				i--;
			}
		},
		
		saveAll: function() {
			
//			if ($('#form-stok').parsley().validate()){
			
    		$.ajax({
    			url: '/api/histok/liststok',
    			method: 'post',
    			contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(stok),  // kumpulan = arrJson
                success: function (res, status, xhr) {
                 	console.log("res",res)
                     if ((xhr.status == 200 || xhr.status == 201) && stok.length > 0) {
                    	 $("#tableTambahStok").DataTable().clear().draw();
                    	 
                    	 $("#modal-stok").modal('hide');
                    	 tableStok.create();
                         toastr.success('Data Anda berhasil ditambahkan dan disimpan.');
                         stok = [];
                         i = 0;
                     } else {
                    	 toastr.error('Mohon tambah dan masukkan data terlebih dahulu.');
                     }
                 	console.log("stok=", stok)
                 },
                 error: function (err) {
                     console.log(err);
                 }
    		})
//			} //pasrley
		}
};



var itemlist;

var populateCombo = {
		getAllBarang: function (idSel) {
			$.ajax({
				url: '/api/barang',
				method: 'get',
				contentType: 'application/json',
				dataType: 'json',
				success: function (res, status, xhr) {
					if(xhr.status == 200 || xhr.status == 201){
						$("#selectIDbarang").select2();
						var dynamicSelect = document.getElementById("selectIDbarang");
						
						res.forEach(element => {
						
							var newOption = document.createElement("option");
							newOption.setAttribute("id", element.idBarang);		
							newOption.text = "["+ element.namaKategori +"] "+ element.namaBarang;
							dynamicSelect.add(newOption);
					
							
					});
//						if (idSel != 0){
//							$("#selectIDbarang option[id='"+idSel+"']").attr("selected","selected");
//						}
					}
				},
				error: function (status, xhr) {
	                console.log(status, xhr);
					}
			
		});
	},
	
	getAllBarangFilter: function() {
		$.ajax({
			url: '/api/barang',
			method: 'get',
			contentType: 'application/json',
			dataType: 'json',
			success: function (res, status, xhr) {
				if(xhr.status == 200 || xhr.status == 201){
					$("#barangF").select2();
					var dynamicSelect = document.getElementById("barangF");
					
					res.forEach(element => {
					
						var newOption = document.createElement("option");
						newOption.setAttribute("id", element.idBarang);		
						newOption.text = element.namaBarang;
						dynamicSelect.add(newOption);
				
						
				});
				}
			},
			error: function (status, xhr) {
                console.log(status, xhr);
				}
		
	});
	}
}
	

var populateCombo2 = {
		getAllBarang: function (idSel) {
			$.ajax({
				url: '/api/barang',
				method: 'get',
				contentType: 'application/json',
				dataType: 'json',
				success: function (res, status, xhr) {
					if(xhr.status == 200 || xhr.status == 201){
						$("#selectIDbarang2").select2();
						var dynamicSelect = document.getElementById("selectIDbarang2");
						$("#selectIDbarang2").find("option").remove();
						res.forEach(element => {
						
							var newOption = document.createElement("option");
							newOption.setAttribute("id", element.idBarang);		// kd_dati2 sebagai id dari element option
							newOption.text = element.namaBarang;
							dynamicSelect.add(newOption);
					
					});
						if (idSel != 0){
							$("#selectIDbarang2 option[id='"+idSel+"']").attr("selected","selected");
						}
					}
				},
				error: function (status, xhr) {
	                console.log(status, xhr);
					}
			
		});
	}
}
	
var storelist;

var populateCombo3 = {
		getAllalamatCabang: function (idSel) {
			$.ajax({
				url: '/api/cabang/filter/Aktif',
				method: 'get',
				contentType: 'application/json',
				dataType: 'json',
				success: function (res, status, xhr) {
					if(xhr.status == 200 || xhr.status == 201){
						
						$("#selectIDalamatCabang").select2();
						var dynamicSelect = document.getElementById("selectIDalamatCabang");
//						$("#cabangF").select2();
//						var dynamicSelect2 = document.getElementById("cabangF");
//						$("#selectIDalamatCabang").find("option").remove();
						res.forEach(element => {
						
							var newOption = document.createElement("option");
							newOption.setAttribute("id", element.idCabang);		
							newOption.text = element.namaCabang;
							dynamicSelect.add(newOption);
//							dynamicSelect2.add(newOption);
					
					});
						
						if (idSel != 0){
							$("#selectIDalamatCabang option[id='"+idSel+"']").attr("selected","selected");
						}
					}
				},
				error: function (status, xhr) {
	                console.log(status, xhr);
					}
			
		});
	},
	
	getAllCabangFilter: function() {
		$.ajax({
			url: '/api/cabang',
			method: 'get',
			contentType: 'application/json',
			dataType: 'json',
			success: function (res, status, xhr) {
				if(xhr.status == 200 || xhr.status == 201){
					$("#cabangF").select2();
					var dynamicSelect = document.getElementById("cabangF");
					res.forEach(element => {
					
						var newOption = document.createElement("option");
						newOption.setAttribute("id", element.idCabang);		
						newOption.text = element.namaCabang;
						dynamicSelect.add(newOption);
				
				});
					
					
				}
			},
			error: function (status, xhr) {
                console.log(status, xhr);
				}
		
	});
	}
}
	
var populateCombo4 = {
		getAllalamatCabang: function () {
			$.ajax({
				url: '/api/cabang/filter/Aktif',
				method: 'get',
				contentType: 'application/json',
				dataType: 'json',
				success: function (res, status, xhr) {
					if(xhr.status == 200 || xhr.status == 201){
						$("#selectIDalamatCabang2").select2();
						var dynamicSelect = document.getElementById("selectIDalamatCabang2");
						$("#selectIDalamatCabang2").find("option").remove();
						res.forEach(element => {
						
							var newOption = document.createElement("option");
							newOption.setAttribute("id", element.idCabang);		
							newOption.text = element.namaCabang;
							dynamicSelect.add(newOption);
					});
//						if (idSel != 0){
//							$("#selectIDalamatCabang2 option[id='"+idSel+"']").attr("selected","selected");
//						}
					}
				},
				error: function (status, xhr) {
	                console.log(status, xhr);
					}
			
		});
	}
}
	


//$(document).ready(function () {
//	populateCombo3.getAllCabangFilter();
//});

//	populateCombo.getAllBarang();
//	populateCombo3.getAllalamatCabang();
//	populateCombo2.getAllBarang();
//	populateCombo4.getAllalamatCabang();
	
//	$("#selectIDbarang").select2({	// NEW utk SELECT2
//		data: itemlist
//	});
//	
//	$("#selectIDalamatCabang").select2({	// NEW utk SELECT2
//		data: storelist
//	});
//	
//	$("#selectIDbarang2").select2({	// NEW utk SELECT2
//		data: itemlist
//	});
//	
//	$("#selectIDalamatCabang2").select2({	// NEW utk SELECT2
//		data: storelist
//	});
//})
