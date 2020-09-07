var idEdit;
$("#btn-update-toko").click(function () {
	formToko.editForm(idEdit);
});

var idDelete;


	
var tableToko = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableToko')) {
//            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
            $('#tableToko').DataTable().clear();
            $('#tableToko').DataTable().destroy();
        }

        $.ajax({
            url: '/api/toko',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
            	console.log("res",res)
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableToko').DataTable({
                        data: res,
                        columns: [
                            {
                                title: "Id Toko",
                                data: "idToko"
                            },
                            {
                                title: "Nama Toko",
                                data: "namaToko"
                            },
                            {
                            	title: "Alamat Toko",
                            	data : "alamatToko"
                            },
                            {
                            	title: "NPWP",
                            	data : "npwp"
                            },
                            {
                            	title: "Deskripsi",
                            	data : "deskripsi"
                            },
//                            {
//                            	title: "Jumlah Cabang",
//                            	data : "jumlahCabang"
//                            },
//                            {
//                            	title: "Jumlah Cabang Aktif",
//                            	data : "cabangAktif"
//                            },
//                            {
//                            	title: "Jumlah Cabang Non Aktif",
//                            	data : "cabangTidakAktif"
//                            },
                            {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                   return  "<button class='btn btn-primary' onclick=formToko.setEditData('" + data.idToko + "')><i class='fas fa-edit'></i></button>&emsp;" +
                                   		"<button id = 'warning' data_id = 'aaa' class='btn btn-danger' onclick=formToko.deleteData('" + data.idToko + "') data-toggle='modal' data-target='#modal-warning'><i class='fas fa-trash-alt'></i></button>"
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

//
//tambah
var tableBiodatalihat = {
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


var tableBank = {
	    create: function () {
	        // jika table tersebut datatable, maka clear and dostroy
	        if ($.fn.DataTable.isDataTable('#tableBank')) {
//	            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
	            $('#tableBank').DataTable().clear();
	            $('#tableBank').DataTable().destroy();
	        }

	        $.ajax({
	            url: '/api/cabang',
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	            	console.log("res",res)
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#tableBank').DataTable({
	                        data: res,
	                        columns: [
	                        	{
	                                title: "Nama Cabang",
	                                data: "namaCabang"
	                            },
	                            {
	                                title: "Id Akun",
	                                data: "idAkun"
	                            },
	                            {
	                                title: "Alamat Cabang",
	                                data: "alamatCabang"
	                            },
	                            {
	                                title: "Nomor Rekening",
	                                data: "noRekening"
	                            },
	                            {
	                                title: "Nama Bank",
	                                data: "namaBank"
	                            },
	                           
	                           
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


//batas



var formToko = {
    resetForm: function () {
        $('#formToko')[0].reset();
    },
    saveForm: function () {
        if ($('#formToko').parsley().validate()) {
         
          var dataResult = getJsonForm($("#formToko").serializeArray(), true);
          console.log("dataResult",dataResult)   
          var dataget = {

          		namaToko : document.getElementById("namaToko").value,
          		alamatToko : document.getElementById("alamatToko").value,
          		npwp : document.getElementById("npwp").value,
          		deskripsi : document.getElementById("deskripsi").value,
          };
          console.log(JSON.stringify(dataget));
            
            
            $.ajax({
                url: '/api/toko',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataget),
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableToko.create();
                        $('#modal-toko').modal('hide')
                        toastr.success('Toko telah berhasil ditambahkan.')

                    } else {

                    }
                },
                erorrr: function (err) {
                    console.log(err);
                }
            });
        }
    }, setEditData: function (idCabang) {
        $('#modal-toko2').modal('show')
        idEdit = idCabang
        $.ajax({
            url: '/api/toko/' + idCabang,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
//                    $('#formToko2').fromJSON(JSON.stringify(res));
                	var obj = res;
//                    $('#modal-toko2').modal('show');
                    $('#namaToko-edit').val(obj.namaToko);
                    $('#alamatToko-edit').val(obj.alamatToko);
                    $('#npwp-edit').val(obj.npwp);
                    $('#deskripsi-edit').val(obj.deskripsi);

                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });
        
        
    }, editForm : function(idCabang){
    	if ($('#formToko2').parsley().validate()) {
            var dataget = {
            		namaToko : document.getElementById("namaToko-edit").value,
              		alamatToko : document.getElementById("alamatToko-edit").value,
              		npwp : document.getElementById("npwp-edit").value,
              		deskripsi : document.getElementById("deskripsi-edit").value,
            };
            console.log(JSON.stringify(dataget));
            
            $.ajax({
	            url: '/api/toko/' + idCabang,
	            method: 'put',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(dataget),	// ganti dataResult -> dataget
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    tableToko.create();
	                    $('#modal-toko2').modal('hide')
	                    toastr.success('Data toko berhasil diubah.')
	                    tampil.tampilan("TK-1");

//            		 	tambah
//            		 	batas
	
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
	            url: '/api/toko/' + idCabang,
	            method: 'delete',
	           /* contentType: 'application/json',
	            dataType: 'json',*/
	            success: function (res, status, xhr) {
	            	tableToko.create();
	            	 toastr.success('Data toko berhasil dihapus.')
//	            	Toast.fire({type: 'info',title: 'Toko berhasil dihapus.'})
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
        var nama = $("#filterCabang").val();
        console.log("nama",nama)
        statusValue = nama 
        console.log(statusValue)

        $.ajax({
            url: '/api/cabang/namacabang/' + statusValue,
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

var hitung ={
		hitungCabang: function (idToko) {
			$.ajax ({
				 url: '/api/cabang/countcabang/' + idToko,
	            method: 'get',
	            contentType: 'application/json',
	            dataType : 'json',
	            success: function (res, status, xhr) {
	            	var jumlahcb = document.getElementById("jumlahCabang2");
        		 	jumlahcb.textContent = res
        		 	console.log(jumlahcb)
	            }
			})
		}
};
//
var tampil = {
		tampilan: function (idCabang) {
			console.log(idCabang)
		 $.ajax({
	            url: '/api/toko/' + idCabang,
	            method: 'get',
	            contentType: 'application/json',
	            dataType : 'json',
	            success: function (res, status, xhr) {
	            	 if (xhr.status == 200 || xhr.status == 201) {
	            		 	
	            		 
//	            		 	var jumlahcb = document.getElementById("jumlahCabang2");
//	            		 	jumlahcb.textContent = res.jumlahCabang;

	            		 	var alamat = document.getElementById("alamatToko2");
	                        alamat.textContent = res.alamatToko;
	                        
	                        var nama = document.getElementById("namaToko2");
	                        nama.textContent = res.namaToko;
	                        
	                        var npwp = document.getElementById("npwp2");
	                        npwp.textContent = res.npwp;
	                        
	                        var desc = document.getElementById("deskripsi2");
	                        desc.textContent = res.deskripsi;
	                        
//	                        var aktif = document.getElementById("aktif2");
//	                        aktif.textContent = res.cabangAktif;
//	                        
//	                        var nonaktif = document.getElementById("pasif2");
//	                        nonaktif.textContent = res.cabangTidakAktif;
	            	 
	                        $.ajax ({
	           				 url: '/api/cabang/countcabang/' + idCabang,
	           	            method: 'get',
	           	            contentType: 'application/json',
	           	            dataType : 'json',
	           	            success: function (res, status, xhr) {
	           	            	var jumlahcb = document.getElementById("jumlahCabang2");
	                   		 	jumlahcb.textContent = res
	                   		 	console.log(jumlahcb)
	           	            }
	           			})
	           			
	           			 $.ajax ({
	           				url: '/api/cabang/countstatus/' + 'Non Aktif',
	           	            method: 'get',
	           	            contentType: 'application/json',
	           	            dataType : 'json',
	           	            success: function (res, status, xhr) {
	           	            	var jumlahpasif = document.getElementById("pasif2");
	                   		 	jumlahpasif.textContent = res
	                   		 	console.log(res)
	           	            }
	           			})
	           			
	           			 $.ajax ({
	           				url: '/api/cabang/countstatus/' + 'Aktif',
	           	            method: 'get',
	           	            contentType: 'application/json',
	           	            dataType : 'json',
	           	            success: function (res, status, xhr) {
	           	            	var jumlahaktif = document.getElementById("aktif2");
	                   		 	jumlahaktif.textContent = res
	                   		 	console.log(res)
	           	            }
	           			})
	           			
	           			
	            	 }
	            	 else { }
	            },
	            erorrr: function (err) {
	                console.log(err);
	            }
		
		 	});
		}
};

//$(document).ready(function() {
//	
//  $("#npwp").mask("99.999.999.9-999.999");
	
//})