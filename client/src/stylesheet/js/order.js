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
