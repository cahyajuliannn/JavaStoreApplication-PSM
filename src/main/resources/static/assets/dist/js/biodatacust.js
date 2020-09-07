var idEdit;
$("#btn-edit-biodata").click(function () {
	formBiodata.editForm(idEdit);
});

var idDelete;


var tableBiodata = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableBiodata')) {
            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
            $('#tableBiodata').DataTable().clear();
            $('#tableBiodata').DataTable().destroy();
        }

        $.ajax({
            url: '/api/customer',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableBiodata').DataTable({
                        data: res,
                        columns: [
                            {
                                title: "Nama Lengkap",
                                data: "nama"
                            },
                            {
                                title: "Email",
                                data: "email"
                            },
                            {
                                title: "Alamat",
                                data: "alamat"
                            },
                            {
                                title: "Kota/Kabupaten",
                                data: "kota"
                            },
                            {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                	//console.log(data);
                                    return "<button class='btn btn-primary btn-sm' onclick=formBiodata.setEditData('" + data.id + "')><i class='fas fa-edit'></i></button><button class='btn btn-danger btn-sm' onclick=formBiodata.deleteData('" + data.id + "') id='del'><i class='fas fa-trash-alt'></i></button>"
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

var formBiodata = {
    resetForm: function () {
        $('#form-biodata')[0].reset();
    },
    saveForm: function () {
        if ($('#form-biodata').parsley().validate()) {
//            var dataResult = getJsonForm($("#form-biodata").serializeArray(), true);
//            console.log(dataResult);
            
            var sel = document.getElementById("selectID"); 		// id="selectID" utk select option
            var id = sel.options[sel.selectedIndex].id;		// id dari option yg diselect/dipilih
            
            console.log( sel.options[sel.selectedIndex].value );
            
            var myRefData = {
//            		kota : sel.options[sel.selectedIndex].value	
            		kddati2 : id
            };
            
            var dataCustomer = {
            		nama: document.getElementById("name").value,
            		email: document.getElementById("email").value,
            		alamat: document.getElementById("address").value,
            		detailCustomer: myRefData	// objek DetailCustomer di entity Customer.
            }
            
            console.log(dataCustomer);
            
            $.ajax({
                url: '/api/customer',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataCustomer),	// ganti dataResult -> dataCustomer
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableBiodata.create();
                        $('#modal-biodata').modal('hide');
                        

                    } else { 

                    } 
                },
                erorrr: function (err) {
                    console.log(err);
                } 
            }); 
        } 
    }
    , setEditData: function (idCabang) {	// tombol Edit hanya utk tampilin data yg udah terisi & show modal
        formBiodata.resetForm();
        idEdit = idCabang;		// new, supaya idCabang bisa dibawa ke fungsi editForm
        
        $.ajax({
            url: '/api/customer/' + idCabang,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#form-biodata2').fromJSON(JSON.stringify(res));
                	$('#form-biodata2').parsley().reset();	// reset parsley dahulu supaya hijau hilang sebelum modal muncul
                    $('#modal-biodata2').modal('show')

                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });


    }, editForm: function (idCabang) {
    	if ($('#form-biodata2').parsley().validate()) {
	    	var sel = document.getElementById("selectID2"); 		
	        var id = sel.options[sel.selectedIndex].id;		
	        
	        console.log( sel.options[sel.selectedIndex].value );
	        
	        var myRefData = {
	        		kddati2 : id
	        };
	        
	        var dataCustomer = {
	        		nama: document.getElementById("name2").value,
	        		email: document.getElementById("email2").value,
	        		alamat: document.getElementById("address2").value,
	        		detailCustomer: myRefData	// objek DetailCustomer di entity Customer.
	        }
	        
	        console.log(dataCustomer);
	        
	        $.ajax({
	            url: '/api/customer/' + idCabang,
	            method: 'put',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(dataCustomer),	// ganti dataResult -> dataCustomer
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    tableBiodata.create();
	                    $('#modal-biodata2').modal('hide');
	                    
	
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
    	if (confirm('Anda yakin ingin menghapus data ini?')) {
	    	$.ajax({
	            url: '/api/customer/' + idCabang,
	            method: 'delete',
	           /* contentType: 'application/json',
	            dataType: 'json',*/
	            success: function (res, status, xhr) {
	            	tableBiodata.create();
	            },
	            error: function(xhr, status, error) {
	        	  console.log(error);
	        	  console.log(status);
	            }
	        });
    	}
    }
};


var populateCombo = {
		getAllKota: function () {
			$.ajax({
				url: '/api/detailcust',
				method: 'get',
				contentType: 'application/json',
				dataType: 'json',
				success: function (res, status, xhr) {
					var dynamicSelect = document.getElementById("selectID");
					res.forEach(element => {
					
						var newOption = document.createElement("option");
						newOption.setAttribute("id", element.kddati2);		// kd_dati2 sebagai id dari element option
						newOption.text = element.kota;
						dynamicSelect.add(newOption);
					});
				},
				erorrr: function (err) {
	                console.log(err);
	            }
			});
		}
}

var populateCombo2 = {
		getAllKota: function () {
			$.ajax({
				url: '/api/detailcust',
				method: 'get',
				contentType: 'application/json',
				dataType: 'json',
				success: function (res, status, xhr) {
					var dynamicSelect = document.getElementById("selectID2");
					res.forEach(element => {
					
						var newOption = document.createElement("option");
						newOption.setAttribute("id", element.kddati2);		// kd_dati2 sebagai id dari element option
						newOption.text = element.kota;
						dynamicSelect.add(newOption);
					});
				},
				erorrr: function (err) {
	                console.log(err);
	            }
			});
		}
}

$(document).ready(function () {
	populateCombo.getAllKota();
	populateCombo2.getAllKota();
})
