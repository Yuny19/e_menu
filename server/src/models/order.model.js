const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new schema({
    user: [{
        type: schema.Types.ObjectId,
        required: 'name is required'
    }],
    menu: [{
        type: schema.Types.ObjectId
    }],

    amount: {
        type: Number,
        required: 'amount is required'
    },
    total_pay: {
        type: Number
    }
},
    {

        timestamps: true

    });

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;