import 'jquery-validation';

$("#click-regis").click(function () {
    $("#login").hide();
    $("#regis").show();
});

$("#click-login").click(function () {
    $("#login").show();
    $("#regis").hide();
});

$("#btn-login").click(function (event) {
    event.preventDefault();

    let validasi = $("#form-login").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        message: {
            email: {
                required: 'please enter email!',
                email: 'please enter valid email!'
            },
            password: {
                required: 'please enter password!'
            }
        }
    }).form();

    if (!validasi) {
        return;
    } else {
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
                $("#error-login").append(error.responseJSON.message);
            })

    }
});

$("#btn-regis").click(function (event) {
    event.preventDefault();
    let validasi = $("#form-regis").validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        message: {
            name: {
                required: 'please enter name!'
            },
            email: {
                required: 'please enter email!',
                email: 'please enter valid email!'
            },
            password: {
                required: 'please enter password!'
            }
        }
    }).form();

    if (!validasi) {
        return;
    } else {
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
    }
});