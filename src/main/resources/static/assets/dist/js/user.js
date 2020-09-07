$("#mySelect").select2({placeholder: "Pilih Kota/Kabupaten"});
$("#mySelect2").select2();

var idEdit;
$('#btn-update-biodata').click(function () {
    formBiodata.editUser(idEdit);
    userAndRole = []
	branchAccess = []
    contactBiodata = []
})

var value;

var tableBiodata = {
    create: function () {
        // jika table tersebut datatable, maka clear and destroy
        if ($.fn.DataTable.isDataTable('#tableBiodata')) {
            // table yg sudah dibentuk menjadi datatable harus di-rebuild lagi
			// untuk di-instansiasi-ulang
            $('#tableBiodata').DataTable().clear();
            $('#tableBiodata').DataTable().destroy();
        }
        
        $("#roleuser").val('');
        $("#usname").val('');

        $.ajax({
            url: '/api/biodatauser/getAllNew',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableBiodata').DataTable({
                        data: res,
                        columns: [
//                        	   {
//                                   title: "ID User",
//                                   data: "idUser"
//                               },
//                               {
//                                   title: "Nama Lengkap",
//                                   data: "namaLengkap"
//                               },
							   {
                                   title: "Username",
                                   data: "username"
                               },
//                               {
//								   title: "Tanggal Lahir",
//								   data: null,
//								   render: function(data, type, row) {
//									   namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
//										   "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
//									   tgl = new Date(data.tglLahir)
//									   tglLahirTampilan = tgl.getDate() + " " + namaBulan[tgl.getMonth()] + " " + tgl.getFullYear()
//									   return tglLahirTampilan
//								   }
//							   },
//							   {
//								   title: "Alamat",
//								   data: "alamat"
//							   },
//							   {
//								   title: "Kota/Kabupaten",
//								   data: "kotaLokasi"
//							   },
//							   {
//								   title: "ID User And Role",
//								   data: "idUserroles"
//							   },
//							   {
//								   title: "Role",
//								   data: "role"
//							   },
							   {
								   title: "Role",
								   data: null,
								   render: function (data, type, row) {
									   var roleArr = []
									   for (var i = 0; i < data.userAndRole.length; i++) {
										   roleArr.push(" " + data.userAndRole[i].name)
									   }
//									   console.log(data.userAndRole)
									   return roleArr
								   }
							   },
							   {
								   title: "Branch Access",
								   data: null,
								   render: function (data, type, row) {
									   var branchArr = []
									   for (var i = 0; i < data.branchAccess.length; i++) {
										   branchArr.push(" " + data.branchAccess[i].name)
									   }
//									   console.log(data.branchAccess[0].cabang.namaCabang)
									   return branchArr
								   }
							   },
//							   {
//								   title: "ID Branch Access",
//								   data: "idBranchaccess"
//							   },
//							   {
//								   title: "Branch Access",
//								   data: "namaCabang"
//							   },
//                               {
//								   title: "Password",
//								   data: "password"
//							   },
                               {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                    return "<button class='btn btn-secondary btn-sm' onclick=formBiodata.infoData('" + data.idUser + "')><i class='fas fa-info-circle'></i></button>" +
                                    	   "<button class='btn btn-primary btn-sm' onclick=formBiodata.setEditData('" + data.idUser + "')><i class='fa fa-fw fa-edit'></i></button>" +
                                    	   "<button class='btn btn-danger btn-sm' onclick=formBiodata.deleteData('" + data.idUser + "')><i class ='nav-icon fas fa-trash'></i></button>"
                                    	   
                              
                                }

                            }
                        ]
                    });

                } else {

                }
            },
            error: function(xhr, status, error) {
          	  var err = eval("(" + xhr.responseText + ")");
          	  console.log(err.Message);
            }
        });


    }
};

var formBiodata = {
    resetForm: function () {
        $('#form-biodata')[0].reset();
    },
    saveForm: function () {
    	console.log('true');
        if ($('#form-biodata')) {
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
                        tableBiodata.create();
//                        tableUser.create();
//                        tableBranchAccess.create();
                        $('#modal-biodata').modal('hide')
            			$('#form-biodata').parsley().reset()
                        toastr.success('Data telah berhasil ditambahkan dan disimpan.');


                    } else {

                    }
                },
                error: function(xhr, status, error) {
              	  var err = eval("(" + xhr.responseText + ")");
              	  console.log(err.Message);
                }
            });
        }
    },
    setEditData: function (idCabang) {
        formBiodata.resetForm();
        idEdit = idCabang;
        
          $.ajax({
              url: '/api/biodatauser/' + idCabang,
              method: 'get',
              contentType: 'application/json',
              dataType: 'json',
              success: function (res, status, xhr) {
              if (xhr.status == 200 || xhr.status == 201) {
            	  console.log(res);
            	  
                 populateComboRoleEdit.getAllRole(res);
                 populateComboCabEdit.getAllCabang(res);

                 var contact = (res.contactBiodata);
                 for (var i = 0; i < contact.length; i++) {
                	 if (contact[i].jenisCP == "Email") {
                     $("#email2").val(contact[i].accountName).focus();
                     console.log(contact[i].accountName)
                	 } 
                	 else {
                	 $("#nomorhp2").val(contact[i].accountName).focus();
                	 console.log(contact[i].accountName)
                 	}
                 }
                    
                $('#form-edit-biodata').fromJSON(JSON.stringify(res,email2));
                $('#modal-edit-biodata').modal('show')
                $('#form-edit-biodata').parsley().reset()
                  } else {

                  }
              },
              error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err.Message);
              }
          });


      },
      editUser: function (idUser2) {
    	if ($('#form-edit-biodata').parsley().validate()){
    	        
    		var a = $("#roleus2").val()
        	var b = $("#cabang2").val()
        	console.log(a[0],b)
        	   	
        	for(var x = 0; x <a.length; x++){
        		var id2 = a[x]
        		var id ={
        				id2
        		};
        		userAndRole.push(id)    		
        	}
    		
        	for(var x = 0; x <b.length; x++){
        		var id2 = b[x]
        		var id ={
        				id2
        		};
        		branchAccess.push(id)
        	}
	
        	var c = $("#email2").val()
        	var d = "Email"
        	var accountName = c
        	var jenisCP = d
        	var all = {accountName, jenisCP};
        	contactBiodata.push(all)
        	
        	var e = $("#nomorhp2").val()
        	var f = "Nomor HP"
        	var accountName = e
        	var jenisCP = f
        	var all2 = {accountName, jenisCP};
        	contactBiodata.push(all2)

        	
        	var namaLengkap = $("#fname2").val();
			var tglLahir = $("#bdate2").val();
			var alamat = $("#address2").val();
			var username = $("#username2").val();
			var password = $("#password2").val();
			var kotaLokasi = $("#mySelect2").val();
				
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
    	}

        $.ajax({
            url: '/api/biodatauser/'+ idUser2,
            method: 'put',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(isi),	
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                	tableBiodata.create();
                    $('#modal-edit-biodata').modal('hide')
	            	toastr.success('Data berhasil diubah dan disimpan.');

                } else {

                }
            },
            error: function(xhr, status, error) {
          	  var err = eval("(" + xhr.responseText + ")");
          	  console.log(err.Message);
            }
        });


    },
    deleteData: function (id) {
    	//console.log(id);
//    	var idArr = id.split(',');
    	//console.log(id[2]);
    	if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {    	
        $.ajax({
            url: '/api/biodatauser/delete/' + id,
            method: 'delete',
            contentType: 'application/json',
            dataType: 'json',
//            data: JSON.stringify(isi),
            success: function (res, status, xhr) {
            	console.log(status);
                if (xhr.status == 200 || xhr.status == 201) {
                	  tableBiodata.create();
  	            	  toastr.success('Data berhasil dihapus.');

//                    $('#form-biodata').fromJSON(JSON.stringify(res));
//                    $('#modal-biodata').modal('show')

                }
            },
//            error: function(xhr, status, error) {
//        	  var err = eval("(" + xhr.responseText + ")");
//        	  console.log(err.Message);
//            }
        });
      }
    
    },
	infoData: function (idCabang) {
	    	
	    	$.ajax({
	    		url: '/api/biodatauser/' + idCabang,
	    		method: 'get',
	    		contentType: 'application/json',
	            dataType: 'json',
	            success: function (res, status, xhr) {   
	            	console.log("res", res);
	            	$("#infoidbiodata").text(res.idBiodata);
	            	$("#infoiduser").text(res.idUser);
	            	$("#infonama").text(res.namaLengkap);
	            	$("#infoalamat").text(res.alamat);
	            	
	            	$("#infotgllahir").text(res.tglLahir);
	            	
	            	$("#infokota").text(res.kotaLokasi);
	            	
	            	 var contact = (res.contactBiodata);
	                 for (var i = 0; i < contact.length; i++) {
	                	 if (contact[i].jenisCP == "Email") {
	                     $("#email2").val(contact[i].accountName).focus();
	                     console.log(contact[i].accountName)
	                	 } 
	                	 else {
	                	 $("#nomorhp2").val(contact[i].accountName).focus();
	                	 console.log(contact[i].accountName)
	                 	}
	                 }
	                 
	            	$("#infoemail").text(res.contactBiodata);
//	            	$("#infonomorhp").text(res.contactBiodata);
	            	
//	            	var userAndRole = []
//	         		var branchAccess = []
//	            	
//	            	var a = $("#roleus2").val()
//	            	var b = $("#cabang2").val()
////	            	console.log(a[0],b)
//	            	   	
//	            	for(var x = 0; x <a.length; x++){
//	            		var id2 = a[x]
//	            		var id ={
//	            				id2
//	            		};
//	            		userAndRole.push(id)    		
//	            	}
//	        		
//	            	for(var x = 0; x <b.length; x++){
//	            		var id2 = b[x]
//	            		var id ={
//	            				id2
//	            		};
//	            		branchAccess.push(id)
//	            	}

	            	$("#inforole").text(res.userAndRole);
	            	$("#infobranchaccess").text(res.branchAccess);
	            	
	            	$("#infousername").text(res.username);
//	            	$("#infopassword").text(res.password);
	            	
	            	$("#modal-info").modal("show");
	            },
	            error: function(xhr, status, error) {
	            
	            }
	    	})
	    },
	    searchByRU: function() {
	        if ($.fn.DataTable.isDataTable('#tableBiodata')) {
	            $('#tableBiodata').DataTable().clear();
	            $('#tableBiodata').DataTable().destroy();
	        }
	        
	        var roleuser = $("#roleuser").val();
	        var usname = $("#usname").val();
	        
	        $.ajax({
	            url: '/api/biodatauser/filterUR/' + usname + '/' + roleuser,
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
//	                	  tableBiodata.create();
	                      $('#tableBiodata').DataTable({
	                          data: res,
	                          columns: [
//	                        	   {
//                                title: "ID User",
//                                data: "idUser"
//                            },
//                            {
//                                title: "Nama Lengkap",
//                                data: "namaLengkap"
//                            },
							   {
                                title: "Username",
                                data: "username"
                            },
//                            {
//								   title: "Tanggal Lahir",
//								   data: null,
//								   render: function(data, type, row) {
//									   namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
//										   "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
//									   tgl = new Date(data.tglLahir)
//									   tglLahirTampilan = tgl.getDate() + " " + namaBulan[tgl.getMonth()] + " " + tgl.getFullYear()
//									   return tglLahirTampilan
//								   }
//							   },
//							   {
//								   title: "Alamat",
//								   data: "alamat"
//							   },
//							   {
//								   title: "Kota/Kabupaten",
//								   data: "kotaLokasi"
//							   },
//							   {
//								   title: "ID User And Role",
//								   data: "idUserroles"
//							   },
//							   {
//								   title: "Role",
//								   data: "role"
//							   },
							   {
								   title: "Role",
								   data: null,
								   render: function (data, type, row) {
									   var roleArr = []
									   for (var i = 0; i < data.userAndRole.length; i++) {
										   roleArr.push(" " + data.userAndRole[i].name)
									   }
//									   console.log(data.userAndRole)
									   return roleArr
								   }
							   },
							   {
								   title: "Branch Access",
								   data: null,
								   render: function (data, type, row) {
									   var branchArr = []
									   for (var i = 0; i < data.branchAccess.length; i++) {
										   branchArr.push(" " + data.branchAccess[i].name)
									   }
//									   console.log(data.branchAccess[0].cabang.namaCabang)
									   return branchArr
								   }
							   },
//							   {
//								   title: "ID Branch Access",
//								   data: "idBranchaccess"
//							   },
//							   {
//								   title: "Branch Access",
//								   data: "namaCabang"
//							   },
//                            {
//								   title: "Password",
//								   data: "password"
//							   },
                            {
                             title: "Action",
                             data: null,
                             render: function (data, type, row) {
                                 return "<button class='btn btn-secondary btn-sm' onclick=formBiodata.infoData('" + data.idUser + "')><i class='fas fa-info-circle'></i></button>" +
                                 	   "<button class='btn btn-primary btn-sm' onclick=formBiodata.setEditData('" + data.idUser + "')><i class='fa fa-fw fa-edit'></i></button>" +
                                 	   "<button class='btn btn-danger btn-sm' onclick=formBiodata.deleteData('" + data.idUser + "')><i class ='nav-icon fas fa-trash'></i></button>"
                                 	   
                           
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
	    searchByUsername: function() {
	        if ($.fn.DataTable.isDataTable('#tableBiodata')) {
	            $('#tableBiodata').DataTable().clear();
	            $('#tableBiodata').DataTable().destroy();
	        }
	        
	        value = $("#uname").val();
	        
	        $.ajax({
	            url: '/api/user/filter/' + value,
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
//	                	  tableBiodata.create();
	                      $('#tableBiodata').DataTable({
	                          data: res,
	                          columns: [
	                          	   {
	                                     title: "ID User",
	                                     data: "idUser"
	                                 },
//	                                 {
//	                                     title: "Nama Lengkap",
//	                                     data: "namaLengkap"
//	                                 },
//	                                 {
//	  								   title: "Tanggal Lahir",
//	  								   data: null,
//	  								   render: function(data, type, row) {
//	  									   namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
//	  										   "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
//	  									   tgl = new Date(data.tglLahir)
//	  									   tglLahirTampilan = tgl.getDate() + " " + namaBulan[tgl.getMonth()] + " " + tgl.getFullYear()
//	  									   return tglLahirTampilan
//	  								   }
//	  							   },
//	  							   {
//	  								   title: "Alamat",
//	  								   data: "alamat"
//	  							   },
//	  							   {
//	  								   title: "Kota/Kabupaten",
//	  								   data: "kotaLokasi"
//	  							   },
//	  							   {
//	  								   title: "ID User And Role",
//	  								   data: "idUserroles"
//	  							   },
//	  							   {
//	  								   title: "Role",
//	  								   data: "role"
//	  							   },
//	  							   {
//	  								   title: "Role",
//	  								   data: null,
//	  								   render: function (data, type, row) {
//	  									   var roleArr = []
//	  									   for (var i = 0; i < data.userAndRole.length; i++) {
//	  										   roleArr.push(" " + data.userAndRole[i].name)
//	  									   }
////	  									   console.log(data.userAndRole[0].roleUser.role)
//	  									   return roleArr
//	  								   }
//	  							   },
//	  							   {
//	  								   title: "Branch Access",
//	  								   data: null,
//	  								   render: function (data, type, row) {
//	  									   var branchArr = []
//	  									   for (var i = 0; i < data.branchAccess.length; i++) {
//	  										   branchArr.push(" " + data.branchAccess[i].name)
//	  									   }
////	  									   console.log(data.branchAccess[0].cabang.namaCabang)
//	  									   return branchArr
//	  								   }
//	  							   },
//	  							   {
//	  								   title: "ID Branch Access",
//	  								   data: "idBranchaccess"
//	  							   },
//	  							   {
//	  								   title: "Branch Access",
//	  								   data: "namaCabang"
//	  							   },
	  							   {
	                                     title: "Username",
	                                     data: "username"
	                                 },
	                                 {
	  								   title: "Password",
	  								   data: "password"
	  							   },
	                                 {
	                                  title: "Action",
	                                  data: null,
	                                  render: function (data, type, row) {
	                                      return "<button class='btn btn-secondary btn-sm' onclick=formBiodata.infoData('" + data.idUser + "')><i class='fas fa-info-circle'></i></button>" +
	                                      	   "<button class='btn btn-primary btn-sm' onclick=formBiodata.setEditData('" + data.idUser + "')><i class='fa fa-fw fa-edit'></i></button>" +
	                                      	   "<button class='btn btn-danger btn-sm' onclick=formBiodata.deleteData('" + data.idBiodata + ',' + data.idUser + "')><i class ='nav-icon fas fa-trash'></i></button>"
	                                      	   
	                                
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
	
	$.ajax({ // untuk save
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

	$.ajax({ // untuk edit
	    url: '/api/kota/getAll',
	    method: 'get',
	    contentType: 'application/json',
	    success: function (res, status, xhr) {
	        if (xhr.status == 200 || xhr.status == 201) {
	          // Get select
	            var select = document.getElementById('mySelect2');
	          
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

	
	$.ajax({ // untuk save
	    url: '/api/roleuser/getAll',
	    method: 'get',
	    contentType: 'application/json',
	    success: function (res, status, xhr) {
	        if (xhr.status == 200 || xhr.status == 201) {
	          // Get select
//				$("#roleus").select2();
				$("#roleus").select2({
					res: [], 
					multiple: true, 
					placeholder: "Pilih Role", 
					allowClear: true, 
					tokenSeparators: ";"
				});
	            var select = document.getElementById('roleus');
                
	            // Add options
	          for (var i in res) {
	            $(select).append('<option value=' + res[i].idRole + '>' + res[i].role + '</option>');
	          }
	          
	        } else {
	
	        }
	    },
	    error: function(xhr, status, error) {
      	  var err = eval("(" + xhr.responseText + ")");
      	  console.log(err.Message);
	    }
	});
	
	var populateComboRoleEdit = { // untuk edit
			getAllRole: function (obj) {
				$.ajax({
					url: '/api/roleuser/getAll',
					method: 'get',
					contentType: 'application/json',
					dataType: 'json',
					success: function (res, status, xhr) {
//						if(xhr.status == 200 || xhr.status == 201){
							$("#roleus2").select2({
								res: [], 
								multiple: true, 
								placeholder: "Pilih Role", 
								allowClear: true, 
								tokenSeparators: ";"
							});
							var dynamicSelect = document.getElementById("roleus2");
							$("#roleus2").find("option").remove();
							
							res.forEach(element => {
								var newOption = document.createElement("option");
								newOption.setAttribute("id", element.idRole);
								newOption.setAttribute("value", element.idRole);
								newOption.text = element.role;
								dynamicSelect.add(newOption);	
							});
							console.log(obj)
							if (obj.userAndRole.length > 0){
								for (let index = 0; index < obj.userAndRole.length; index++) {
									var opt = document.getElementById(obj.userAndRole[index].id2);
									opt.setAttribute('selected','selected')
									roleList = obj.userAndRole;
								}
							}
//						}
						$("#roleus2").trigger("change");
					},
					error: function(xhr, status, error) {
				      	  var err = eval("(" + xhr.responseText + ")");
				      	  console.log(err.Message);
					    }				
			});
		}
	}
	
	$.ajax({ // untuk save
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
					allowClear: true,
					tokenSeparators: ";"
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
	
	var populateComboCabEdit = { // untuk edit
			getAllCabang: function (obj) {
				$.ajax({
					url: '/api/cabang',
					method: 'get',
					contentType: 'application/json',
					dataType: 'json',
					success: function (res, status, xhr) {
//						if(xhr.status == 200 || xhr.status == 201){
							$("#cabang2").select2({
								res: [], 
								multiple: true, 
								placeholder: "Pilih Cabang", 
								allowClear: true, 
								tokenSeparators: ";"
							});
							var dynamicSelect = document.getElementById("cabang2");
							$("#cabang2").find("option").remove();
							
							res.forEach(element => {
								var newOption = document.createElement("option");
								newOption.setAttribute("id", element.idCabang);
								newOption.setAttribute("value", element.idCabang);
								newOption.text = element.namaCabang;
								dynamicSelect.add(newOption);	
							});
							console.log(obj)
							if (obj.branchAccess.length > 0){
								for (let index = 0; index < obj.branchAccess.length; index++) {
									var opt = document.getElementById(obj.branchAccess[index].id2);
									opt.setAttribute('selected','selected')
									branchList = obj.branchAccess;
								}
							}
//						}
						$("#cabang2").trigger("change");
					},
					error: function(xhr, status, error) {
				      	  var err = eval("(" + xhr.responseText + ")");
				      	  console.log(err.Message);
					    }				
			});
		}
	}
	
// TABEL USER AND ROLE
	var idEditUserroles;
	$('#btn-update-userroles').click(function () {
	    formUserroles.editUser(idEditUserroles);
	})
	
var tableUser = {
	    create: function () {
	        // jika table tersebut datatable, maka clear and destroy
	        if ($.fn.DataTable.isDataTable('#tableUser')) {
	            // table yg sudah dibentuk menjadi datatable harus di-rebuild lagi
				// untuk di-instansiasi-ulang
	            $('#tableUser').DataTable().clear();
	            $('#tableUser').DataTable().destroy();
	        }

	        $.ajax({
	            url: '/api/userandrole/getAll',
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#tableUser').DataTable({
	                        data: res,
	                        columns: [
	                               {
	                                   title: "ID Userroles",
	                                   data: "idUserroles"
	                               },
	                               {
									   title: "ID User",
									   data: "idUser"
								   },
								   {
									   title: "ID Role",
									   data: "idRole"
								   },
								   {
									   title: "Role",
									   data: "role"
								   },
	                               {
	                                title: "Action",
	                                data: null,
	                                render: function (data, type, row) {
	                                    return "<button class='btn btn-primary btn-sm' onclick=formUserroles.setEditData('" + data.idUserroles + "')><i class='fa fa-fw fa-edit'></i></button>" +
	                                    	   "<button class='btn btn-danger btn-sm' onclick=formUserroles.deleteData('" + data.idUserroles + "')><i class ='nav-icon fas fa-trash'></i></button>"
	                               }

	                            }
	                        ]
	                    });

	                } else {

	                }
	            },
	            error: function(xhr, status, error) {
	            	  var err = eval("(" + xhr.responseText + ")");
	            	  console.log(err.Message);
	      	    }
	        });


	    }
	};


var formUserroles = {
	    resetForm: function () {
	        $('#form-userroles')[0].reset();
	    },
	    saveForm: function () {
	    	console.log('true');
	        if ($('#form-userroles').parsley().validate()) {
	            var dataResult = getJsonForm($("#form-userroles").serializeArray(), true);

	           console.log(dataResult);
	           
	            $.ajax({
	                url: '/api/userandrole',
	                method: 'post',
	                contentType: 'application/json',
	                dataType: 'json',
	                data: JSON.stringify(dataResult),
	                success: function (res, status, xhr) {
	                    if (xhr.status == 200 || xhr.status == 201) {
	                        tableUser.create();
	                        tableBiodata.create();
	                        $('#modal-userroles').modal('hide')
	            			$('#form-userroles').parsley().reset()

	                    } else {

	                    }
	                },
	                error: function(xhr, status, error) {
	              	  var err = eval("(" + xhr.responseText + ")");
	              	  console.log(err.Message);
	                }
	            });
	        }
	    },
	    setEditData: function (idCabang) {
	    	formUserroles.resetForm();
	    	idEditUserroles = idCabang;

	        $.ajax({
	            url: '/api/userandrole/' + idCabang,
	            method: 'get',
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#form-edit-userroles').fromJSON(JSON.stringify(res));
	                    $('#modal-edit-userroles').modal('show')
	        			$('#form-edit-userroles').parsley().reset()

	                } else {

	                }
	            },
	            error: function(xhr, status, error) {
	          	  var err = eval("(" + xhr.responseText + ")");
	          	  console.log(err.Message);
	            }
	        });


	    },
	    editUser: function (idUser2) {
	    	if ($('#form-edit-userroles').parsley().validate()){

	        	var userEdit = {
	    				idUser: document.getElementById("user2").value,
	    				idRole: document.getElementById("role2").value,

	    		}
	    		console.log(userEdit);
	    	}

	        $.ajax({
	            url: '/api/userandrole/'+ idUser2,
	            method: 'put',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(userEdit),	
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	tableUser.create();
	                	tableBiodata.create();
	                    $('#modal-edit-userroles').modal('hide')

	                } else {

	                }
	            },
	            error: function(xhr, status, error) {
	          	  var err = eval("(" + xhr.responseText + ")");
	          	  console.log(err.Message);
	            }
	        });


	    },
	    deleteData: function (id) {
	    	
	    	//console.log(id);
//	    	var idArr = id.split(',');
	    	//console.log(id[2]);
	    	if (confirm('Are you sure you want to delete this data?')) {    	
	        $.ajax({
	            url: '/api/userandrole/' + id,
	            method: 'delete',
//	            contentType: 'application/json',
//	            dataType: 'json',
	            success: function (res, status, xhr) {
//	                if (xhr.status == 200 || xhr.status == 201) {
	                	  tableUser.create();
	                	  tableBiodata.create();
//	  	            		toastr.success('The data has been removed.');

//	                    $('#form-biodata').fromJSON(JSON.stringify(res));
//	                    $('#modal-biodata').modal('show')

//	                }
	            },
	            error: function(xhr, status, error) {
	        	  var err = eval("(" + xhr.responseText + ")");
	        	  console.log(err.Message);
	            }
	        });
	      }
	    
	    }

	};

// TABEL BRANCH ACCESS
var idEditBranchAccess;
$('#btn-update-branchaccess').click(function () {
    formBranchAccess.editUser(idEditBranchAccess);
})

var tableBranchAccess = {
	    create: function () {
	        // jika table tersebut datatable, maka clear and destroy
	        if ($.fn.DataTable.isDataTable('#tableBranchAccess')) {
	            // table yg sudah dibentuk menjadi datatable harus di-rebuild lagi
				// untuk di-instansiasi-ulang
	            $('#tableBranchAccess').DataTable().clear();
	            $('#tableBranchAccess').DataTable().destroy();
	        }

	        $.ajax({
	            url: '/api/branchaccess/getAll',
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#tableBranchAccess').DataTable({
	                        data: res,
	                        columns: [
	                               {
	                                   title: "ID Branch Access",
	                                   data: "idBranchaccess"
	                               },
	                               {
									   title: "ID User",
									   data: "idUser"
								   },
								   {
									   title: "ID Cabang",
									   data: "idCabang"
								   },
								   {
									   title: "Nama Cabang",
									   data: "namaCabang"
								   },
	                               {
	                                title: "Action",
	                                data: null,
	                                render: function (data, type, row) {
	                                    return "<button class='btn btn-primary btn-sm' onclick=formBranchAccess.setEditData('" + data.idBranchaccess + "')><i class='fa fa-fw fa-edit'></i></button>" +
	                                    	   "<button class='btn btn-danger btn-sm' onclick=formBranchAccess.deleteData('" + data.idBranchaccess + "')><i class ='nav-icon fas fa-trash'></i></button>"
	                               }

	                            }
	                        ]
	                    });

	                } else {

	                }
	            },
	            error: function(xhr, status, error) {
	            	  var err = eval("(" + xhr.responseText + ")");
	            	  console.log(err.Message);
	      	    }
	        });


	    }
	};

var formBranchAccess = {
	    resetForm: function () {
	        $('#form-branchaccess')[0].reset();
	    },
	    saveForm: function () {
	    	console.log('true');
	        if ($('#form-branchaccess').parsley().validate()) {
	            var dataResult = getJsonForm($("#form-branchaccess").serializeArray(), true);

	           console.log(dataResult);
	           
	            $.ajax({
	                url: '/api/branchaccess',
	                method: 'post',
	                contentType: 'application/json',
	                dataType: 'json',
	                data: JSON.stringify(dataResult),
	                success: function (res, status, xhr) {
	                    if (xhr.status == 200 || xhr.status == 201) {
	                        tableBranchAccess.create();
		                	  tableBiodata.create();
	                        $('#modal-branchaccess').modal('hide')
	            			$('#form-branchaccess').parsley().reset()

	                    } else {

	                    }
	                },
	                error: function(xhr, status, error) {
	              	  var err = eval("(" + xhr.responseText + ")");
	              	  console.log(err.Message);
	                }
	            });
	        }
	    },
	    setEditData: function (idCabang3) {
	    	formBranchAccess.resetForm();
	    	idEditBranchAccess = idCabang3;

	        $.ajax({
	            url: '/api/branchaccess/' + idCabang3,
	            method: 'get',
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#form-edit-branchaccess').fromJSON(JSON.stringify(res));
	                    $('#modal-edit-branchaccess').modal('show')
	        			$('#form-edit-branchaccess').parsley().reset()

	                } else {

	                }
	            },
	            error: function(xhr, status, error) {
	          	  var err = eval("(" + xhr.responseText + ")");
	          	  console.log(err.Message);
	            }
	        });


	    },
	    editUser: function (idUser3) {
	    	if ($('#form-edit-branchaccess').parsley().validate()){

	        	var userEdit = {
	    				idUser: document.getElementById("user22").value,
	    				idCabang: document.getElementById("branch2").value,

	    		}
	    		console.log(userEdit);
	    	}

	        $.ajax({
	            url: '/api/branchaccess/'+ idUser3,
	            method: 'put',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(userEdit),	
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	tableBranchAccess.create();
	                    $('#modal-edit-branchaccess').modal('hide')

	                } else {

	                }
	            },
	            error: function(xhr, status, error) {
	          	  var err = eval("(" + xhr.responseText + ")");
	          	  console.log(err.Message);
	            }
	        });


	    },
	    deleteData: function (id) {
	    	
	    	//console.log(id);
//	    	var idArr = id.split(',');
	    	//console.log(id[2]);
	    	if (confirm('Are you sure you want to delete this data?')) {    	
	        $.ajax({
	            url: '/api/branchaccess/' + id,
	            method: 'delete',
//	            contentType: 'application/json',
//	            dataType: 'json',
	            success: function (res, status, xhr) {
//	                if (xhr.status == 200 || xhr.status == 201) {
	                	  tableBranchAccess.create();
	                	  tableBiodata.create();
//	  	            		toastr.success('The data has been removed.');

//	                    $('#form-biodata').fromJSON(JSON.stringify(res));
//	                    $('#modal-biodata').modal('show')

//	                }
	            },
	            error: function(xhr, status, error) {
	        	  var err = eval("(" + xhr.responseText + ")");
	        	  console.log(err.Message);
	            }
	        });
	      }
	    
	    }

	};

	