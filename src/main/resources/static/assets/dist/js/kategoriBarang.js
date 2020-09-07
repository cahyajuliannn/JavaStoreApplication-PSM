var editK;
$("#btn-edit-kategori").click(function(){
	formKategori.editKategori(editK);
});

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
                                    return "<button class='btn-primary' onclick=formKategori.setEditData('" + data.idKategori + "')>Edit</button>" +
                                    		"<button class='btn-danger' onclick=formKategori.setDeleteData('" + data.idKategori + "')><i class='fa fa-fw fa-trash' data-target='#modal-warning'></i></button>"
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

var formKategori = {
    resetForm: function () {
        $('#form-kategori')[0].reset();
        $('#form-kategori').parsley().reset();
    },
    saveForm: function () {
        if ($('#form-kategori').parsley().validate()) {
//            var dataResult = getJsonForm($("#form-kategori").serializeArray(), true);
            var dataKategori = {
            		namaKategori: document.getElementById("namaK").value
            }
            console.log(dataKategori);
        	$.ajax({
                url: '/api/kategoribarang',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataKategori),
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableKategori.create();
                        $('#modal-kategori').modal('hide');
                        toastr.success('Data berhasil ditambahkan dan disimpan.')


                    } else {

                    }
                },
                erorrr: function (err) {
                    console.log(err);
                }
            });
        }
    },setEditData: function (idKat) {
        formKategori.resetForm();
        editK = idKat; // new, supaya idCabang bisa dibawa ke fungsi editForm

        $.ajax({
            url: '/api/kategoribarang/' + idKat,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
//            	console.log(res);
                if (xhr.status == 200 || xhr.status == 201) {
                	var o = res;
                    $('#form-kategori2').fromJSON(JSON.stringify(res));
                    $('#form-kategori').parsley().reset();
                    $('#modal-kategori2').modal('show');
                    $('namaKategori').val(o.namaK2);

                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });


    }, editKategori: function (idKat) {
    	if($('#form-kategori2').parsley().validate()){
    		editK = idKat;
    		var dataKategori = {
    			namaKategori: document.getElementById("namaK2").value
    		}
    		console.log (dataKategori);
    	}

        $.ajax({
            url: '/api/kategoribarang/' + idKat,
            method: 'put',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(dataKategori),
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                	tableKategori.create();
                    $('#modal-kategori2').modal('hide');
                    toastr.success('Data berhasil diubah dan disimpan.')
                	

                } else {

                }
            },
            erorrr: function (err) {
                console.log(err);
            }
        });


    }, setDeleteData: function (idBarang) {
        formKategori.resetForm();
        if (confirm("Anda yakin ingin menghapus data ini?")) {
//          var row = $(this).closest("tr");
        
        $.ajax({
          url: '/api/kategoribarang/delete/' +idBarang,
          method: 'delete',
//          contentType: 'application/json',
//          dataType: 'json',
//          cache: false,
          success: function (res, status, xhr) {
        	  tableKategori.create();
        	  toastr.success('Data berhasil dihapus.');
//            if (xhr.status ==200 || xhr.status ==201) {
//               tableKategori.create();
//            } else {
//              
//            }
          },
          erorrr: function (xhr, status, err) {
            console.log(err);
            console.log(status);
          }
        })
//        location.reload();
        }
    },
    
};
