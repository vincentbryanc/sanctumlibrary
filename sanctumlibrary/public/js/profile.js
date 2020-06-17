$(function() {

    //****************************
    /* Variable */
    //****************************
    var updateUserProfileAPI = '/api/profile';
    var userId = $('#user_id').val();

    //****************************
    /* Update Profile */
    //****************************
    $('#frmProfile').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            beforeSend: function() {
                $("#frmProfile .btn-success").attr("disabled", true);
                $("#frmProfile .btn-success").text("Updating...Please wait!");
            },
            url: updateUserProfileAPI + '/' + userId,
            method: "POST",
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            dataType: "json",
            success:function(data)
            {
                var html = '';
                $("#frmProfile .btn-success").attr("disabled", false);
                $("#frmProfile .btn-success").html("Update Profile");
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
                    Swal.fire({
                        title: "SUCCESS!",   
                        text: "Data Successfully saved!",   
                        type: "success",
                        confirmButtonText: "OK",
                        onClose: () => {
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
});