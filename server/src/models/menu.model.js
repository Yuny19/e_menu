const mongoose = require('mongoose');
const schema = mongoose.Schema;

const menuSchema = new schema({
    name: {
        type: String,
        required: 'name is required'
    },
    link: {
        type: String,
    },
    price: {
        type: Number,
        required: 'price is required'
    }
},
    {

        timestamps: true

    });

const Menus = mongoose.model('menus', menuSchema);

module.exports = Menus;