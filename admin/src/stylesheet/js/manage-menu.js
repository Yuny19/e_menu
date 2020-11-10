$("#click-manage-menu").click(function () {
    $("#table-menu").show();
    $("#table-user").hide();
    $("#table-order").hide();
    $("#form-add-user").hide();
    $("#form-add-menu").hide();

    $.ajax({
        url: `http://localhost:3000/menu/`,
        headers: {
            token: localStorage.getItem('token')
        },
        type: 'GET'
    })
        .done(function (data) {
            let html = '';
            $("#content-menu").html(html);
            data.forEach((dt, i) => {
                html = html + '<tr>' +
                    '<td class="text-left py-3 px-4">' + dt.name + '</td>' +
                    '<td class="text-left py-3 px-4">' + dt.link + '</td>' +
                    '<td class="text-left py-3 px-4">' + dt.price + '</td>' +
                    '<td class="text-center py-3 px-4"><button id="btn-update-menu" value="' + dt._id + '"' +
                    '   class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white bg-green-500 hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"' +
                    '  type="submit">update</button>&nbsp;' +
                    '<button id="btn-delete-menu" value="' + dt._id + '"' +
                    ' class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white bg-red-500 hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"' +
                    'type="submit">delete</button>' +
                    '</td>' +
                    '</tr>';
            });

            $("#content-menu").append(html);
        })
        .catch(function (error) {
            alert(error.message);
        })
});

$("#cancel-menu").click(function () {
    $("#table-menu").show();
    $("#form-add-menu").hide();
});

$("#btn-add-menu").click(function () {
    $("#table-menu").hide();
    $("#form-add-menu").show();

    clearCookie('_id');
    $("#name-menu").val('');
    $("#file-menu").val('');
    $("#price-menu").val('');
});

$("#save-menu").click(function (event) {
    if (!readCookie('_id')) {
        event.preventDefault();
        const fd = new FormData();

        let img = document.getElementById('file-menu');

        fd.append('name', $("#name-menu").val());
        fd.append('link', img.files[0]);
        fd.append('price', $("#price-menu").val());

        $.ajax({
            url: `http://localhost:3000/menu/`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST'
        })
            .done(function () {
                alert('menu have been created');

                location.reload();
                $("#table-menu").show();
                $("#form-add-menu").hide();
            })
            .catch(function (error) {
                alert('cant created menu : ' + error);
            })
    }
    else {
        let id = readCookie('_id');
        event.preventDefault();
        const fd = new FormData();

        let img = document.getElementById('file-menu');

        fd.append('name', $("#name-menu").val());
        fd.append('link', img.files[0]);
        fd.append('price', $("#price-menu").val());

        $.ajax({
            url: `http://localhost:3000/menu/${id}`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: fd,
            processData: false,
            contentType: false,
            type: 'PUT'
        })
            .done(function () {
                alert('menu have been updated');
                location.reload();
                $("#table-menu").show();
                $("#form-add-menu").hide();

            })
            .catch(function (error) {
                alert('cant updated menu : ' + error);
            })
    }
});

// $("#btn-delete-menu").on("click", function (event) {
$(document).on("click", "#btn-delete-menu", function (event) {
    var id = $(this).val();
    $.ajax({
        url: `http://localhost:3000/menu/${id}`,
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

$(document).on("click", "#btn-update-menu", function (event) {
    $("#form-add-menu").show();
    $("#table-menu").hide();

    let id = $(this).val();
    document.cookie = '_id = ' + id;
    $.ajax({
        url: `http://localhost:3000/menu/${id}`,
        headers: {
            token: localStorage.getItem('token')
        },
        type: 'GET'
    })
        .done(function (data) {
            $("#name-menu").val(data.message.name),
                $("#file-menu").val(''),
                $("#price-menu").val(data.message.price)
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
function clearCookie(name) {
    if (readCookie(name)) {
        document.cookie = name + '=';
    }
}