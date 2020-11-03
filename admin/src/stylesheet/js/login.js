$("#btn-login").click(function () {
    $.ajax({
        url: `http://localhost:3000/user/login/admin`,
        type: 'POST',
        data: {
            email: $("#username").val(),
            password: $("#password").val()
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