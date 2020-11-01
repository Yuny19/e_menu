const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return re.test(email);
};

const userSchema = new schema({
    name: {
        type: String,
        required: 'name is required'
    },
    email: {
        type: String,
        unique: true,
        required: 'email is required',
        validate: [validateEmail, 'please fill a valid email address']
    },

    password: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'customer'
    },
    token: {
        type: String
    },
    process: {
        type: String,
        default: 'manual'
    }
},
    {

        timestamps: true

    });

userSchema.pre('save', function (next) {
    if (this.password != null) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

userSchema.path('email').validate(
    (value) =>
        mongoose
            .model('Users')
            .collection.countDocuments(
                { email: value }
            ).then((count) => {
                if (count > 0) {
                    return false;
                }
                return true;
            })
            .catch((err) => {
                throw err;
            }),
    'Email Already Exists!!!',
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;