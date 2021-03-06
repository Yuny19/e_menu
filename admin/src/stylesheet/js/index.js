import '../js/login';
import '../js/manage-menu';
import '../js/manage-user';
import '../js/manage-order';

const baseUrl = 'http://localhost:3000';


$(function () {

    const token = localStorage.getItem('token') || null;
    const name = localStorage.getItem('name') || null;

    if (name) {
        $("#user").append(name);
    }

    if (!token) {

        $("#login").show();
        $("#dashboard").hide();
    } else {
        $("#login").hide();
        $("#dashboard").show();
        $("#table-menu").hide();
        $("#table-user").hide();
        $("#table-order").hide();
        $("#form-add-user").hide();
        $("#form-add-menu").hide();
    }

});