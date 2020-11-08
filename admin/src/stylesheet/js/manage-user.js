$("#click-manage-user").click(function () {
    $("#table-user").show();
    $("#table-menu").hide();
    $("#form-add-user").hide();
    $("#form-add-menu").hide();

    $.ajax({
        url: `http://localhost:3000/user/`,
        headers: {
            token: localStorage.getItem('token')
        },
        type: 'GET'
    })
        .done(function ({data}) {
            let html = '';
            $("#content-user").html(html);
            data.forEach((dt, i) => { 
                html = html + '<tr>' +
                    '<td class="text-left py-3 px-4">' + dt.name + '</td>' +
                    '<td class="text-left py-3 px-4">' + dt.email + '</td>' +
                    '<td class="text-left py-3 px-4">' + dt.role + '</td>' +
                    '<td class="text-left py-3 px-4">' + dt.process + '</td>' +
                    '<td class="text-center py-3 px-4"><button id="btn-update" value="' + dt._id + '"' +
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
});

$("#save-user").click(function () {
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

            $("#form-add-user").hide();
            $("#table-user").show();
        })
        .catch(function (error) {
            alert('cant create user')
        })
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