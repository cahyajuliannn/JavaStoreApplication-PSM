var idEdit;
$('#btn-update-biodata').click(function () {
    formBiodata.editUser(idEdit);
})

var tableBiodata = {
    create: function () {
        // jika table tersebut datatable, maka clear and destroy
        if ($.fn.DataTable.isDataTable('#tableBiodata')) {
            // table yg sudah dibentuk menjadi datatable harus di-rebuild lagi
			// untuk di-instansiasi-ulang
            $('#tableBiodata').DataTable().clear();
            $('#tableBiodata').DataTable().destroy();
        }

        $.ajax({
            url: '/api/roleuser/getAll',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableBiodata').DataTable({
                        data: res,
                        columns: [
                               {
                                   title: "ID Role",
                                   data: "idRole"
                               },
							   {
								   title: "Role User",
								   data: "role"
							   },
                               {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                    return "<button class='btn btn-primary btn-sm' onclick=formBiodata.setEditData('" + data.idRole + "')><i class='fa fa-fw fa-edit'></i></button>" +
                                    	   "<button class='btn btn-danger btn-sm' onclick=formBiodata.deleteData('" + data.idRole + "')><i class ='nav-icon fas fa-trash'></i></button>"
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
        if ($('#form-biodata').parsley().validate()) {
            var dataResult = getJsonForm($("#form-biodata").serializeArray(), true);

           console.log(dataResult);
           
            $.ajax({
                url: '/api/roleuser',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataResult),
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableBiodata.create();
                        $('#modal-biodata').modal('hide')
            			$('#form-biodata').parsley().reset()

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
            url: '/api/roleuser/' + idCabang,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#form-edit-biodata').fromJSON(JSON.stringify(res));
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

        	var userEdit = {

    			role: document.getElementById("roleuser2").value

    		}
    		console.log(userEdit);
    	}

        $.ajax({
            url: '/api/roleuser/'+ idUser2,
            method: 'put',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(userEdit),	
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                	tableBiodata.create();
                    $('#modal-edit-biodata').modal('hide')

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
    	if (confirm('Are you sure you want to delete this data?')) {    	
        $.ajax({
            url: '/api/roleuser/' + id,
            method: 'delete',
//            contentType: 'application/json',
//            dataType: 'json',
            success: function (res, status, xhr) {
//                if (xhr.status == 200 || xhr.status == 201) {
                	  tableBiodata.create();
//  	            		toastr.success('The data has been removed.');

//                    $('#form-biodata').fromJSON(JSON.stringify(res));
//                    $('#modal-biodata').modal('show')

//                }
            },
            error: function(xhr, status, error) {
        	  var err = eval("(" + xhr.responseText + ")");
        	  console.log(err.Message);
            }
        });
      }
    
    }


};