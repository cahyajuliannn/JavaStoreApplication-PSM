//var editK;
//$("#btn-edit-kategori").click(function(){
//	formKategori.editKategori(editK);
//});

//var hapusK;

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
                            	{ console.log(data);
                                    return "<button class='btn btn-primary btn-sm' onclick=formKategori.setEditData('" + data.idKategori + "')><i class='fas fa-edit'></i></button>" +
                                    		"<button class='btn btn-danger btn-sm' onclick=formKategori.setDeleteData('" + data.idKategori + "')><i class='as fa-trash-alt' data-target='#modal-warning'></i></button>"
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

//var formKategori = {
//    resetForm: function () {
//        $('#form-kategori')[0].reset();
//        $('#form-kategori').parsley().reset();
//    },
//    saveForm: function () {
//        if ($('#form-kategori').parsley().validate()) {
//            var dataKategori = {
//            		namaKategori: document.getElementById("namaK").value
//            }
//            console.log(dataKategori);
//        	$.ajax({
//                url: '/api/kategoribarang',
//                method: 'post',
//                contentType: 'application/json',
//                dataType: 'json',
//                data: JSON.stringify(dataKategori),
//                success: function (res, status, xhr) {
//                    if (xhr.status == 200 || xhr.status == 201) {
//                        tableKategori.create();
//                        $('#modal-kategori').modal('show');
//                        toastr.success('Data berhasil ditambahkan dan disimpan.')
//
//
//                    } else {
//
//                    }
//                },
//                erorrr: function (err) {
//                    console.log(err);
//                }
//            });
//        }
//    },setEditData: function (idKat) {
//        formKategori.resetForm();
//        editK = idKat; // new, supaya idCabang bisa dibawa ke fungsi editForm
//
//        $.ajax({
//            url: '/api/kategoribarang/' + idKat,
//            method: 'get',
//            contentType: 'application/json',
//            dataType: 'json',
//            success: function (res, status, xhr) {
////            	console.log(res);
//                if (xhr.status == 200 || xhr.status == 201) {
//                	var o = res;
//                    $('#form-kategori2').fromJSON(JSON.stringify(res));
//                    $('#form-kategori').parsley().reset();
//                    $('#modal-kategori2').modal('show');
//                    $('namaKategori').val(o.namaK2);
//
//                } else {
//
//                }
//            },
//            erorrr: function (err) {
//                console.log(err);
//            }
//        });
//
//
//    }, editKategori: function (idKat) {
//    	if($('#form-kategori2').parsley().validate()){
//    		editK = idKat;
//    		var dataKategori = {
//    			namaKategori: document.getElementById("namaK2").value
//    		}
//    		console.log (dataKategori);
//    	}
//
//        $.ajax({
//            url: '/api/kategoribarang/' + idKat,
//            method: 'put',
//            contentType: 'application/json',
//            dataType: 'json',
//            data: JSON.stringify(dataKategori),
//            success: function (res, status, xhr) {
//                if (xhr.status == 200 || xhr.status == 201) {
//                	tableKategori.create();
//                    $('#modal-kategori2').modal('hide');
//                    toastr.success('Data berhasil diubah dan disimpan.')
//                	
//
//                } else {
//
//                }
//            },
//            erorrr: function (err) {
//                console.log(err);
//            }
//        });
//
//
//    }, setDeleteData: function (idBarang) {
//        formKategori.resetForm();
//        if (confirm("Anda yakin ingin menghapus data ini?")) {
////          var row = $(this).closest("tr");
//        
//        $.ajax({
//          url: '/api/kategoribarang/delete/' +idBarang,
//          method: 'delete',
////          contentType: 'application/json',
////          dataType: 'json',
////          cache: false,
//          success: function (res, status, xhr) {
//        	  tableKategori.create();
//        	  toastr.success('Data berhasil dihapus.');
////            if (xhr.status ==200 || xhr.status ==201) {
////               tableKategori.create();
////            } else {
////              
////            }
//          },
//          erorrr: function (xhr, status, err) {
//            console.log(err);
//            console.log(status);
//          }
//        })
////        location.reload();
//        }
//    },
//    
//};

var idBarang;
var idKB;


// Tabel Barang
var tableBarang = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableBarang')) {
            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
            $('#tableBarang').DataTable().clear();
            $('#tableBarang').DataTable().destroy();
        }

        $.ajax({
            url: '/api/barang/',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableBarang').DataTable({
                        data: res,
                        columns: [
                            {
                                title: "Nama Barang",
                                data: "namaBarang"
                            },
                            {
                                title: "Kategori Barang",
                                data: "namaKategori"
                            },
                            {
                                title: "Nama PT",
                                data: "namaPT"
                            },
//                            {
//                                title: "is deleted",
//                                data: "isDelete"
//                            },
                            {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                    return "<button class='btn btn-primary btn-sm' onclick=formBarang.setEditData('" + data.idBarang + "')><i class='fas fa-edit'></i></button>" +
                                    		"<button class='btn btn-danger btn-sm' onclick=formBarang.setDeleteData('" + data.idBarang + "') data-toggle='modal'><i class='fas fa-trash-alt'></i></button>" +
                                    		"<button class='btn btn-secondary btn-sm' onclick=tableVariant.showVariant('" + data.idBarang + "') data-toggle='modal'><i class='fas fa-info-circle'></i></button>"
                                            
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

// Dynamic Table of Item per Kategori Barang
var tableBarangKat = {
	    create: function (idKategori) {
	    	
	        // jika table tersebut datatable, maka clear and dostroy
	        if ($.fn.DataTable.isDataTable('#tableBarangKat')) {
	            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
	            $('#tableBarangKat').DataTable().clear();
	            $('#tableBarangKat').DataTable().destroy();
	        }
//	        var daTADEL = {
//	      			ISDELETE : "TRUE"
//	      	}

	        $.ajax({
	            url: '/api/barang/kb/isdeleted/' + idKategori,
	            method: 'get',
	            contentType: 'application/json',
//	            dataType: 'json',
//	            data: JSON.stringify(dataDel),
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
//	                	console.log(res);
	                    $('#tableBarangKat').DataTable({
	                        data: res,
	                        columns: [
	                        	{
	                                title: "Nama Barang",
	                                data: "namaBarang"
	                            },
	                            {
	                                title: "Info",
	                                data: null,
	                                render: function (data, type, row) {
	                                    return "<button class='btn btn-block btn-outline-warning btn-sm' onclick=tableVariantKat.showVariant('" + data.idBarang + "') data-toggle='modal'><i class='fas fa-info-circle'></i> Detail</button>"
	                                            
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
};
var tableVariantKat = {
		showVariant: function(idBarang) {
//			selDist = idCabang;	// utk dibawa ke id di selopDist(selDist) supaya lgsg terpilih
			
			if ($.fn.DataTable.isDataTable('#tableVariant')) {
	            $('#tableVariant').DataTable().clear();
	            $('#tableVariant').DataTable().destroy();
	        }
			
			$("#modal-variant").modal("show");
			
			$.ajax({
				url: '/api/variant/barang/barangs?id_barang=' + idBarang,
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
};
// Fungsi Dynamic Card Kategori Barang
function createShopCard(namaKategori, idKategori, btnColor) {
	$.ajax({
	    url: '/api/barang/kb/isdeleted/' + idKategori,
	    method: 'get',
	    contentType: 'application/json',
	    dataType: 'json',
	    success: function (res, status, xhr) {
	        if (xhr.status == 200 || xhr.status == 201) {
	        	var colDiv = document.createElement('div');
	      	  colDiv.className = 'col-lg-3 col-6';

	      	  var smallBoxDiv = document.createElement('div');
	      	  smallBoxDiv.className = 'small-box bg-' + btnColor;

	      	  var iconDiv = document.createElement('div');
	      	  iconDiv.className = 'icon';

	      	  var icon = document.createElement('i');
	      	  icon.className = 'fas fa-shopping-cart';

	      	  var inner = document.createElement('div');
	      	  inner.className = 'inner';

	      	  var innerH3 = document.createElement('h3');
	      	  innerH3.textContent = namaKategori;

	      	  var innerP = document.createElement('p');
	      	  innerP.textContent = res.length+" Item";
	      	  
	      	  var footer = document.createElement('a');
	      	  footer.className = 'small-box-footer';
	      	  footer.id = idKategori;
	      	  footer.name = "btn-add-barang";
	      	  footer.href = "/barangs?idKategori=" + idKategori + "&namaKategori=" + namaKategori; // setiap button pada card membawa parameter untuk ke halaman barangs.html
	      	  footer.textContent = 'List '+ namaKategori+"   ";

	      	  var footerBtn = document.createElement('i');
	      	  footerBtn.className = 'fa fa-bookmark';
	      	  footer.appendChild(footerBtn);

	      	  inner.appendChild(innerH3);
	      	  inner.appendChild(innerP); // sebagai jumlah dari barang perkategorinya

	      	  smallBoxDiv.appendChild(iconDiv).appendChild(icon);
	      	  smallBoxDiv.appendChild(inner)
	      	  smallBoxDiv.appendChild(footer);
	      	  document.getElementById("create-card").appendChild(colDiv).appendChild(smallBoxDiv);
	      	  

	        } else {

	        }
	    },
	    error: function (err) {
	        console.log(err);
	    }
	});
	  
	};
	
var infoBox = {
		createBox: function(){
						
			$.ajax({
			    url: '/api/kategoribarang/',
			    method: 'get',
			    contentType: 'application/json',
			    dataType: 'json',
			    success: function (res, status, xhr) {
			        if (xhr.status == 200 || xhr.status == 201) {
//			        	$('#create-card').find('div').remove();
			        	console.log(res);
			        	document.getElementById("create-card").innerHTML = "";
			        	
			        	var cardColor = ["red","yellow", "green", "blue", "pink", "purple", "orange", "white"];
						var i=0;
			        	res.forEach(element => {
			        		createShopCard(element.namaKategori, element.idKategori, cardColor[i%8]);
			        		i++;
			        	});
	
			        } else {

			        }
			    },
			    error: function (err) {
			        console.log(err);
			    }
			});
			
		}
};


// dropdown data kategori barang
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
//	                	console.log(res);
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

// form data barang
var formBarang = {
    resetForm: function () {
        $('#form-barang')[0].reset();
    },
    saveForm: function (idKB) {
        if ($('#form-barang').parsley().validate()) {
        	console.log(idKB);
//        	var idKB =  document.getElementById("btn-add-barang").name;
            var e = document.getElementById("namaPT");
            var id = e.options[e.selectedIndex].id;
            var myKategoriBarang = {
            		idKategori : idKB
            };
        	var myDistributor = {
        			distID : id		
        	};
            var hargaBeli= document.getElementById("hargaBeli").value;
			var hargaJual= document.getElementById("hargaJual").value;
        	var barang = {
        			namaBarang: document.getElementById("namaBarang").value,
        			hargaBeli: hargaBeli,
        			hargaJual: hargaJual,
        			keuntungan: hargaJual-hargaBeli,
        			kategoriBarang: myKategoriBarang,
        			distributor: myDistributor
        	};
        	console.log(barang);
            $.ajax({
                url: '/api/barang',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(barang),
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableBarang.create();
                        window.location.href = '/newIndex2';
                        
                    } else {

                    }
                },
                erorrr: function (err) {
                    console.log(err);
                }
            });
        }
    },
    setDeleteData: function (idBarang) {
//      formVariant.resetForm(); 
  	var dataDel = {
  			isDelete : "true"
  	}
      if (confirm("Anda yakin ingin menghapus data ini?")) {
      
      $.ajax({
        url: '/api/barang/isdeleted/' +idBarang,
        method: 'post',
        contentType: 'application/json',
        dataType: 'json',
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
//      location.reload();
      }
  }, 
//    setDeleteId: function (idDelete) {
//    	idBarang = idDelete;
//    	$('#modal-deleting').modal('show');
//    	console.log(idDelete);
//    },
    setEditData: function (idCabang) {
        formBarang.resetForm();
        $('#form-barang').parsley().reset();
        idBarang = idCabang;
        $.ajax({
            url: '/api/barang/' + idCabang,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
//                    $('#form-biodata').fromJSON(JSON.stringify(res));

                    $('#namaPT').find('option').remove();
                    $('#namaKategori').find('option').remove();
                	selopDistributor.getAllDistributor(res.distID);
                	selopKategori.getAllKategori(res.idKategori);
        		    $("#namaBarang").val(res.namaBarang);
        		    $("#hargaBeli").val(res.hargaBeli);
        		    $("#hargaJual").val(res.hargaJual);
//        		    $("input[name=customRadio][value=" + res.namaKategoriBarang + "]").attr('checked', 'checked');  		    
                    $('#modal-barang').modal('show');
                    console.log(res);
                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });
    },
    deleteData: function (idCabang) {
        $.ajax({
            url: '/api/barang/' + idCabang,
            method: 'delete',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                	console.log(res);
                	tableBarang.create();
                	
                	$('#modal-deleting').modal('hide')
                	infoBox.createBox();
                	$('#namaKategori').find('option').remove();
                	$('#namaPT').find('option').remove();
                } else {
                	
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    },
    editForm: function (idCabang) {
    	idBarang = idCabang;
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
//
// 			var hargaBeli= document.getElementById("hargaBeli").value;
// 			var hargaJual= document.getElementById("hargaJual").value;
         	
         	var barang = {
         			namaBarang: document.getElementById("namaBarang").value,
//         			keuntungan: hargaJual-hargaBeli,
         			kategoriBarang: myKategoriBarang,
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
                        toastr.success('Data berhasil diubah dan disimpan.')
                    } else {

                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    }
};
