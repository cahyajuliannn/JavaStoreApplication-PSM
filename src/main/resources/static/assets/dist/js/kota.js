var formKota = {
		resetForm: function () {
	        $('#form-kota')[0].reset();
	    },
		saveForm: function () {
			if ($('#form-kota').parsley().validate()) {
				var dataKota = getJsonForm($("#form-kota").serializeArray(), true);
				console.log(dataKota);
			
				 $.ajax({
		                url: '/api/detailcust',
		                method: 'post',
		                contentType: 'application/json',
		                dataType: 'json',
		                data: JSON.stringify(dataKota),	// ganti dataResult -> dataCustomer
		                success: function (res, status, xhr) {
		                    if (xhr.status == 200 || xhr.status == 201) {
		                        $('#modal-kota').modal('hide')
//		                        location.reload();

		                    } else {

		                    }
		                },
		                erorrr: function (err) {
		                    console.log(err);
		                }
		            });
				
			}
		}
}