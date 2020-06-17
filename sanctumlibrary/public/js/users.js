$(function() {
    
    //****************************
    /* Variable */
    //****************************
	var usersAPI = '/api/users';
	var addUserAPI = '/api/user';
	var viewUserAPI = '/api/user';
	var updateUserAPI = '/api/user';
	var deleteUserAPI = '/api/user';
	var method = '';

	//****************************
    /* On load of page */
    //****************************
	fetch_user();

    //****************************
    /* Add User */
    //****************************
    $('#btnModalUser').on("click", function() {
        $('#form_result').html('');
        $('#frmUser .modal-title').html('<i class="mdi mdi-account-plus mr-2"></i> Add New User');
        $('#frmUser #btnSave').show();
        $('#frmUser #btnSave').html('<i class="ti-save"></i> Save');
        $('#frmUser')[0].reset();
        $('#frmUser #type').val('folder');
        btnValue = $('#btnSave').html();
        url = addUserAPI;
        method = 'POST';
    });

    //****************************
    /* Edit User */
    //****************************
    $(document).on('click', '.btnedit', function() {
        userId = $(this).attr('user_id');
        $('#form_result').html('');
        $('#frmUser .modal-title').html('<i class="mdi mdi-pencil mr-2"></i> Edit User');
        $('#frmUser #btnSave').show();
        $('#frmUser #btnSave').html('<i class="ti-save"></i> Update');
        $('#frmUser')[0].reset();
        btnValue = $('#btnSave').html();
        url = updateUserAPI + '/' + userId;
        method = 'POST';
        $.ajax({
            url: viewUserAPI + '/' + userId,
            dataType: "json",
            success: function(html) {
                $('#frmUser #userid').val(html.data.id);
                $('#frmUser #name').val(html.data.name);
                $('#frmUser #email').val(html.data.email);
                $('#frmUser select[name="role"]').val(html.data.role);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus);
                console.log('errorThrown: ' + errorThrown);
            }
        });
    });

    //****************************
    /* Add / Update User */
    //****************************
    $('#frmUser').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            beforeSend: function() {
                $("#frmUser .btn-success").attr("disabled", true);
                $("#frmUser .btn-success").text("Loading...Please wait!");
            },
            url: url,
            method: method,
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            dataType: "json",
            success:function(data)
            {
                var html = '';
                $("#frmUser .btn-success").attr("disabled", false);
                $("#frmUser .btn-success").html(btnValue);
                if(data.errors)
                {
                    html = '<div class="alert alert-danger">';
                    for(var count = 0; count < data.errors.length; count++)
                    {
                        html += '<p>' + data.errors[count] + '</p>';
                    }
                    html += '</div>';
                }
                if(data.success)
                {
                    // $('#tblUsers').DataTable().ajax.reload();
                    Swal.fire({
                        title: "SUCCESS!",   
                        text: "Data Successfully saved!",   
                        type: "success",
                        confirmButtonText: "OK",
                        onClose: () => {
                            $('#frmUser')[0].reset();
                            $('#modalUser').modal('hide');
                            location.reload();
                        }
                    });
                }
                $('#form_result').html(html);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("textStatus: " + textStatus);
                console.log("errorThrown: " + errorThrown);
                console.log("textStatus: " + textStatus);
            }
        });
    });

    //****************************
    /* Delete User */
    //****************************
    // Delete File / Folder
    $(document).on('click', '.btndelete', function() {
        user_id = $(this).attr('user_id');
        Swal.fire({
            title: 'Are you sure you want to delete this user?',
            text: "Click Confirm to delete.",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    type: 'DELETE',
                    url: deleteUserAPI + '/' + user_id,
                    data: { 
                        user_id: user_id
                    },
                    success: function (data){
                        Swal.fire({
                            title: "Deleted!",   
                            text: 'User has been successfully deleted.',   
                            type: "success",   
                            confirmButtonText: "OK",
                            onClose: () => {
                                location.reload();
                            }
                        });
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
            }
        })
    });

	//****************************
    /* Functions */
    //****************************
	function fetch_user() {
        var role = $('#role').val();
		$.ajax({
			beforeSend: function() {

			},
			dataType: 'json',
			url: usersAPI,
			success: function(users) {
				$.each(users.data, function(keys, data){
                    if(role == 'admin') {
                        $('#tblUsers tbody').append(
                            '<tr>' + 
                                '<td>' + data.name + '</td>' +
                                '<td>' + data.email + '</td>' +
                                '<td>' + 
                                    '<span class="badge badge-info">' + data.role + '</span>' +
                                '</td>' +
                                '<td>' + 
                                    '<button type="button" user_id="' + data.id + '" class="btnedit btn btn-warning btn-sm" data-target="#modalUser" data-toggle="modal">Edit <i class="mdi mdi-pencil" aria-hidden="true"></i></button>' + 
                                    ' <button type="button" user_id="' + data.id + '" class="btndelete btn btn-danger btn-sm" >Delete <i class="mdi mdi-delete" aria-hidden="true"></i></button>' + 
                                '</td>' +
                            "</tr>"
                        );
                    }
                    else {
                        $('#tblUsers tbody').append(
                            '<tr>' + 
                                '<td>' + data.name + '</td>' +
                                '<td>' + data.email + '</td>' +
                                '<td>' + 
                                    '<span class="badge badge-info">' + data.role + '</span>' +
                                '</td>' +
                            "</tr>"
                        );
                    }
				});
			}
	   });
	}
});