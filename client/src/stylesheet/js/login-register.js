
$("#click-regis").click(function () {
    $("#login").hide();
    $("#regis").show();
});

$("#click-login").click(function () {
    $("#login").show();
    $("#regis").hide();
});

$("#btn-login").click(function () {
    $.ajax({
        url: `http://localhost:3000/user/login/manual`,
        type: 'POST',
        data: {
            email: $("#email-login").val(),
            password: $("#password-login").val()
        }
    })
        .done(function (data) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            location.reload();
        })
        .catch(function (error) {
            alert(error.responseJSON.message);
        })
});

$("#btn-regis").click(function () {
    $.ajax({
        url: `http://localhost:3000/user/`,
        type: 'POST',
        data: {
            name: $("#name-regis").val(),
            email: $("#email-regis").val(),
            password: $("#password-regis").val()
        }
    })
        .done(function (data) {
            alert('register success');
            location.reload()
        })
        .catch(function (error) {
            alert(error.message);
        })
});