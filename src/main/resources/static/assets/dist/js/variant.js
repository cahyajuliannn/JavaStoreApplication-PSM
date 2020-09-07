
var nomorRow = 0;
var variant = [];
var row = null;

document.onkeypress = function (e) {
    // use e.keyCode
	modalVarStatus = $('#modal-variant').hasClass('in')
	if(modalVarStatus = true && e.keyCode == 13){
		$('#btn-save-variant').click()
	}	
};

$("#namaBarang").select2();
$("#namaBarang2").select2();

var editK;
$("#btn-edit-variant").click(function(){
	formVariant.editVariant(editK);
});

$('#btn-save-variant').click(function() {
	
	jumlahRowBaru = $('#tableSementara').find('.rowVariant').length;
	if (jumlahRowBaru < 1) {
		console.log(jumlahRowBaru)
		var message = "Anda belum memasukkan data apapun"
			toastr.error(message);
	} else {
		formSementara.saveForm();
	}
	
});

var formSementara = {
	    resetForm: function () {
	        $('#form-variant')[0].reset();
	        $('#form-variant').parsley().reset();
	        $('#tableSementara').DataTable().clear();
	        $('#tableSementara').DataTable().destroy();
	    }, saveForm: function (e) {
	    	console.log(JSON.stringify(variant))
	    	$.ajax({
	        url: '/api/variant/all',
	        method: 'post',
	        contentType: 'application/json',
	        dataType: 'json',
	        data: JSON.stringify(variant),
	        success: function (res, status, xhr) {
	            if (xhr.status == 200 || xhr.status == 201) {
	                tableVariant.create();
	                $('#modal-variant').modal('hide')
	                nomorRow=0;
	             
	            } else {

	            }
	        },
	        error: function(xhr, status, error) { 
	        	var err = eval("(" + xhr.responseText + ")"); 
	        	console.log(JSON.parse(xhr.responseText)); 
	        }
	    });
	    } 
	};

var hargaAwal;
var hargaAkhir;
var hargaAsc = '';

var tableVariant = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableVariant')) {
            // table yg sudah dibentuk menjadi datatable harus d rebuild lagi
			// untuk di instantiasi ulang
            $('#tableVariant').DataTable().clear();
            $('#tableVariant').DataTable().destroy();
        }

        $.ajax({
            url: '/api/variant',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableVariant').DataTable({
                        data: res,
                        columns: [
                        	{title: "ID", data: "idVariant"},
                        	{title: "Nama Variant", data: "namaVariant"},
                        	{title: "Nama Barang", data: "namaBarang"},
                            {title: "Nilai", data: "nilai"},
                            {title: "Satuan", data: "satuan"},
                            {title: "Harga Beli", data: "hargaBeli"},
                            {title: "Harga Jual", data: "hargaJual"},
                            {title: "Keuntungan", data: "keuntungan"},
                            {title: "Action", data: null, render: function (data, type, row) 
                            	{
                                    return "<button class='btn-primary' onclick=formVariant.setEditData('" + data.idVariant + "')><i class='fas fa-edit'></i></button>" +
                                  "<button class='btn-danger' onclick=formVariant.setDeleteData('" + data.idVariant + "')><i class='fas fa-trash-alt'></i></button>"
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


    }, forAsc: function() {
        if ($.fn.DataTable.isDataTable('#tableVariant')) {
            $('#tableVariant').DataTable().clear();
            $('#tableVariant').DataTable().destroy();
        }
//
//		hargaAsc = $("#hargaAsc").val();
//		console.log(hargaAsc);        	
			$.ajax({
	            url: '/api/variant/asc/' ,
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#tableVariant').DataTable({
	                        data: res,
	                        columns: [
	                        	{title: "ID", data: "idVariant"},
	                        	{title: "Nama Variant", data: "namaVariant"},
	                        	{title: "Nama Barang", data: "namaBarang"},
	                            {title: "Nilai", data: "nilai"},
	                            {title: "Satuan", data: "satuan"},
	                            {title: "Harga Beli", data: "hargaBeli"},
	                            {title: "Harga Jual", data: "hargaJual"},
	                            {title: "Keuntungan", data: "keuntungan"},]
	                    });
	                } else {
	                }
	            },
	            error: function (status, xhr) {
	                console.log(status, xhr);
	            }
	        });
        	
        
	},
    createByFilters: function() {
        if ($.fn.DataTable.isDataTable('#tableVariant')) {
            $('#tableVariant').DataTable().clear();
            $('#tableVariant').DataTable().destroy();
        }

		hargaAwal = $("#hargaAwal").val();
		hargaAkhir = $("#hargaAkhir").val();
		console.log(hargaAwal, hargaAkhir);        	
			$.ajax({
	            url: '/api/variant/getbyrange/' + hargaAwal + '/' + hargaAkhir,
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#tableVariant').DataTable({
	                        data: res,
	                        columns: [
	                        	{title: "ID", data: "idVariant"},
	                        	{title: "Nama Variant", data: "namaVariant"},
	                        	{title: "Nama Barang", data: "namaBarang"},
	                            {title: "Nilai", data: "nilai"},
	                            {title: "Satuan", data: "satuan"},
	                            {title: "Harga Beli", data: "hargaBeli"},
	                            {title: "Harga Jual", data: "hargaJual"},
	                            {title: "Keuntungan", data: "keuntungan"},]
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

var formVariant = {
    resetForm: function () {
        $('#form-variant')[0].reset();
//        $('#form-variant').parsley().reset();
    },
    saveForm: function () {
        if ($('#form-variant').parsley().validate()) {
        	var b = document.getElementById("namaBarang");
        	var id = b.options[b.selectedIndex].id;
        	var myBarang = {
        			idBarang : id
        	};
        	var hargaBeli = document.getElementById("hargaBeli").value;
    		var hargaJual = document.getElementById("hargaJual").value;
            var dataVariant = {
            		nilai: document.getElementById("nilai").value,
            		satuan: document.getElementById("satuan").value,            		
            		keuntungan: hargaJual-hargaBeli,
            		namaVariant: document.getElementById("namaVariant").value,
            		barang: myBarang
            }
            console.log(JSON.stringify(dataVariant));
        	$.ajax({
                url: '/api/variant/simpan',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataVariant),
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableVariant.create();
                        $('#modal-variant').modal('hide');
//                        $("#namaBarang").append("<option value = '1' hidden selected> -- Pilih Barang -- </option>");
                        toastr.success('Data berhasil ditambahkan dan disimpan.')
//                        $("#namaBarang").find("option[value='1']").remove();

                    } else {

                    }
                },
                erorrr: function (err) {
                    console.log(err);
                }
            });
        }
    }, 
    saveAll: function() {
    	$.ajax({
			url: '/api/variant/simpan',
			method: 'post',
			contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(variant),  // kumpulan = arrJson
            success: function (res, status, xhr) {
             	console.log(res)
                 if (xhr.status == 200 || xhr.status == 201) {
                	 $('#modal-variant').modal('hide');
                     toastr.success('Data Anda berhasil ditambahkan dan disimpan.');
//                     tableBarang.showBarang(selDist);
                 } else {

                 }
             },
             error: function (err) {
                 console.log(err);
             }
		})
	},
	setEditData: function (idKat) {
        formVariant.resetForm();
        editK = idKat; // new, supaya idCabang bisa dibawa ke fungsi editForm
        console.log(idKat);
        $.ajax({
            url: '/api/variant/' + idKat,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                	 $('#form-variant2').fromJSON(JSON.stringify(res));
                     
                	$('#idVariant2').val(res.idVariant);
                	$('#nilai2').val(res.nilai);
                	$('#satuan2').val(res.satuan);
                	$('#hargaBeli2').val(res.hargaBeli);
                	$('#hargaJual2').val(res.hargaJual);
//                	$('#namaBarang').find('option').remove();
                	selopBarangEdit.getAllBarang(res.idBarang);
                	$('#namaBarang2 option:selected').attr("id");
                	$('#namaBarang2').val(res.namaBarang).trigger('change');                	
                   $('#form-variant2').parsley().reset();
                    $('#modal-variant2').modal('show');
//                    $('namaVariant').val(o.namaVariant2);

                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });


    }, editVariant: function (idKat) {
    	if($('#form-variant2').parsley().validate()){
    		editK=idKat;
    		var selbar = document.getElementById("namaBarang2"); 		// id="selectID" utk select option
            var id1 = selbar.options[selbar.selectedIndex].id;
            
            var myBar = {
            		idBarang : id1,
            		namaBarang: selbar.options[selbar.selectedIndex].value
                    
            }
            
            var hargaBeli=document.getElementById('hargaBeli2').value;
			var hargaJual= document.getElementById('hargaJual2').value;
    		var dataVariant = {
    			idBarang: idKat,
    			barang: myBar,
    			nilai: document.getElementById("nilai2").value,
    			namaVariant: document.getElementById("namaVariant2").value,
    			satuan: document.getElementById("satuan2").value,
    			hargaBeli : hargaBeli,
    			hargaJual : hargaJual,
    			keuntungan:hargaJual-hargaBeli
    		}
    		console.log (dataVariant);
    	}

        $.ajax({
            url: '/api/variant/' + idKat,
            method: 'put',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(dataVariant),
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                	tableVariant.create();
                    $('#modal-variant2').modal('hide');
                    toastr.success('Data berhasil diubah dan disimpan.')
                	

                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });


    }, setDeleteData: function (idBarang) {
        formVariant.resetForm();
        if (confirm("Anda yakin ingin menghapus data ini?")) {
//          var row = $(this).closest("tr");
        
        $.ajax({
          url: '/api/variant/' +idBarang,
          method: 'delete',
//          contentType: 'application/json',
//          dataType: 'json',
//          cache: false,
          success: function (res, status, xhr) {
        	  tableVariant.create();
        	  toastr.success('Data berhasil dihapus.');
//            if (xhr.status ==200 || xhr.status ==201) {
//               tableKategori.create();
//            } else {
//              
//            }
          },
          erorrr: function (xhr, status, err) {
            console.log(err);
            console.log(status);
          }
        })
//        location.reload();
        }
    },
    
};
//dropdown data Barang
var selopBarang = {
	    getAllBarang: function (idAja) {
	    	
	        $.ajax({
	            url: '/api/barang',
 	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	$("#namaBarang").select2();
	                	 var dynamicSelect = document.getElementById("namaBarang");
//	                	 $('#namaBarang').find('option').remove();
	                	 res.forEach(element => {
	                		 var newOption = document.createElement("option")
	                		 newOption.setAttribute("id", element.idBarang);
	                		 newOption.setAttribute("value", element.namaBarang);
	                		 newOption.setAttribute("name", "namaBarang");
	                		 newOption.text = element.namaBarang;
	                		 dynamicSelect.add(newOption);
	                	 });
	                	 console.log(res);
//	                	 var newId = idAja.substring(3);
	                	 if (idAja!=0){
	                		 $("#namaBarang option[id='"+idAja+"']").attr("selected","selected");
	                	 }
	                } else {
	                }
	            },
	            error: function (err) {
	                console.log(err);
	            }
	        });
	    }
};
//dropdown buat edit
var selopBarangEdit = {
	    getAllBarang: function (idAja) {
	    	
	        $.ajax({
	            url: '/api/barang',
 	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	$("#namaBarang2").select2();
	                	 var dynamicSelect = document.getElementById("namaBarang2");
	                	 $('#namaBarang2').find('option').remove();
	                	 res.forEach(element => {
	                		 var newOption = document.createElement("option")
	                		 newOption.setAttribute("id", element.idBarang);
	                		 newOption.setAttribute("value", element.namaBarang);
	                		 newOption.setAttribute("name", "namaBarang");
	                		 newOption.text = element.namaBarang;
	                		 dynamicSelect.add(newOption);
	                	 });
	                	 console.log(res);
//	                	 var newId = idAja.substring(3);
	                	 if (idAja!=0){
	                		 $("#namaBarang2 option[id='"+idAja+"']").attr("selected","selected");
	                	 }
	                } else {
	                }
	            },
	            error: function (err) {
	                console.log(err);
	            }
	        });
	    }
};

