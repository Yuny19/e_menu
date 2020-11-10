$("#click-manage-user").click(function () {
    $("#table-user").show();
    $("#table-menu").hide();
    $("#table-order").hide();
    $("#form-add-user").hide();
    $("#form-add-menu").hide();

    $.ajax({
        url: `http://localhost:3000/user/`,
        headers: {
            token: localStorage.getItem('token')
        },
        type: 'GET'
    })
        .done(function ({ data }) {
            let html = '';
            $("#content-user").html(html);
            data.forEach((dt, i) => {
                html = html + '<tr>' +
                    '<td class="text-left py-3 px-4">' + dt.name + '</td>' +
                    '<td class="text-left py-3 px-4">' + dt.email + '</td>' +
                    '<td class="text-left py-3 px-4">' + dt.role + '</td>' +
                    '<td class="text-left py-3 px-4">' + dt.process + '</td>' +
                    '<td class="text-center py-3 px-4"><button id="btn-update-user" value="' + dt._id + '"' +
                    '   class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white bg-green-500 hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"' +
                    '  type="submit">update</button>&nbsp;' +
                    '<button id="btn-delete-user" value="' + dt._id + '"' +
                    ' class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white bg-red-500 hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"' +
                    'type="submit">delete</button>' +
                    '</td>' +
                    '</tr>';
            });

            $("#content-user").append(html);
        })
        .catch(function (error) {
            alert(error.message);
        })
});

$("#cancel-user").click(function () {
    $("#table-user").show();
    $("#form-add-user").hide();
});

$("#btn-add-user").click(function () {
    $("#table-user").hide();
    $("#form-add-user").show();

    clearCookie('_id');
    $("#name-regis").val('');
    $("#email-regis").val('');
    $("#password-regis").val('');
    $('#role-regis option').filter(':selected').val('');
});

$("#save-user").click(function () {
    if (!readCookie('_id')) {
        $.ajax({
            url: `http://localhost:3000/user/`,
            data: {
                name: $("#name-regis").val(),
                email: $("#email-regis").val(),
                password: $("#password-regis").val(),
                role: $('#role-regis option').filter(':selected').val()
            },
            type: 'POST'
        })
            .done(function () {
                alert('user have been created');

                location.reload();
                $("#form-add-user").hide();
                $("#table-user").show();
            })
            .catch(function (error) {
                alert('cant create user')
            })
    } else {
        let id= readCookie('_id');
        $.ajax({
            url: `http://localhost:3000/user/${id}`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                name: $("#name-regis").val(),
                email: $("#email-regis").val(),
                password: $("#password-regis").val(),
                role: $('#role-regis option').filter(':selected').val()
            },
            type: 'PUT'
        })
            .done(function () {
                alert('user have been updated');
                
                location.reload();
                $("#form-add-user").hide();
                $("#table-user").show();
            })
            .catch(function (error) {
                alert('cant update user')
            })
    }

});

// $("#btn-delete-user").on("click", function (event) {
$(document).on("click", "#btn-delete-user", function (event) {
    var id = $(this).val();
    $.ajax({
        url: `http://localhost:3000/user/${id}`,
        headers: {
            token: localStorage.getItem('token')
        },
        type: 'DELETE'
    })
        .done(function (data) {
            location.reload();
            alert('delete success');
        })
        .catch(function (error) {
            alert(error.message);
        })
});

$(document).on("click", "#btn-update-user", function (event) {
    $("#form-add-user").show();
    $("#table-user").hide();

    let id = $(this).val();
    document.cookie = '_id = ' + id;
    $.ajax({
        url: `http://localhost:3000/user/${id}`,
        headers: {
            token: localStorage.getItem('token')
        },
        type: 'GET'
    })
        .done(function (data) {
            $("#name-regis").val(data.message.name),
                $("#email-regis").val(data.message.email),
                $("#password-regis").val(''),
                $("#role-regis option").filter(':selected').val(data.message.role)
        })
        .catch(function (error) {
            alert(error.message);
        })
})

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function clearCookie(name){
    if(readCookie(name)){
        document.cookie = name +'=';
    }
}