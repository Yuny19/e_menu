const User = require('../model/user.model');
const jwt = require('../helpers/jwt-sign.helpers');
const bcrypt = require('bcrypt');

class UserController {
    static create(req, res) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then((data) => {
                var token = jwt(data.email, data._id);

                return User.findByIdAndUpdate({_id:data._id},{
                    $set:{
                        token: token
                    }
                })
            })
            .then((user) => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                })
            })
    }

    static login(req, res) {
        User.findOne({ email: req.body.email })
            .then((data) => {
                const pass = bcrypt.compareSync(req.body.password, data.password);
                if (pass) {
                    res.status(200).json({
                        name: data.name,
                        token: data.token
                    });
                } else {
                    res.status(403).json({
                        message: 'not authorized'
                    })
                }
            })
            .catch(err => {
                res.status(401).json({
                    message: err.message
                })
            })
    }
}

module.exports = UserController;