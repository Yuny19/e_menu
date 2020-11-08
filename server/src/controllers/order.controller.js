const Order = require('../models/order.model');

class OrderController{
    static create(req, res){
        Order.create(req.body)
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(400).json(err.message)
        })
    }
}

module.exports=OrderController;