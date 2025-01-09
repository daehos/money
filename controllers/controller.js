const { where } = require("sequelize");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
module.exports = class Controller {
  static async home(req, res) {
    res.render("home");
    try {
    } catch (error) {
      res.send(error);
    }
  }
  static async renderRegister(req, res) {
    try {
      res.render("register");
    } catch (error) {
      res.send(error);
    }
  }
  static async handlerRegister(req, res) {
    try {
      const { username, password, role } = req.body;
      await User.create({ username, password, role });
      res.redirect("/login");
    } catch (error) {
      res.send(error);
    }
  }
  //LOGIN
  static async renderLogin(req, res) {
    try {
      let { error } = req.query;
      res.render("login", { error });
    } catch (error) {
      res.send(error);
    }
  }
  static async handlerLogin(req, res) {
    try {
      let { username, password } = req.body;
      let user = await User.findOne({ where: { username } });
      if (user) {
        const isValidPass = bcrypt.compareSync(password, user.password); //true or false

        if (isValidPass) {
          return res.redirect("/");
        } else {
          const error = "Invalid username/password";
          return res.redirect(`/login?error=${error}`);
        }
      } else {
        const error = "Invalid username/password";
        return res.redirect(`/login?error=${error}`);
      }
    } catch (error) {
      res.send(error);
    }
  }
  //   static async home(req, res) {
  //     try {
  //     } catch (error) {
  //       res.send(error);
  //     }
  //   }
};
