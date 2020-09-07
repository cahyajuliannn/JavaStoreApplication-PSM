var formLogin = {
    resetLogin: function () {
        $('#form-login')[0].reset();
    },
    saveLogin: function () {
    	
        if ($('#form-login').parsley().validate()) {
            var dataResult = getJsonForm($("#form-login").serializeArray(), true);

           console.log(dataResult);
           
            $.ajax({
                url: '/api/user/check-user',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataResult),
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
//                        tableBiodata.create();
//                        $('#modal-login').modal('hide')
            			$('#form-login').parsley().reset()
            			console.log(res);
                        
                        if(res) { // if true
                        	window.location.replace("http://localhost:1212/barang")
                        	
                        } else {
                        	
                        	window.alert("Either your username or password was incorrect. Please try again.");
                        }
                        
                    } else {
                    	console.log('check2');

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

