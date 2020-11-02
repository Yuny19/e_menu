const Menu = require('../model/menu.model');
const jwt = require('../helpers/jwt-sign.helpers');

class MenuController {
  static create(req, res) {
    Menu.create({
      name: req.body.name,
      link: req.body.link,
      price: req.body.price
    })
      .then((data) => {
        var token = jwt(data.email, data._id);

        return Menu.findByIdAndUpdate({ _id: data._id }, {
          $set: {
            token: token
          }
        })
      })
      .then((Menu) => {
        res.status(200).json(Menu)
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        })
      })
  }

}

module.exports = MenuController;