$("#mySelect").select2();

$('#modal-customer').on('hidden.bs.modal', function () {
	listJenisContact = []
});

$('#modal-customerEdit').on('hidden.bs.modal', function () {
	getContact = []
});

var valueFilter = $("#inputFilterNama").val();
var valueFilterJamBuka = $("#inputFilterKota").val();

document.onkeypress = function(e){
	modalCustomer = $('#modal-customer').hasClass('in')
	if(modalCustomer = true && e.keyCode == 13){
		$('#btn-save-customer').click()
	}
};


//punya buat nambah customer baru
var tableCustomer = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableCustomer')) {
            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
            $('#tableCustomer').DataTable().clear();
            $('#tableCustomer').DataTable().destroy();
        }
        
        $('#inputFilterNama').val('');
        $('#inputFilterKota').val('');

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
                                data: "idCustomer"
                            },
                            {
                                title: "Nama",
                                data: "namaLengkap"
                            },
                            
                            {
                            	title: "Kota/kabupaten",
                            	data: "kotaLokasi"
                            },
                            
//                            {
//                            	title: "Kontak",
//                            	data: null,
//                            	render: function(data,type,row){
//                            	var kontakList = [], output = [], i;
//                        	for( i=0; i< data.contactBiodata.length; i++) {
//                            if( kontakList[data.contactBiodata[i].jenisCP]) continue;
//                            kontakList[data.contactBiodata[i].jenisCP] = true;
//                            output.push(data.contactBiodata[i].jenisCP);
//                            //untuk ngapus duplicate
//                        		}
//                            		var instagramArr = []
//                            		for (var i = 0; i < output.length; i++){
//                            			instagramArr.push(" "+ output[i])
//                            		}
//                            		return instagramArr
//                            	}
//                            	
//                            },
                            {
                            	title: "Tanggal Bergabung",
                            	data: null,
                            	render: function(data,type,row){
                            		namaBulan=["Januari","Februari","Maret","April","Mei","Juni",
		                            			"Juli","Agustus","September","Oktober","November","Desember"];
                            		tanggal = new Date(data.tglMasuk)
                            		tglMasukTampil = tanggal.getDate()+" "+namaBulan[tanggal.getMonth()]+" "+tanggal.getFullYear()
                            		return tglMasukTampil
                            	}
                            },
                            {
                            	title: "Tanggal Expired",
                            	data: null,
                            	render: function(data,type,row){
                            		namaBulan2 = ["Januari","Februari","Maret","April","Mei","Juni",
                        						"Juli","Agustus","September","Oktober","November","Desember"];
                    				tanggal2 = new Date(data.tglKeluar)
                    				tglKeluarTampil = tanggal2.getDate()+" "+namaBulan2[tanggal2.getMonth()]+" "+tanggal2.getFullYear()
                    				return tglKeluarTampil
                            	}
                            },
                            {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                    return "<button class='btn-primary' onclick=formCustomerEdit.setEditData('" + data.idBiodata + "')>Edit</button>" +
                                    	   "<button class= 'btn-danger' onclick=formCustomer.setDeleteData('" + data.idCustomer + "')>Delete</button>" +
                                    	   "<button class= 'btn-default' onclick=formTampil.setTampil('" + data.idBiodata + "')>Detail</button>"
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
    },
filterable: function () {
    	
    	valueFilter = $("#inputFilterNama").val();
        valueFilterJamBuka = $("#inputFilterKota").val();
        
        if(valueFilter == [''] || valueFilterJamBuka == ['']) {
        	var message = "&nbsp"+ "&nbsp"+"Anda belum input data pencarian secara lengkap"
			toast.create(message);
        } else {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableCustomer')) {
            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
            $('#tableCustomer').DataTable().clear();
            $('#tableCustomer').DataTable().destroy();
            console.log(valueFilter)
        }
        
     var nomor=0;
       
        $.ajax({
            url: '/api/biodataCustomer/search/' + valueFilter +'/'+ valueFilterJamBuka,
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                	$('#tableCustomer').DataTable({
                        data: res,
                        columns: [
                            {
                                title: "ID",
                                data: "idCustomer"
                            },
                            {
                                title: "Nama",
                                data: "namaLengkap"
                            },
                            
                            {
                            	title: "Kota/kabupaten",
                            	data: "kotaLokasi"
                            },
                            {
                            	title: "Tanggal Bergabung",
                            	data: null,
                            	render: function(data,type,row){
                            		namaBulan=["Januari","Februari","Maret","April","Mei","Juni",
		                            			"Juli","Agustus","September","Oktober","November","Desember"];
                            		tanggal = new Date(data.tglMasuk)
                            		tglMasukTampil = tanggal.getDate()+" "+namaBulan[tanggal.getMonth()]+" "+tanggal.getFullYear()
                            		return tglMasukTampil
                            	}
                            },
                            {
                            	title: "Tanggal Expired",
                            	data: null,
                            	render: function(data,type,row){
                            		namaBulan2 = ["Januari","Februari","Maret","April","Mei","Juni",
                        						"Juli","Agustus","September","Oktober","November","Desember"];
                    				tanggal2 = new Date(data.tglKeluar)
                    				tglKeluarTampil = tanggal2.getDate()+" "+namaBulan2[tanggal2.getMonth()]+" "+tanggal2.getFullYear()
                    				return tglKeluarTampil
                            	}
                            },
                            {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                    return "<button class='btn-primary' onclick=formCustomerEdit.setEditData('" + data.idBiodata + "')>Edit</button>" +
                                    	   "<button class= 'btn-danger' onclick=formCustomer.setDeleteData('" + data.idCustomer + "')>Delete</button>" +
                                    	   "<button class= 'btn-default' onclick=formTampil.setTampil('" + data.idBiodata + "')>Detail</button>"
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
    }
};

function editContactBaru(accountName, idContact){
	decodeURIComponent(idContact);
	currentAkunNama = accountName;
	document.getElementById("idContact").value = idContact;
	console.log(decodeURIComponent(idContact));
	document.getElementById("dataEdit").value = accountName;
}

var tableContactEdit = {
	    create: function (riana) {
	        // jika table tersebut datatable, maka clear and dostroy
	        if ($.fn.DataTable.isDataTable('#tableContactEdit')) {
	            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
	            $('#tableContactEdit').DataTable().clear();
	            $('#tableContactEdit').DataTable().destroy();
	        }

	            $('#tableContactEdit').DataTable({
	                data: riana,
	                columns: [
		                {
		                	title: "Jenis Contact",
		                	data: "jenisCP",
		                },
		                {
		                	title: "Username/Nomor",
		                	data: "accountName"
		                },
		                {
	                        title: "Action",
	                        data: null,
	                        render: function (data, type, row) {
	                            return "<button class='btn-danger' onclick=formCustomerEdit.setDeleteData('" + data.idContact + "') type='button'>Delete</button>"+
	                            "<button class='btn-primary' onclick=editContactBaru('"+data.accountName+"','"+encodeURIComponent(data.jenisCP)+"') type='button'>Edit</button>"
	                        }
	                    } 
	                ]
	            });
	            
	            console.log(getContact);
	            
		    }, setData : function(idAmbil){
	        $.ajax({
	            url: '/api/biodataCustomer/' + idAmbil,
	            method: 'get',
	            contentType: 'application/json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
		                    tableContactEdit.create(res.contactBiodata)
		                    console.log(res);
		                    $('#modal-tableEdit').modal('show');
	                } else {

	                }
	            },
	            erorrr: function (err) {
	                console.log(err);
	            }
	        });
		}
	};

var listJenisContact = []
var listSementara = []
var getContact = []
var currentAkunNama;
var formCustomer = {
    resetForm: function () {
        $('#form-customer')[0].reset();
        $('#form-customer').parsley().reset();
    },
    saveForm: function () {
        if ($('#form-customer').parsley().validate()) {
//            var dataResult = getJsonForm($("#form-customer").serializeArray(), true);
//            console.log(JSON.stringify(dataResult));
        	
        	var dataHasil = {
        		idBiodata : document.forms["form-customer"]["idBiodata"].value,
        		idCustomer : document.forms["form-customer"]["idCustomer"].value,
        		idAkun : document.forms["form-customer"]["idAkun"].value,
        		idContact: document.forms["form-customer"]["idContact"].value,
	        	namaLengkap : document.forms["form-customer"]["namaLengkap"].value,
	        	kotaLokasi : document.forms["form-customer"]["kotaLokasi"].value,
	        	alamat : document.forms["form-customer"]["alamat"].value,
	        	tglLahir : document.forms["form-customer"]["tglLahir"].value,
	        	idBank : document.forms["form-customer"]["namaBank"].value,
	        	noRekening : document.forms["form-customer"]["noRekening"].value,
	        	tglMasuk : document.forms["form-customer"]["tglMasuk"].value,
	        	tglKeluar : document.forms["form-customer"]["tglKeluar"].value,
	        	contactBiodata : listJenisContact
        		}
        	console.log(JSON.stringify(dataHasil))
        	
            $.ajax({
                url: '/api/biodataCustomer/',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataHasil),
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
                    $('#mySelect').val(res.kotaLokasi).trigger('change');
                    tableSementara.create(res.contactBiodata)
                    $('#modal-customer').modal('show');      
                    console.log(res);

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
        
        $.ajax({
            url: '/api/biodataCustomer/deleteAll/' +idCek,
            method: 'delete',
            contentType: 'application/json',
//            dataType: 'json',
//            cache: false,
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    tableCustomer.create();

                } else {

                }
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseJSON));
            }
        })
//        tableSementaraEdit.create(contactBiodata)
    }
  }
};

var tableSementara = {
		resetForm: function () {
	        $('#form-customer')[0].reset();
	        $('#form-customer').parsley().reset();
		},
	    create: function (riana) {
	        // jika table tersebut datatable, maka clear and dostroy
	        if ($.fn.DataTable.isDataTable('#tableSementara')) {
	            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
	            $('#tableSementara').DataTable().clear();
	            $('#tableSementara').DataTable().destroy();
	        }

            $('#tableSementara').DataTable({
                data: riana,
                bSortTable : false,
                columns: [
	                {
	                	title: "Jenis Contact",
	                	data: "jenisCP",
	                },
	                {
	                	title: "Username/Nomor",
	                	data: "accountName"
	                },
	                {
                        title: "Action",
                        data: null,
                        render: function (data, type, row) {
                            return "<button class='haha btn-danger' type='button'>Delete</button>"
                         
                        }
                    }
                ]
            });
	    }
    };

//buat nambah customer baru selesai disini

//buat ngedit customer yang udah masuk database
var formCustomerEdit = {
	    resetForm: function () {
	        $('#form-customerEdit')[0].reset();
	        $('#form-customerEdit').parsley().reset();
	    },
	    saveFormContact: function () {
	        if ($('#form-customerEdit').parsley().validate()) {
//	            var dataResult = getJsonForm($("#form-customer").serializeArray(), true);
//	            console.log(JSON.stringify(dataResult));
	        	var dataHasil = {
	        		idBiodata : document.forms["form-customerEdit"]["idBiodata"].value,
	        		idCustomer : document.forms["form-customerEdit"]["idCustomer"].value,
	        		idAkun : document.forms["form-customerEdit"]["idAkun"].value,
		        	namaLengkap : document.forms["form-customerEdit"]["namaLengkap"].value,
		        	kotaLokasi : document.forms["form-customerEdit"]["kotaLokasi"].value,
		        	alamat : document.forms["form-customerEdit"]["alamat"].value,
		        	tglLahir : document.forms["form-customerEdit"]["tglLahir"].value,
		        	idBank : document.forms["form-customerEdit"]["namaBank"].value,
		        	noRekening : document.forms["form-customerEdit"]["noRekening"].value,
		        	tglMasuk : document.forms["form-customerEdit"]["tglMasuk"].value,
		        	tglKeluar : document.forms["form-customerEdit"]["tglKeluar"].value,
		        	contactBiodata : getContact
	        		}
	        	console.log(JSON.stringify(dataHasil))
	        	
	            $.ajax({
	                url: '/api/biodataCustomer',
	                method: 'post',
	                contentType: 'application/json',
	                dataType: 'json',
	                data: JSON.stringify(dataHasil),
	                success: function (res, status, xhr) {
	                    if (xhr.status == 200 || xhr.status == 201) {
	                        tableCustomer.create();
	                        $('#modal-customerEdit').modal('hide')

	                    } else {

	                    }
	                },
	                erorrr: function (err) {
	                    console.log(err);
	                }
	            });
	        }
	    },
	    saveForm: function () {
	        if ($('#form-customerEdit').parsley().validate()) {
//	            var dataResult = getJsonForm($("#form-customer").serializeArray(), true);
//	            console.log(JSON.stringify(dataResult));
	        	
	        	var dataHasil = {
	        		idBiodata : document.forms["form-customerEdit"]["idBiodata"].value,
	        		idCustomer : document.forms["form-customerEdit"]["idCustomer"].value,
		        	namaLengkap : document.forms["form-customerEdit"]["namaLengkap"].value,
		        	kotaLokasi : document.forms["form-customerEdit"]["kotaLokasi"].value,
		        	alamat : document.forms["form-customerEdit"]["alamat"].value,
		        	tglLahir : document.forms["form-customerEdit"]["tglLahir"].value,
		        	idBank : document.forms["form-customerEdit"]["namaBank"].value,
		        	noRekening : document.forms["form-customerEdit"]["noRekening"].value,
		        	tglMasuk : document.forms["form-customerEdit"]["tglMasuk"].value,
		        	tglKeluar : document.forms["form-customerEdit"]["tglKeluar"].value,
		        	contactBiodata : listJenisContact
	        		}
	        	console.log(JSON.stringify(dataHasil))
	        	
	            $.ajax({
	                url: '/api/biodataCustomer/',
	                method: 'post',
	                contentType: 'application/json',
	                dataType: 'json',
	                data: JSON.stringify(dataHasil),
	                success: function (res, status, xhr) {
	                    if (xhr.status == 200 || xhr.status == 201) {
	                        tableCustomer.create();
	                        $('#modal-customerEdit').modal('hide')

	                    } else {

	                    }
	                },
	                erorrr: function (err) {
	                    console.log(err);
	                }
	            });
	        }
	    }, setEditData: function (idCabang) {
	        formCustomerEdit.resetForm();
	        document.getElementById("idButton").value = idCabang;
	        var a = $("#idButton").val();
	        console.log(a);

	        $.ajax({
	            url: '/api/biodataCustomer/' + idCabang,
	            method: 'get',
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                    $('#form-customerEdit').fromJSON(JSON.stringify(res));
	                    $('#mySelectEdit').val(res.kotaLokasi).trigger('change');
	                    tableSementaraEdit.create(res.contactBiodata)
	                    console.log(res.contactBiodata);
	                    console.log(getContact);
	                    $('#modal-customerEdit').modal('show');
	                    
	                    for (var i = 0; i < res.contactBiodata.length; i++) {
							var jenisAsal = res.contactBiodata[i].jenisCP
							var akunAsal = res.contactBiodata[i].accountName
							var getContactAsal = {
									jenisCP : jenisAsal,
									accountName : akunAsal
							}
							getContact.push(getContactAsal)
						}
	                    console.log(getContact);
	                    console.log(res);

	                } else {

	                }
	            },
	            erorrr: function (err) {
	                console.log(err);
	            }
	        });
	    },	tambahContactBiodata: function(){
	    	var a = document.forms["form-customerEdit"]["noHandphone"].value;  /*kolom tempat ngisi username, diambil valuenya aja*/
	        var b = document.forms["form-customerEdit"]["email"].value;
	        var c = document.forms["form-customerEdit"]["facebookCP"].value;
	        var d = document.forms["form-customerEdit"]["twitterCP"].value;
	        var e = document.forms["form-customerEdit"]["instagramCP"].value;
	       
	        
	        var jenisKontact;
	        var akun;
	        var jenis;
	        
	        if(a != null && a.length > 0){
	        	jenisKontact = {
	        		jenisCP : "No Handphone",
	        		accountName : a
	        	}
	        	jenis = "No Handphone"
	    		akun = a
	        	getContact.push(jenisKontact)	
	        }
	        if(b != null && b.length > 0){
	        	jenisKontact = {
	        		jenisCP : "Email",
	        		accountName : b	
	        	}
	        	jenis = "Email"
	    		akun = b
	        	getContact.push(jenisKontact)
	        }
	        if(c != null && c.length > 0){
	        	jenisKontact = {
	        		jenisCP : "Facebook",
	        		accountName : c	
	        	}
	        	jenis = "Facebook"
	    		akun = c
	        	getContact.push(jenisKontact)
	        	
	        }
	        if(d != null && d.length > 0){
	        	jenisKontact = {
	        		jenisCP : "Twitter",
	        		accountName : d
	        	}
	        	jenis = "Twitter"
	        	akun = d
	        	getContact.push(jenisKontact)
	        	
	        }
	        if(e != null && e.length > 0){
	        	jenisKontact = {
	        		jenisCP : "Instagram",
	        		accountName : e	
	        	}
	        	jenis = "Instagram"
	        	akun = e
	        	getContact.push(jenisKontact)	
	        }
	        console.log(getContact);
	        
	        tableSementara.create(getContact)
	        $("#noHpIsiEdit").val("")
	        $("#emailIsiEdit").val("")
	        $("#facebookIsiEdit").val("")
	        $("#twitterIsiEdit").val("")
	        $("#instagramIsiEdit	").val("")
	        
	    },
	    
	    setDeleteData: function (idCek) {
	        formCustomerEdit.resetForm();
	        if (confirm("Hapus data?")){
	        
	        $.ajax({
	            url: '/api/biodataCustomer/delete/sementara/' +idCek,
	            method: 'delete',
	            contentType: 'application/json',
//	            dataType: 'json',
//	            cache: false,
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	$('#tableContactEdit').DataTable().clear();
	     	            $('#tableContactEdit').DataTable().destroy();
	                    tableContactEdit.create(getContact);
	                    $('#modal-tableEdit').modal('hide');
	                    $('#modal-customerEdit').modal('hide');

	                } else {

	                }
	            },
	            erorrr: function (err) {
	                console.log(err);
	            }
	        })
	    }  
	  }
	};

var tableSementaraEdit = {
		resetForm: function () {
	        $('#form-customerEdit')[0].reset();
	        $('#form-customerEdit').parsley().reset();
		},
	    create: function (riana) {
	        // jika table tersebut datatable, maka clear and dostroy
	        if ($.fn.DataTable.isDataTable('#tableSementaraEdit')) {
	            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
	            $('#tableSementaraEdit').DataTable().clear();
	            $('#tableSementaraEdit').DataTable().destroy();
	        }

            $('#tableSementaraEdit').DataTable({
                data: riana,
                columns: [
	                {
	                	title: "Jenis Contact",
	                	data: "jenisCP",
	                },
	                {
	                	title: "Username/Nomor",
	                	data: "accountName"
	                },
	                
                ]
            });
	    }
    };
//buat ngedit data yang udah masuk ke database selesai disini

//untuk ngedapetin value yang di input di kolom setiap tabs contact person
function validateForm() {
    var a = document.forms["form-customer"]["noHandphone"].value;  /*kolom tempat ngisi username, diambil valuenya aja*/
    var b = document.forms["form-customer"]["email"].value;
    var c = document.forms["form-customer"]["facebookCP"].value;
    var d = document.forms["form-customer"]["twitterCP"].value;
    var e = document.forms["form-customer"]["instagramCP"].value;
   
    
    var jenisKontact;
    var akun;
    var jenis;
    
    if(a != null && a.length > 0){
    	jenisKontact = {
    		jenisCP : "No Handphone",
    		accountName : a
    	}
    	jenis = "No Handphone"
		akun = a
    	listJenisContact.push(jenisKontact)	
    }
    if(b != null && b.length > 0){
    	jenisKontact = {
    		jenisCP : "Email",
    		accountName : b	
    	}
    	jenis = "Email"
		akun = b
    	listJenisContact.push(jenisKontact)
    }
    if(c != null && c.length > 0){
    	jenisKontact = {
    		jenisCP : "Facebook",
    		accountName : c	
    	}
    	jenis = "Facebook"
		akun = c
    	listJenisContact.push(jenisKontact)
    	
    }
    if(d != null && d.length > 0){
    	jenisKontact = {
    		jenisCP : "Twitter",
    		accountName : d
    	}
    	jenis = "Twitter"
    	akun = d
    	listJenisContact.push(jenisKontact)
    	
    }
    if(e != null && e.length > 0){
    	jenisKontact = {
    		jenisCP : "Instagram",
    		accountName : e	
    	}
    	jenis = "Instagram"
    	akun = e
    	listJenisContact.push(jenisKontact)	
    }
    console.log(listJenisContact);
    
    listJenisContact.sort(sortByProperty("jenisCP"));
    var contactBiodata = {
    		contactBiodata : listJenisContact
    }
    
    tableSementara.create(listJenisContact)
    $("#noHpIsi").val("")
    $("#emailIsi").val("")
    $("#facebookIsi").val("")
    $("#twitterIsi").val("")
    $("#instagramIsi").val("")
    
    console.log(JSON.stringify(contactBiodata))
}

function sortByProperty(property){  
	   return function(a,b){  
	      if(a[property] > b[property])  
	         return 1;  
	      else if(a[property] < b[property])  
	         return -1;  
	  
	      return 0;  
	   }  
	}

//dapetin value setiap kolom di tabs selesai disini

$('#tableSementara').on("click", ".haha",function(){
	rowYangKeDelete = $(this).parents('tr');
	listJenisContact.splice(rowYangKeDelete.index(),1);
	console.log(listJenisContact)
	rowYangKeDelete.remove();
})

//buat gaya gayaan aja
var formTampil = {
	    resetForm: function () {
	        $('#form-tampil')[0].reset();
	        $('#form-tampil').parsley().reset();   
	    },
	    setTampil: function (idtampil) {
	        formCustomer.resetForm();

	        $.ajax({
	            url: '/api/biodataCustomer/' + idtampil,
	            method: 'get',
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (res, status, xhr) {
	                if (xhr.status == 200 || xhr.status == 201) {
	                	tglJs = new Date(res.tglLahir)
	                	tglMsk = new Date(res.tglMasuk)
	                	tglKlr = new Date(res.tglKeluar)
	                	namaBln = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus",
	                		"September","Oktober","November","Desember"];
	                	
	                	tglLahirYgTampil = tglJs.getDate()+" "+namaBln[tglJs.getMonth()]+" "+tglJs.getFullYear()
	                	tglMasukTampil = tglMsk.getDate()+" "+namaBln[tglMsk.getMonth()]+" "+tglMsk.getFullYear()
	                	tglKeluarTampil = tglKlr.getDate()+" "+namaBln[tglKlr.getMonth()]+" "+tglKlr.getFullYear()
	                	/*beri value*/
	                		                	
	                    $('#form-tampil').fromJSON(JSON.stringify(res));
	                    $('#modal-tampil').modal('show')
	                    console.log(res);
	                    
	                    document.getElementById("akunNama").innerHTML = res.namaLengkap
	                    document.getElementById("akunNama3").innerHTML = res.namaLengkap
	                    document.getElementById("address3").innerHTML = res.alamat;
	                    document.getElementById("kotaLokasi3").innerHTML = res.kotaLokasi;
	                    document.getElementById("birthDate3").innerHTML = tglLahirYgTampil;
//	                    document.getElementById("phoneNumber3").innerHTML = res.noHandphone;
//                        document.getElementById("akunFacebook").innerHTML = res.facebookCP;
//                        document.getElementById("akunTwitter").innerHTML = res.twitterCP;
//                        document.getElementById("akunInstagram").innerHTML = res.instagramCP;
                        
                        document.getElementById("tglMasuk3").innerHTML = tglMasukTampil;
                        document.getElementById("tglKeluar3").innerHTML = tglKeluarTampil;
                        
//                        document.getElementById("akunFacebook2").innerHTML = res.namaLengkap;
//                        document.getElementById("akunTwitter2").innerHTML = res.namaLengkap;
//                        document.getElementById("akunInstagram2").innerHTML = res.namaLengkap;
                        
//                        document.getElementById("akunFacebook").setAttribute("href", "https://www.facebook.com/" + res.facebookCP);
//                        document.getElementById("akunTwitter").setAttribute("href", "https://www.twitter.com/" + res.twitterCP);
//                        document.getElementById("akunInstagram").setAttribute("href", "https://www.instagram.com/" + res.instagramCP);


	                } else {

	                }
	            },
	            error: function(xhr, status, error) { 
	            	var err = eval("(" + xhr.responseText + ")"); 
	            	console.log(JSON.parse(xhr.responseText)); 
	            }
	        });
	    },
	};

var autoFillDate = {
		create : function(){
			var today = new Date();
			var hari = today.getDate();
			var bulan = today.getMonth()+1;
			var tahun = today.getFullYear();
			
			if (hari<10){
				hari = '0'+hari
			}
			
			if (bulan<10){
				bulan = '0'+bulan
			}
			
			var today = tahun+'-'+bulan+'-'+hari;
			document.getElementById("tglMasuk").value = today;
			var exp =  (tahun + 2)+ '-' + bulan + '-' + hari;
			document.getElementById("tglKeluar").value = exp;
			
		}
};

