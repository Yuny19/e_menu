const User = require('../models/user.model');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('../helpers/jwt-sign.helpers');
const bcrypt = require('bcrypt');

class UserController {
    static create(req, res) {
        let role = req.body.role ? req.body.role : 'customer';
        let token = jwt(req.body.email.toLowerCase(), role);
        User.create({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            role: role,
            token: token
        })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                })
            })
    }

    static loginGoogle(req, res) {
        let logged = "";
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID
        })
            .then(response => {
                logged = response.payload;
                return User.findOne({ email: logged.email.toLowerCase() })
            })
            .then((user) => {
                if (user == null) {
                    let token = jwt(logged.email.toLowerCase(), 'customer');
                    return User.create({
                        name: logged.name,
                        email: logged.email.toLowerCase(),
                        process: 'google',
                        token: token
                    });
                } else if (user.process === 'manual') {
                    res.status(403).json({
                        message: "you can't login, try another way"

                    });
                } else if (user.process === 'google') {
                    res.status(200).json(user);
                }
            })
            .then((data) => {
                console.log(data)
                res.status(200).json({
                    name: data.name,
                    token: data.token
                });
            })
            .catch(err => {
                res.status(404).json({
                    message: err.message
                })
            })
    }

    static loginManual(req, res) {
        User.findOne({ email: req.body.email.toLowerCase() })
            .then((data) => {

                if (data.process === 'manual') {
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
                } else {
                    res.status(403).json({
                        message: "you can't login, try another way"

                    })
                }


            })
            .catch(err => {
                res.status(401).json({
                    message: 'please register'
                })
            })
    }

    static loginAdmin(req, res) {
        User.findOne({ email: req.body.email.toLowerCase() })
            .then((data) => {
                if (data.role === 'admin') {
                    const pass = bcrypt.compareSync(req.body.password, data.password);
                    if (pass) {
                        res.status(200).json({
                            name: data.name,
                            token: data.token
                        });
                    } else {
                        res.status(403).json({
                            message: 'not authorized'
                        });
                    }
                } else {
                    res.status(403).json({
                        message: "not authorized"
                    });
                }
            })
            .catch(err => {
                res.status(401).json({
                    message: 'please register'
                })
            })
    }

    static update(req, res) {
        User.findByIdAndUpdate({ _id: req.params.id }, {
            $set:
            {
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }
        })
            .then(data => {
                res.status(201).json(data);
            })
            .catch((err) => {
                res.status(400).json({
                    message: err.message
                });
            })
    }

    static delete(req, res) {
        User.findByIdAndRemove({ _id: req.params.id })
            .then(() => {
                res.status(200).json({
                    message: 'delete success'
                })
            })
            .catch((err) => {
                res.status(400).json({
                    message: err.message
                });
            })
    }

    static read(req, res) {
        User.find({})
            .then(data => {
                res.status(200).json({
                    data: data
                });
            })
            .catch((err) => {
                res.status(404).json({
                    message: err.message
                });
            })
    }

    static findId(req, res){
        User
        .findById(req.params.id)
        .then((data) => {
            res.status(200).json({
                message: data
            })
        })
        .catch((err)=>{
            res.status(404).json(err.message);
        })
    }
}

module.exports = UserController;