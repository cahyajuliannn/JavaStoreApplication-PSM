var tampil = {
		cabang : function (idCabang) {
	    	 $.ajax({
		            url: '/api/cabang/idCabang/' + idCabang,
		            method: 'get',
		            contentType: 'application/json',
		            success: function (res, status, xhr) {
		            	console.log("res",res)
		                if (xhr.status == 200 || xhr.status == 201) {
		                	
		                	var nama = document.getElementById("namaCabangAkses");
	                        nama.textContent = res[0].namaCabang;
	                        
	                        var alamat = document.getElementById("alamatCabangAkses");
	                        alamat.textContent = res[0].alamatCabang;
	                        
	                        var kota = document.getElementById("kotaCabangAkses");
	                        kota.textContent = res[0].kotaKab;
	                        
	                        var tanggal = document.getElementById("tanggalCabangAkses");
	                        tanggal.textContent = res[0].tanggalBerdiri;
	                        
	                        var buka = document.getElementById("bukaCabangAkses");
	                        buka.textContent = res[0].jamBuka;
//	                        
	                        var tutup = document.getElementById("tutupCabangAkses");
	                        tutup.textContent = res[0].jamTutup;
	                        
	                        var status = document.getElementById("statusCabangAkses");
	                        status.textContent = res[0].status;

		                } else {

		                }
		            },
		            erorrr: function (err) {
		                console.log(err);
		            }
		        });
	    	
	    }
}

var tableStok = {
		tampil: function(idCab) {
			console.log(idCab)
			
			if ($.fn.DataTable.isDataTable('#tableStok')) {
	            $('#tableStok').DataTable().clear();
	            $('#tableStok').DataTable().destroy();
	        }
			$("#modal-stok").modal('show');
			//var cabvalF = $("#cabangF").val();
			
	        $.ajax({
	            url: '/api/stok/getbycabang?id_cabang=' + idCab,
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#tableStok').DataTable({
	                        data: res,
	                        columns: [
	                        	{title: "ID Stok",data: "idStok"},
	                        	{title: "Cabang",data: "namaCabang"},
	                            {title: "Nama Barang",data: "namaBarang"},
	                            {title: "Variant",data: "variantAja"},
	                            {title: "Kategori",data: "namaKategori"},
	                            {title: "Gudang",data: "gudang"},
	                            {title: "Jumlah Stok Saat Ini",data: "jumlahStok"},
//	                            {
//	                                title: "Action",
//	                                data: null,
//	                                render: function (data, type, row) {
//	                                	console.log(data);
//	                                    return "<button class='btn btn-primary btn-sm' onclick=formStok.setEditData('" + data.idStok + "')><i class='fas fa-edit'></i></button>" +
//	                                    		"<button class='btn btn-danger btn-sm' onclick=formStok.deleteData('" + data.idStok + "') id='del'><i class='fas fa-trash-alt'></i></button>"
//	                                    }
//	                                }
	                            
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
		
		hitungStok: function(idCab) {
	        $.ajax({
	            url: '/api/stok/countbycabang/' + idCab,
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $("#countStok").text(res);
	                } else {
	                }
	            },
	            error: function (status, xhr) {
	                console.log(status, xhr);
	            }
	        });
		}
	}; 