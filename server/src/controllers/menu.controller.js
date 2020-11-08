const Menu = require('../models/menu.model');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

class MenuController{
    static create(req, res){
        Menu.create(req.body)
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(400).json(err.message)
        })
    }

    static read(req, res){
        Menu.find()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(404).json(err.message)
        })
    }

    static findId(req, res){
        Menu.findById(req.params.id)
        .then((data) => {
            res.status(200).json({
                message: 'user found'
            })
        })
        .catch((err)=>{
            res.status(404).json(err.message);
        })
    }

    static delete(req, res){
        console.log('masuk delete')
        Menu.findByIdAndRemove(req.params.id)
        .then(()=>{
            res.status(200).json({
                message: 'delete successfully'
            })
        })
        .catch(err=>{
            res.status(404).json(err.message);
        })
    }
}

module.exports = MenuController;