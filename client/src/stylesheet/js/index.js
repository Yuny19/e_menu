//import modul js
import './jquery';
import 'jquery-validation';
import '../js/jquery.toast';

//import modul bootstrap
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';

//import style css
import '../css/index.scss';
import '../css/wizard.scss';
import '../css/jquery.toast.css';
import './login-register';

//import function js
import './login-register';
import './logout';
import './basket';
import './order';
import './wizard';


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
        getMenu();
        $("#login-regis").hide();
        $("#dashboard").show();
        $("#keranjang").hide();
    }


});

function getMenu() {
    $.ajax({
        url: `http://localhost:3000/menu/`,
        type: 'GET'
    })
        .done(function (data) {
            let html = '';

            $("#menu").html(html);

            data.forEach((dt, i) => {
                html = html+ '<div class="menu" style="width: 18rem;margin-top: 2rem; margin-right: 2rem;">' +
                    '<img class="card-img-top"' +
                    ' src="'+dt.link+'" alt="Card image cap">' +
                    '<div class="card-body" style="padding: 0;margin: 0;">' +
                    '<div class="row" style="padding: 1rem;">' +
                    '<div class="col-sm-6">' +
                    '<h5 class="card-title">'+dt.name+'</h5>' +
                    '</div>' +
                    '<div class="col-sm-6">' +
                    '<button value="'+dt._id+'" id="beli" class="btn btn-block btn-outline-danger">Beli</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            })
            $("#menu").append(html);
        })
        .catch(function (error) {
        })
}

