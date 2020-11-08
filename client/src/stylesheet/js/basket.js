$("#basket").click(function () {
    $("#menu").hide();
    $("#keranjang").show();
  
    const basket = JSON.parse(localStorage.getItem("basket") || "[]");
    let html = '';
    let total = 0;
    $("#body-basket").html(html);
    basket.forEach((dt, i) => {
      let idTotal = dt.name.replace(' ', '-');
      html = html + '<tr>' +
        '<td>' + dt.name + '</td>' +
        '<td><div class="quantity">' +
        '<span id="' + dt.name + '" class="plus">+</span>' +
        '<input type="number" id="qty" class="input-text qty text" step="1" min="0" max="" name="qty" value="' + dt.qty + '" title="Qty" size="4" pattern="[0-9]*" inputmode="numeric" />' +
        '<span id="' + dt.name + '" class="minus">-</span>' +
        '</div></td>' +
        '<td><input type="text" readonly value="' + dt.total + '" id="' + idTotal + '"></td>' +
        '</tr>';
  
      total = total + dt.total;
    });
  
    $("#body-basket").append(html);
    $("#sub-total").val(total);
  });
  
  
  $("#menus").click(function () {
    $("#menu").show();
    $("#keranjang").hide();
  });
  
  $(document).on("click", ".quantity span", function (event) {
  
    var $button = $(this);
    let paket = $button.attr("id");
    var oldValue = $button.parent().find("#qty").val();
  
    if ($button.hasClass('plus')) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find("#qty").val(newVal);
    let qty = $button.parent().find("#qty").val();
    let total = 0;
    let subTotal = 0;
  
    const basket = JSON.parse(localStorage.getItem("basket") || "[]");
    basket.forEach((dt) => {
      if (paket === dt.name) {
        dt.qty = qty;
        dt.total = qty * dt.price;
        total = dt.total;
      }
  
      subTotal = subTotal + dt.total;
    });
  
    localStorage.setItem('basket', JSON.stringify(basket));
    let idTotal = paket.replace(' ', '-');
  
    $("#" + idTotal).val(total);
    $("#sub-total").val(subTotal);
  });