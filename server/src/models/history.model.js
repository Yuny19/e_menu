const mongoose = require('mongoose');
const schema = mongoose.Schema;

const historySchema = new schema({
    order: {
        type: schema.Types.ObjectId,
        ref: 'Orders'
    },
    status: {
        type: String
    }
},
    {

        timestamps: true

    });

const Historys = mongoose.model('Historys', historySchema);

module.exports = Historys;