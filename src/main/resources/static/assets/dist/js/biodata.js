$("#mySelect").select2();


var tableCustomer = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableCustomer')) {
            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
            $('#tableCustomer').DataTable().clear();
            $('#tableCustomer').DataTable().destroy();
        }

        $.ajax({
            url: '/api/biodataCustomer/getAll',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableCustomer').DataTable({
                        data: res,
                        columns: [
                            {
                                title: "ID",
                                data: "idBiodata"
                            },
                            {
                                title: "No Customer",
                                data: "idCustomer"
                            },
                            {
                                title: "Nama",
                                data: "namaLengkap"
                            },
                            {
                            	title: "Alamat",
                            	data: "alamat"
                            },
                            {
                            	title: "Kota/kabupaten",
                            	data: "kotaLokasi"
                            },
                            {
                            	title: "Tanggal Lahir",
                            	data: null,
                            	render : function(data,type,row){
                            		namaBln = ["Januari","Februari","Maret","April","Mei","Juni",
                            			"Juli","Agustus","September","Oktober","November","Desember"];
                            		tgl = new Date(data.tglLahir)
                            		tglLahirTampil = tgl.getDate()+" "+namaBln[tgl.getMonth()]+" "+tgl.getFullYear()
                            		return tglLahirTampil
                            	}
                            },
//                            {
//                            	title: "Email",
//                            	data: "email"
//                            },
//                            {
//                            	title: "No HP",
//                            	data: "noHandphone"
//                            },
                           /* {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                    return "<button class='btn-primary' onclick=formCustomer.setEditData('" + data.idCustomer + "')>Edit</button>" +
                                    	   "<button class= 'btn-danger' onclick=formCustomer.setDeleteData('" + data.idCustomer + "')>Delete</button>"
                                }
                            }*/
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
	            url: '/api/biodatauser/getAll',
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#tableBiodata').DataTable({
	                        data: res,
	                        columns: [
	                        		{
	                                   title: "ID",
	                                   data: "idBiodata"
	                               },
	                               {
	                                   title: "No User",
	                                   data: "idUser"
	                               },
	                               {
	                                   title: "Nama Lengkap",
	                                   data: "namaLengkap"
	                               },
	                               {
									   title: "Alamat",
									   data: "alamat"
								   },
								   {
									   title: "Kota/Kabupaten",
									   data: "kotaLokasi"
								   },
	                               		{
									   title: "Tanggal Lahir",
									   data: null,
		                            	render : function(data,type,row){
		                            		namaBln = ["Januari","Februari","Maret","April","Mei","Juni",
		                            			"Juli","Agustus","September","Oktober","November","Desember"];
		                            		tgl = new Date(data.tglLahir)
		                            		tglLahirTampil = tgl.getDate()+" "+namaBln[tgl.getMonth()]+" "+tgl.getFullYear()
		                            		return tglLahirTampil
		                            	}
								   },
								   
								   {
									   title: "Email",
									   data: "email"
								   },
								   {
									   title: "Nomor HP",
									   data: "noHandphone"
								   },
								   /*{
									   title: "Role",
									   data: "role"
								   },*/
//								   {
//	                                   title: "Username",
//	                                   data: "username"
//	                               },
//	                               {
//									   title: "Password",
//									   data: "password"
//								   },
	                               /*{
	                                title: "Action",
	                                data: null,
	                                render: function (data, type, row) {
	                                    return "<button class='btn-warning' onclick=formBiodata.setEditData('" + data.idUser + "')><i class='fa fa-fw fa-edit'></i></button>" +
	                                    	   "<button class='btn-danger' onclick=formBiodata.deleteData('" + data.idBiodata + ',' + data.idRole + ',' + data.idUser + "')><i class ='nav-icon fas fa-trash'></i></button>"
	                               }

	                            }*/
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

var formCustomer = {
    resetForm: function () {
        $('#form-customer')[0].reset();
    },
    saveForm: function () {
        if ($('#form-customer').parsley().validate()) {
            var dataResult = getJsonForm($("#form-customer").serializeArray(), true);
            $.ajax({
                url: '/api/biodataCustomer/',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataResult),
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableCustomer.create();
                        $('#modal-customer').modal('hide')

                    } else {

                    }
                },
                erorrr: function (err) {
                    console.log(err);
                }
            });
        }
    }, setEditData: function (idCabang) {
        formCustomer.resetForm();

        $.ajax({
            url: '/api/biodataCustomer/' + idCabang,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#form-customer').fromJSON(JSON.stringify(res));
                    $('#mySelect').val(res.kotaLokasi).trigger('change');;
                    $('#modal-customer').modal('show')

                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });


    },	setDeleteData: function (idCek) {
        formCustomer.resetForm();
        if (confirm("Hapus data?")){
        	var row = $(this).closest("tr");
        }
        
        $.ajax({
            url: '/api/biodataCustomer/delete/' +idCek,
            method: 'delete',
            contentType: 'application/json',
            dataType: 'json',
            cache: false,
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    row.remove();

                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        })
        location.reload();


    },

};