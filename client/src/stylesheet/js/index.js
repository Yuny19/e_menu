import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import '../css/index.scss';
import '../js/jquery.toast.js';
import '../css/jquery.toast.css';
import './login-register';

const baseUrl = 'http://localhost:3000';

$(function () {

    const token = localStorage.getItem('token') || null;
    const name = localStorage.getItem('name') || null;

    if (name) {
        $("#username").append(name);
    }

    if (!token) {

        $("#login-regis").show();
        $("#login").show();
        $("#regis").hide();
        $("#dashboard").hide();
    } else {
        $("#login-regis").hide();
        $("#dashboard").show();
    }

});

