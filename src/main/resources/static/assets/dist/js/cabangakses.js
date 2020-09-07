
var tampil = {
		tampilan: function (idCabang) {
			console.log(idCabang)
		 $.ajax({
	            url: '/api/cabang/' + idCabang,
	            method: 'get',
	            contentType: 'application/json',
	            dataType : 'json',
	            success: function (res, status, xhr) {
	            	 if (xhr.status == 200 || xhr.status == 201) {

	            		 	var nama = document.getElementById("namaCabangAkses");
	                        nama.textContent = res.namaCabang;
	                        
	                        var alamat = document.getElementById("alamatCabangAkses");
	                        alamat.textContent = res.alamatCabang;
	                        
	                        var kota = document.getElementById("kotaCabangAkses");
	                        kota.textContent = res.kotaKab;
	                        
	                        var tanggal = document.getElementById("tanggalCabangAkses");
	                        tanggal.textContent = res.tanggalBerdiri;
	                        
	                        var buka = document.getElementById("bukaCabangAkses");
	                        buka.textContent = res.jamBuka;
	                        
	                        var tutup = document.getElementById("tutupCabangAkses");
	                        tutup.textContent = res.jamTutup;
	                        
	                        var status = document.getElementById("statusCabangAkses");
	                        status.textContent = res.status;
	            	 }
	            	 else { }
	            },
	            erorrr: function (err) {
	                console.log(err);
	            }
		
		 	});
		}
	    ,cabangpilih : function (idCabang) {
	    	 $.ajax({
		            url: '/api/cabang/idCabang/' + idCabang,
		            method: 'get',
		            contentType: 'application/json',
		            success: function (res, status, xhr) {
		            	console.log("res",res)
		                if (xhr.status == 200 || xhr.status == 201) {
		                	console.log("rescb",res.idCabang)
	                        window.location.href = "/aksescabang?idCabang=" + res[0].idCabang + "&namaCabang=" + res[0].namaCabang; // setiap button pada card membawa parameter untuk ke halaman barangs.html
	                      
		                } else {

		                }
		            },
		            erorrr: function (err) {
		                console.log(err);
		            }
		        });
	    	
	    }
};
var getCabang = {
		
		getAllCabang: function(idSel) {
			 $.ajax({
		            url: '/api/cabang',
		            method: 'get',
		            contentType: 'application/json',
		            dataType: 'json',
		            success: function (res, status, xhr) {
		            	if (xhr.status==200|| xhr.status==201) {
		            		$("#pilihCabang").select2();
//		            	console.log(res);
		            var dynamicSelect = document.getElementById("pilihCabang")
		            $("#pilihCabang").find("option").remove();
		            res.forEach(element=> {
		            	
		            	var newOption = document.createElement("option");
		            	newOption.setAttribute("id", element.idCabang);
		            	newOption.text = element.namaCabang
		            	dynamicSelect.add(newOption);
		            	
		            });
		           
		            if (idSel != 0){
						$("#pilihCabang option[id='"+idSel+"']").attr("selected","selected");
					}
		         } 
		            	
		         },
		         error: function (err){
		        	 console.log(err);
		         }
		    });
		}
};



//tanya jul




  $(document).ready(function() {
	  getCabang.getAllCabang();
		
  });



