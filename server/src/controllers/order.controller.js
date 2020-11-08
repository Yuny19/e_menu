const Order = require('../models/order.model');
const User = require('../models/user.model');
class OrderController {
    static create(req, res) {
        User.findOne({ email: req.user.email.toLowerCase() })
            .then((data) => {
                return Order.create({
                    user: data._id,
                    menus: req.body.menus,
                    address: req.body.address,
                    method_pay: req.body.method_pay,
                    total_pay: req.body.total_pay
                });
            })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }
}

module.exports = OrderController;