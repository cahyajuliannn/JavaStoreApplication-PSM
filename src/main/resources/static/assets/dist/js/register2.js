$("#mySelect").select2();

var formBiodata = {
    resetForm: function () {
        $('#form-biodata')[0].reset();
    },
    saveForm: function () {
    	console.log('true');
        if ($('#form-biodata').parsley().validate()) {
        	var a = $("#roleus").val()
        	var b = $("#cabang").val()
        	console.log(a[0],b)
        		
        	for(var x = 0; x <a.length ; x++){
        		var id2 = a[x]
        		var id ={
        				id2
        		};
        		userAndRole.push(id)    		
        	}
        	
        	for(var x = 0; x <b.length ; x++){
        		var id2 = b[x]
        		var id ={
        				id2
        		};
        		branchAccess.push(id)
        	}
        	
        	var c = $("#email").val()
        	var d = "Email"
        	var accountName = c
        	var jenisCP = d
        	var all = {accountName, jenisCP};
        	contactBiodata.push(all)
        	
        	var e = $("#nomorhp").val()
        	var f = "Nomor HP"
        	var accountName = e
        	var jenisCP = f
        	var all2 = {accountName, jenisCP};
        	contactBiodata.push(all2)
	
        	console.log(c[0],e)

			var namaLengkap = $("#fname").val();
			var tglLahir = $("#bdate").val();
			var alamat = $("#address").val();
			var username = $("#username").val();
			var password = $("#password").val();
			var kotaLokasi = $("#mySelect").val();
				
			var isi = {
				namaLengkap,
				tglLahir,
				alamat,
				username,
				password,
				kotaLokasi,
				userAndRole,
				branchAccess,
				contactBiodata
			};
           console.log(isi);
           
            $.ajax({
                url: '/api/biodatauser/service',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(isi),
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
//                        tableBiodata.create();
//                        $('#modal-biodata').modal('hide')
            	          $('#form-biodata').parsley().reset()
            	          
//            	          toastr.success('You have successfully registered as an administrator. Thank you!');

            	          window.location.replace("http://localhost:1212/login")


                    } else {

                    }
                },
                error: function(xhr, status, error) {
              	  var err = eval("(" + xhr.responseText + ")");
              	  console.log(err.Message);
                }
            });
        }
    }

};
	
	$.ajax({
	    url: '/api/kota/getAll',
	    method: 'get',
	    contentType: 'application/json',
	    success: function (res, status, xhr) {
	        if (xhr.status == 200 || xhr.status == 201) {
	          // Get select
	            var select = document.getElementById('mySelect');
	          
	            // Add options
	          for (var i in res) {
	            $(select).append('<option value="' + res[i].kotaKab + '">' + res[i].kotaKab + '</option>');
	          }
	        } else {
	
	        }
	    },
	    error: function(xhr, status, error) {
      	  var err = eval("(" + xhr.responseText + ")");
      	  console.log(err.Message);
	    }
	});

	$.ajax({
	    url: '/api/roleuser/getAll',
	    method: 'get',
	    contentType: 'application/json',
	    success: function (res, status, xhr) {
	        if (xhr.status == 200 || xhr.status == 201) {
	          // Get select
//				$("#roleus").select2({placeholder: "Pilih Role"});
	        	$("#roleus").select2({
	    					res: [], 
	    					multiple: true, 
	    					placeholder: "Pilih Role", 
	    					allowClear: true, 
	    					tokenSeparators: ";"
	        	});
	            var select = document.getElementById('roleus');
//	            $('#roleus').select2('data', {id: RU-1, text: 'Administrator'});

	            // Add options
	          for (var i in res) {
	            $(select).append('<option value=' + res[i].idRole + '>' + res[i].role + '</option>');
	            $(select).append('<option value=' + res[i+1].idRole + ' disabled="disabled">' + res[i+1].role + '</option>');
	          }
	        } else {
	
	        }
	    },
	    error: function(xhr, status, error) {
      	  var err = eval("(" + xhr.responseText + ")");
      	  console.log(err.Message);
	    }
	});
	
	$.ajax({
	    url: '/api/cabang',
	    method: 'get',
	    contentType: 'application/json',
	    success: function (res, status, xhr) {
	        if (xhr.status == 200 || xhr.status == 201) {
	          // Get select
//	        	$("#cabang").select2();
				$("#cabang").select2({
					data: [], 
					multiple: true, 
					placeholder: "Pilih Cabang", 
					allowClear: true
				});
				
	            var select = document.getElementById('cabang');
	          
	            // Add options
	          for (var i in res) {
	            $(select).append('<option value=' + res[i].idCabang + '>' + res[i].namaCabang + '</option>');
	          }
	        } else {
	
	        }
	    },
	    error: function(xhr, status, error) {
      	  var err = eval("(" + xhr.responseText + ")");
      	  console.log(err.Message);
	    }
	});
	
//	$.ajax({
//	    url: '/api/roleuser/getAll',
//	    method: 'get',
//	    contentType: 'application/json',
//	    success: function (res, status, xhr) {
//	        if (xhr.status == 200 || xhr.status == 201) {
//	          // Get select
//	            var select = document.getElementById('roleus2');
//	          
//	            // Add options
//	          for (var i in res) {
//	            $(select).append('<option value=' + res[i].idRole + '>' + res[i].role + '</option>');
//	          }
//	        } else {
//	
//	        }
//	    },
//	    error: function(xhr, status, error) {
//      	  var err = eval("(" + xhr.responseText + ")");
//      	  console.log(err.Message);
//	    }
//	});

	