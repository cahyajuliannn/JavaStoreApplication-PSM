
var nomorRow = 0;
var kategori = [];
var row = null;


$("#namaPT").select2();
$("#namaKategori").select2();

document.onkeypress = function (e) {
    // use e.keyCode
	modalBarStatus = $('#modal-barang').hasClass('in')
	if(modalBarStatus = true && e.keyCode == 13){
		$('#btn-save-barang').click()
	}	
};

$('#btn-save-barang').click(function() {
	
	jumlahRowBaru = $('#tableSementara').find('.rowB').length;
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
	        $('#form-barang')[0].reset();
	        $('#form-barang').parsley().reset();
	        $('#tableSementara').DataTable().clear();
	        $('#tableSementara').DataTable().destroy();
	    }, saveForm: function (e) {
	    	console.log(JSON.stringify(kategori))
	    	$.ajax({
	        url: '/api/barang/postList',
	        method: 'post',
	        contentType: 'application/json',
	        dataType: 'json',
	        data: JSON.stringify(kategori),
	        success: function (res, status, xhr) {
	            if (xhr.status == 200 || xhr.status == 201) {
	                tableBarang.create();
	                $('#modal-barang').modal('show')
	                toastr.success("Sukses. Silakan check kemabil di detail barang.")
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


// KHUSUS UNTUK KATEGORI BARANG
var editK;
$("#btn-edit-kategori").click(function(){
	formKategori.editKategori(editK);
});

//Menampilkan Kategori Barang
var tableKategori = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableKategori')) {
            // table yg sudah dibentuk menjadi datatable harus d rebuild lagi
			// untuk di instantiasi ulang
            $('#tableKategori').DataTable().clear();
            $('#tableKategori').DataTable().destroy();
        }

        $.ajax({
            url: '/api/kategoribarang',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableKategori').DataTable({
                        data: res,
                        columns: [
                        	{title: "ID", data: "idKategori"},
                            {title: "Nama Kategori", data: "namaKategori"},
                            {title: "Action", data: null, render: function (data, type, row) 
                            	{
                                    return "<button class='btn btn-primary btn-sm' onclick=formKategori.setEditData('" + data.idKategori + "')><i class='fas fa-edit'></i></button>" +                         		
                                    "<button class='btn btn-danger btn-sm' onclick=formKategori.setDeleteData('" + data.idKategori + "')><i class='fas fa-trash-alt'data-target='#modal-warning'></i></button>"
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
var formKategori = {
	    resetForm: function () {
	        $('#form-kategori')[0].reset();
	        $('#form-kategori').parsley().reset();
	    },
	    saveForm: function () {
	        if ($('#form-kategori').parsley().validate()) {
	            var dataKategori = {
	            		namaKategori: document.getElementById("namaK").value
	            }
	            console.log(dataKategori);
	        	$.ajax({
	                url: '/api/kategoribarang',
	                method: 'post',
	                contentType: 'application/json',
	                dataType: 'json',
	                data: JSON.stringify(dataKategori),
	                success: function (res, status, xhr) {
	                    if (xhr.status == 200 || xhr.status == 201) {
	                        tableKategori.create();
	                        selopKategori.getAllKategori();
	                        $('#modal-kategori').modal('show');


	                    } else {

	                    }
	                },
	                erorrr: function (err) {
	                    console.log(err);
	                }
	            });
	        }
	    },
	    editKategori: function (idKat) {
	    	if($('#form-kategori2').parsley().validate()){
	    		editK = idKat;
	    		var dataKategori = {
	    			namaKategori: document.getElementById("namaK2").value
	    		}
	    		console.log (dataKategori);
	    	}

	        $.ajax({
	            url: '/api/kategoribarang/' + idKat,
	            method: 'put',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(dataKategori),
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	tableKategori.create();
	                    $('#modal-kategori2').modal('hide');
	                    toastr.success('Data berhasil diubah dan disimpan.')
	                	

	                } else {

	                }
	            },
	            erorrr: function (err) {
	                console.log(err);
	            }
	        });


	    }, 
	    setEditData: function (idKat) {
	        formKategori.resetForm();
	        editK = idKat; // new, supaya idCabang bisa dibawa ke fungsi editForm

	        $.ajax({
	            url: '/api/kategoribarang/id?id_kategori=' + idKat,
	            method: 'get',
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (res, status, xhr) {
	            	console.log(res);
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#form-kategori2').fromJSON(JSON.stringify(res));
	                    $('#form-kategori2').parsley().reset();
	                    $('#namaK2').val(res.namaKategori);
	                    $('#modal-kategori2').modal('show');
	                    
	                    

	                } else {

	                }
	            },
	            erorrr: function (err) {
	                console.log(err);
	            }
	        });


	    }, setDeleteData: function (idBarang) {
	        formKategori.resetForm();
	        if (confirm("Anda yakin ingin menghapus data ini?")) {	        
	        $.ajax({
	          url: '/api/kategoribarang/delete/' +idBarang,
	          method: 'delete',
	          success: function (res, status, xhr) {
	        	  tableKategori.create();
	        	  toastr.success('Data berhasil dihapus.');
	          },
	          erorrr: function (xhr, status, err) {
	            console.log(err);
	            console.log(status);
	          }
	        })
	        }
	    }
};

//KHUSUS UNTUK BARANG
//dropdown data kategori barang
var selopKategori = {
	    getAllKategori: function (idAja) {
	    	
	        $.ajax({
	            url: '/api/kategoribarang',
 	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	console.log(res);
	                	 var dynamicSelect = document.getElementById("namaKategori");
	                	 $("#namaKategori").find("option").remove();
	                	
	                	 res.forEach(element => {
	                		 var newOption = document.createElement("option")
	                		 newOption.setAttribute("id", element.idKategori);
	                		 newOption.setAttribute("value", element.namaKategori);
	                		 newOption.setAttribute("name", "namaKategori");
	                		 newOption.text = element.namaKategori;
	                		 dynamicSelect.add(newOption);
	                	
	                	 });
	                	 console.log(res);
	                	 if (idAja>0){
	                		 $("#namaKategori option[id='"+idAja+"']").attr("selected","selected");
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

//dropdown data distributor
var selopDistributor = {
	    getAllDistributor: function (idAja) {
	    	
	        $.ajax({
	            url: '/api/ref-dist',
 	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	 var dynamicSelect = document.getElementById("namaPT");
	                	 $('#namaPT').find('option').remove();
	                	 res.forEach(element => {
	                		 var newOption = document.createElement("option")
	                		 newOption.setAttribute("id", element.distID);
	                		 newOption.setAttribute("value", element.namaPT);
	                		 newOption.setAttribute("name", "namaPT");
	                		 newOption.text = element.namaPT;
	                		 dynamicSelect.add(newOption);
	                	 });
	                	 console.log(res);
//	                	 var newId = idAja.substring(3);
	                	 if (idAja>0){
	                		 $("#namaPT option[id='"+idAja+"']").attr("selected","selected");
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

var idBarang;
//Tabel Barang
var tableBarang = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableBarang')) {
            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
            $('#tableBarang').DataTable().clear();
            $('#tableBarang').DataTable().destroy();
        }

        $.ajax({
            url: '/api/barang',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableBarang').DataTable({
                        data: res,
                        columns: [
                            {title: "Nama Barang", data: "namaBarang"},
                            {title: "Kategori Barang",data: "namaKategori"},
                            {title: "Nama PT", data: "namaPT"},
                            {title: "Variant", data: null, render: function (data, type, row) {                                	
                                    return 	"<button class='btn btn-secondary btn-sm' onclick=tableVariant.showVariant('" + data.idBarang +"')><i class='fas fa-info-circle'></i></button>"
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

//form data barang
var idKB;
var formBarang = {
    resetForm: function () {
        $('#form-barang')[0].reset();
    },
    saveForm: function () {
        if ($('#form-barang').parsley().validate()) {
            var e = document.getElementById("namaPT");
            var id = e.options[e.selectedIndex].id;
            var e2 = document.getElementById("namaKategori");
            var id2 = e2.options[e2.selectedIndex].id;
            var myKategoriBarang = {
            		idKategori : id2
            };
        	var myDistributor = {
        			distID : id		
        	};
        	var barang = {
        			namaBarang: document.getElementById("namaBarang").value,
        			kategoriBarang: myKategoriBarang,
        			distributor: myDistributor
        	};
        	console.log(barang);
            $.ajax({
                url: '/api/barang/',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(barang),
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableBarang.create();
//                        $('#modal-kategori').modal('hide');
                        toastr.success('Data Anda berhasil ditambahkan dan disimpan.');

//                        window.location.href = '/barangs';
                        
                    } else {

                    }
                },
                erorrr: function (err) {
                    console.log(err);
                }
            });
        }
    },    
    setEditData: function (idCabang) {
        formBarang.resetForm();
//        $('#form-barang2').parsley().reset();
        idBarang = idCabang;
        $.ajax({
            url: '/api/barang/' + idCabang,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                	
//                    $('#form-barang2').fromJSON(JSON.stringify(res));

                    $('#namaPT').find('option').remove();
                    $('#namaKategori').find('option').remove();
                	selopDistributor.getAllDistributor(res.distID);
                	selopKategori.getAllKategori(res.idKategori);
        		    $("#namaBarang2").val(res.namaBarang);
        		    $("#hargaBeli2").val(res.hargaBeli);
        		    $("#hargaJual2").val(res.hargaJual);		    
                    $('#modal-barang2').modal('show');
                    console.log(res);
                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });
    }, 
    editForm: function (idCabang) {
//    	idBarang = idCabang;
        if ($('#form-barang').parsley().validate()) {
        	 var e = document.getElementById("namaPT");
             var id = e.options[e.selectedIndex].id;
             var myDistributor = {
            		 distID : id
             		
             };
            var e2 = document.getElementById("namaKategori");
            var id2 = e2.options[e2.selectedIndex].id;
         	var myKategoriBarang = {
         			idKategori : id2
         	};
         	var dataDel = {
        			isDelete : "false"
        	};
         	var hargaBeli= document.getElementById("hargaBeli").value;
 			var hargaJual= document.getElementById("hargaJual").value;
         	
         	var barang = {
         			namaBarang: document.getElementById("namaBarang").value,
         			
         			keuntungan: hargaJual-hargaBeli,
         			kategoriBarang: myKategoriBarang,
         			isDelete:datadel,
         			distributor: myDistributor
        	};
        	console.log(barang);
            $.ajax({
                url: '/api/barang/'+ idCabang,
                method: 'put',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(barang),
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableBarang.create();                        
                        $('#modal-barang').modal('hide')
                        $('#namaPT').find('option').remove();
                        $('#namaKategori').find('option').remove();
                        infoBox.createBox();
                        $('#namaPT').find('option').remove();
                    } else {

                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    },
    setDeleteData: function (idBarang) {
//        formVariant.resetForm();
    	var dataDel = {
    			isDelete : "true"
    	}
        if (confirm("Anda yakin ingin menghapus data ini?")) {
        
        $.ajax({
          url: '/api/barang/isdeleted/' +idBarang,
          method: 'post',
          data: JSON.stringify(dataDel),
          success: function (res, status, xhr) {
        	  tableBarang.create();
        	  toastr.success('Data berhasil dihapus.');

          },
          erorrr: function (xhr, status, err) {
            console.log(err);
            console.log(status);
          }
        })
//        location.reload();
        }
    },
    setDeleteId: function (idDelete) {
    	idBarang = idDelete;
    	$('#modal-deleting').modal('show');
    	console.log(idDelete);
    },
    saveAll: function (){
    	$.ajax({
            url: '/api/barang/all',
            method: 'post',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(kategori),
            success: function (res, status, xhr) {
            	console.log(res)
                if (xhr.status == 200 || xhr.status == 201) {
                	$('#modal-barang').modal('show');
//                    tableBarang.create();
//                    toastr.success('Data Anda berhasil ditambahkan dan disimpan. Silakan periksa detail barang di atas');


                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        })
   },    
   
   

};

//var selDist;

var tableVariant = {
		showVariant: function(idBarang) {
//			selDist = idCabang;	// utk dibawa ke id di selopDist(selDist) supaya lgsg terpilih
			
			if ($.fn.DataTable.isDataTable('#tableVariant')) {
	            $('#tableVariant').DataTable().clear();
	            $('#tableVariant').DataTable().destroy();
	        }
			
			$("#modal-variant").modal("show");
			
			$.ajax({
				url: '/api/variant/barang/barang?id_barang=' + idBarang,
				method: 'get',
				contentType: 'application/json',
	            dataType: 'json',
				success: function (res, status, xhr) {
	            	
	                if (xhr.status == 200 || xhr.status == 201) {
//	                	console.log("distrib selected=",res[0].distributor.namaPT);
	                	$('#tableVariant').DataTable({
	                        data: res,
	                        columns: [
	                        	{title: "ID", data: "idVariant"},
	                        	{title: "Nama Variant", data: "namaVariant"},
//	                        	{title: "Nama Barang", data: "namaBarang"},
	                            {title: "Nilai", data: "nilai"},
	                            {title: "Satuan", data: "satuan"},
	                            {title: "Harga Beli", data: "hargaBeli"},
	                            {title: "Harga Jual", data: "hargaJual"},
	                            {title: "Keuntungan", data: "keuntungan"},
	                        ]
	                	
	                	});
	                	
	                } else {

	                }
	            },
	            error: function (xhr, status, error) {
	                console.log(status);
	            }
			})
		}
}
