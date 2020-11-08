const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'Users'
    },
    menus: [{
        type: schema.Types.ObjectId,
        ref: 'Menus'
    }],
    address: {
        type: String,
        required: 'address is required'
    },
    method_pay: {
        type: String
    },
    total_pay: {
        type: Number
    },
    status: {
        type: String,
        default: 'on process'
    }
},
    {

        timestamps: true

    });

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;