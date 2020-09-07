//$("#idKate").select2();
var idEdit;
	$("#btn-edit-barang").click(function(){
		formBarang.editBarang(idEdit);
	});
	

var tableBarang = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableBarang')) {
            // table yg sudah dibentuk menjadi datatable harus d rebuild lagi
			// untuk di instantiasi ulang
            $('#tableBarang').DataTable().clear();
            $('#tableBarang').DataTable().destroy();
        }

        $.ajax({
            url: '/api/barang',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
//                	console.log(res);
                    $('#tableBarang').DataTable({
                        data: res,
                        columns: [
                        	{title: "ID", data: "idBarang"},
                            {title: "Nama Barang", data: "namaBarang"},
                            {title: "Harga Beli", data: "hargaBeli"},
                            {title: "Harga Jual", data: "hargaJual"},
                            {title: "ID Kategori", data: "idKategori"},
                            {title: "ID Distributor", data: "distID"},
                            {title: "Nama PT", data: "namaPT"},
                            {title: "Nama Kategori", data: "namaKategori"},
                            {title: "Action", data: null, render: function (data, type, row) 
                            	{
                                    return "<button class='btn-primary' onclick=formBarang.setEditData('" + data.idBarang + "')>Edit</button>" +
                                    		"<button class='btn-danger' onclick=formBarang.setDeleteData('" + data.idBarang + "')><i class='fa fa-fw fa-trash' data-target='#modal-warning'></i></button>" 
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
var tableLaptop = {
	    create: function () {
	        // jika table tersebut datatable, maka clear and dostroy
	        if ($.fn.DataTable.isDataTable('#tableLapto')) {
	            // table yg sudah dibentuk menjadi datatable harus d rebuild lagi
				// untuk di instantiasi ulang
	            $('#tableLaptop').DataTable().clear();
	            $('#tableLaptop').DataTable().destroy();
	        }

	        $.ajax({
	            url: '/api/barang/kb/K_1',
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	console.log(res);
	                    $('#tableLaptop').DataTable({
	                        data: res,
	                        columns: [
	                            {title: "Nama Barang", data: "namaBarang"},
	                            {title: "Harga", data: "hargaJual"},
	                            {title: "Beli", data: null, render: function (data, type, row) 
	                            	{
	                                    return "<butoon class='btn-warning'><a href='https://cms.syariahmandiri.co.id/cms/login.html'><i class='fa fa-fw  fa-credit-card'></i></a></button>"
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
var tableMakanan = {
	    create: function () {
	        // jika table tersebut datatable, maka clear and dostroy
	        if ($.fn.DataTable.isDataTable('#tableMakanan')) {
	            // table yg sudah dibentuk menjadi datatable harus d rebuild lagi
				// untuk di instantiasi ulang
	            $('#tableMakanan').DataTable().clear();
	            $('#tableMakanan').DataTable().destroy();
	        }

	        $.ajax({
	            url: '/api/barang' + idKategori,
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	console.log(res);
	                    $('#tableLaptop').DataTable({
	                        data: res,
	                        columns: [
	                            {title: "Nama Makanan", data: "namaBarang"},
	                            {title: "Harga", data: "hargaJual"},
	                            {title: "Beli", data: null, render: function (data, type, row) 
	                            	{
	                                    return "<butoon class='btn-warning'><a href='https://cms.syariahmandiri.co.id/cms/login.html'><i class='fa fa-fw  fa-credit-card'></i></a></button>"
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

var tableBuku = {
	    create: function () {
	        // jika table tersebut datatable, maka clear and dostroy
	        if ($.fn.DataTable.isDataTable('#tableBuku')) {
	            // table yg sudah dibentuk menjadi datatable harus d rebuild lagi
				// untuk di instantiasi ulang
	            $('#tableBuku').DataTable().clear();
	            $('#tableBuku').DataTable().destroy();
	        }

	        $.ajax({
	            url: '/api/barang/kb/K_2',
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	console.log(res);
	                    $('#tableBuku').DataTable({
	                        data: res,
	                        columns: [
	                            {title: "Nama Buku", data: "namaBarang"},
	                            {title: "Harga", data: "hargaJual"},
	                            {title: "Beli", data: null, render: function (data, type, row) 
	                            	{
	                                    return "<butoon class='btn-default'><a href='https://cms.syariahmandiri.co.id/cms/login.html'><i class='fa fa-fw  fa-credit-card'></i></a></button>"
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
var tableOlahraga = {
	    create: function () {
	        // jika table tersebut datatable, maka clear and dostroy
	        if ($.fn.DataTable.isDataTable('#tableOlahraga')) {
	            // table yg sudah dibentuk menjadi datatable harus d rebuild lagi
				// untuk di instantiasi ulang
	            $('#tableOlahraga').DataTable().clear();
	            $('#tableOlahraga').DataTable().destroy();
	        }

	        $.ajax({
	            url: '/api/barang/kb/K_3',
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	console.log(res);
	                    $('#tableOlahraga').DataTable({
	                        data: res,
	                        columns: [
	                            {title: "Nama Barang", data: "namaBarang"},
	                            {title: "Harga Jual", data: "hargaJual"},
	                            {title: "Beli", data: null, render: function (data, type, row) 
	                            	{
	                                    return "<butoon class='btn-warning'><a href='https://cms.syariahmandiri.co.id/cms/login.html'><i class='fa fa-fw  fa-credit-card'></i></a></button>"
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

var formBarang = {
    resetForm: function () {
        $('#form-barang')[0].reset();
        
    },
    saveForm: function () {
        if ($('#form-barang').parsley().validate()) {
//            var dataResult = getJsonForm($("#form-barang").serializeArray(), true);
//        	console.log(dataResult)
           
        	var myKategoriBarang = {
        			idKategori: document.getElementById("idKate").value
        	}
        	var myDistributor = {
        			distID: document.getElementById("idDist").value,
        	}
        	var dataBarang = {
        			namaBarang: document.getElementById("name").value,
        			hargaBeli: document.getElementById("hbeli").value,
        			hargaJual: document.getElementById("hjual").value,
        			kategoriBarang : myKategoriBarang,
        			distributor : myDistributor
        			
        	}
        	console.log(dataBarang);
            $.ajax({
                url: '/api/barang',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataBarang),
                success: function (res, status, xhr) {
                	console.log(res)
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableBarang.create();
                        $('#modal-barang').modal('hide');
                        toastr.success('Data Anda berhasil ditambahkan dan disimpan.');


                    } else {

                    }
                },
                erorrr: function (err) {
                    console.log(err);
                }
            })
//            location.reload();
        }
    }, setEditData: function (idAja) {
        formBarang.resetForm();
        idEdit = idAja; //new

        $.ajax({
            url: '/api/barang/' + idAja,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
            	console.log(res);
                if (xhr.status == 200 || xhr.status == 201) {
                	
                	var o = res;
                    $('#form-barang2').fromJSON(JSON.stringify(res));
                    $('#form-barang').parsley().reset();	// pasrley reset taronya sebelum modal show
                    $('#modal-barang2').modal('show');
                    $('#namaBarang').val(o.namaBarang);
                    $('#hargaBeli').val(o.hargaBeli);
                    $('#hargaJual').val(o.hargaJual);
                    $('#distID').val(o.distID);
                    $('#mySelect').val(o.distID).trigger('change');;
                    $('#idKategori').val(o.idKategori);

                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });


    }, editBarang: function (idKategori) {
    	if ($('#form-barang2').parsley().validate()){

        	var myKategoriBarang2 = {
        			idKategori: document.getElementById("idKate2").value
        	}
        	var myDistributor2 = {
        			distID: document.getElementById("idDist2").value,
        	}
    		var barangEdit = {
    				namaBarang: document.getElementById("name2").value,
    				hargaBeli: document.getElementById("hbeli2").value,
    				hargaJual: document.getElementById("hjual2").value,
    				kategoriBarang : myKategoriBarang2,
        			distributor : myDistributor2
//    		}
        	
//        	var barangEdit = {
//    				namaBarang: document.getElementById("name2").value,
//    				hargaBeli: document.getElementById("hbeli2").value,
//    				hargaJual: document.getElementById("hjual2").value,
//    				idKategori: document.getElementById("idKate2").value,
//    				distID: document.getElementById("idDist2").value
    		}
    		console.log(barangEdit);
    	}

        $.ajax({
            url: '/api/barang/'+idKategori,
            method: 'put',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(barangEdit),	
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                	tableBarang.create();
                	 $('#form-barang').parsley().reset();
                    $('#modal-barang2').modal('hide');
                    toastr.success('Data berhasil diubah dan disimpan.')
                	

                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });


    },
    setDeleteData: function (idBarang) {
        formBarang.resetForm();
        if (confirm("Anda yakin ingin menghapus data ini?")) {
//          var row = $(this).closest("tr");
        
        $.ajax({
          url: '/api/barang/delete/' +idBarang,
          method: 'delete',
//          contentType: 'application/json',
//          dataType: 'json',
//          cache: false,
          success: function (res, status, xhr) {
        	  tableBarang.create();
        	  toastr.success('Data berhasil dihapus.');
//            if (xhr.status ==200 || xhr.status ==201) {
//            	toastr.success('Data berhasil dihapus.');
//               row.remove();
//               
//            } else {
//              
//            }
          },
          erorrr: function (xhr, status, error) {
            console.log(error);
            console.log(status);
          }
        })
//        location.reload();
        }
    },
    
};

var populateCombo = {
		getAllBarang: function (idSel) {
			$.ajax({
				url: '/api/ref-dist',
				method: 'get',
				contentType: 'application/json',
				dataType: 'json',
				success: function (res, status, xhr) {
					if(xhr.status == 200 || xhr.status == 201){
						$("#idDist").select2();
						var dynamicSelect = document.getElementById("idDist");
//					
						res.forEach(element => {
						
							var newOption = document.createElement("option");
							newOption.setAttribute("id", element.distID);		
							newOption.text = element.distID;
							dynamicSelect.add(newOption);
					
					});
						if (idSel != 0){
							$("#idDist option[id='"+idSel+"']").attr("selected","selected");
						}
					}
				},
				erorrr: function (err) {
	                console.log(err);
					}
			
		});
	}
}

var populateCombo2 = {
		getAllNamaKategori: function (idSel) {
			$.ajax({
				url: '/api/kategoribarang',
				method: 'get',
				contentType: 'application/json',
				dataType: 'json',
				success: function (res, status, xhr) {
					if(xhr.status == 200 || xhr.status == 201){
						$("#idKate").select2();
						var dynamicSelect = document.getElementById("idKate");
//					
						res.forEach(element => {
						
							var newOption = document.createElement("option");
							newOption.setAttribute("id", element.idKategori);		
							newOption.text = element.idKategori;
							dynamicSelect.add(newOption);
					
					});
						if (idSel != 0){
							$("#idKate option[id='"+idSel+"']").attr("selected","selected");
						}
					}
				},
				erorrr: function (err) {
	                console.log(err);
					}
			
		});
	}
}

var populateCombo3 = {
		getAllNamaKategori2: function (idSel) {
			$.ajax({
				url: '/api/kategoribarang',
				method: 'get',
				contentType: 'application/json',
				dataType: 'json',
				success: function (res, status, xhr) {
					if(xhr.status == 200 || xhr.status == 201){
						$("#idKate2").select2();
						var dynamicSelect = document.getElementById("idKate2");
//					
						res.forEach(element => {
						
							var newOption = document.createElement("option");
							newOption.setAttribute("id", element.idKategori);		
							newOption.text = element.idKategori;
							dynamicSelect.add(newOption);
					
					});
						if (idSel != 0){
							$("#idKate2 option[id='"+idSel+"']").attr("selected","selected");
						}
					}
				},
				erorrr: function (err) {
	                console.log(err);
					}
			
		});
	}
}
var populateCombo4 = {
		getAllDistributor2: function (idSel) {
			$.ajax({
				url: '/api/ref-dist',
				method: 'get',
				contentType: 'application/json',
				dataType: 'json',
				success: function (res, status, xhr) {
					if(xhr.status == 200 || xhr.status == 201){
						$("#idDist2").select2();
						var dynamicSelect = document.getElementById("idDist2");
//					
						res.forEach(element => {
						
							var newOption = document.createElement("option");
							newOption.setAttribute("id", element.distID);		
							newOption.text = element.distID;
							dynamicSelect.add(newOption);
					
					});
						if (idSel != 0){
							$("#idDist2 option[id='"+idSel+"']").attr("selected","selected");
						}
					}
				},
				erorrr: function (err) {
	                console.log(err);
					}
			
		});
	}
}
	
