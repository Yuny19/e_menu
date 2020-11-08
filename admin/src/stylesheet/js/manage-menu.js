$("#click-manage-menu").click(function () {
    $("#table-menu").show();
    $("#table-user").hide();
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
            console.log(data)
            let html = '';
            $("#content-menu").html(html);
            data.forEach((dt, i) => { 
                html = html + '<tr>' +
                    '<td class="text-left py-3 px-4">' + dt.name + '</td>' +
                    '<td class="text-left py-3 px-4">' + dt.link.substring(0, 20) + '...' + '</td>' +
                    '<td class="text-left py-3 px-4">' + dt.price + '</td>' +
                    '<td class="text-center py-3 px-4"><button id="btn-update" value="' + dt._id + '"' +
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
});

$("#save-menu").click(function(){
    
});