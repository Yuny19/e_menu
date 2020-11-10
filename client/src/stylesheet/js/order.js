//import sweet alert
const Swal = require('sweetalert2');


$(document).on("click", "#beli", function (event) {
    let id = $(this).val();

    $.ajax({
        url: `http://localhost:3000/menu/${id}`,
        type: 'GET'
    })
        .done(function (data) {
            let order = {
                id: data._id,
                name: data.name,
                qty: 1,
                price: data.price,
                total: data.price
            };
            let price = data.price;
            const basket = JSON.parse(localStorage.getItem("basket") || "[]");
            if (basket.length > 0) {
                let newOrder = true;
                basket.forEach((dt) => {
                    if (order.name === dt.name) {
                        dt.qty = dt.qty + order.qty;
                        newOrder = false;
                        dt.total = dt.qty * price;
                    }
                });

                if (newOrder) {
                    basket.push(order);
                }
            } else {
                basket.push(order);
            }



            localStorage.setItem('basket', JSON.stringify(basket));
        })
        .catch(function (err) {
            alert(err.responseJSON.message);
        })
});

$("#checkout").click(function () {

    const basket = localStorage.getItem('basket');
    let menus = [];
    let total = 0;

    basket.forEach((data) => {
        menus.push(data.id);
        total = total + data.total;
    });

    let method = $('input[name="payment"]:checked').val();
    $.ajax({
        url: `http://localhost:3000/order/`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            menus: menus,
            address: $("#address").val(),
            method_pay: method,
            total_pay: total
        },
        type: 'POST'
    })
        .done(function (data) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your order will be processed and sent immediately ^-^',
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch(function (err) {
            alert(err.responseJSON.message);
        })
});
