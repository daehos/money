const { where } = require("sequelize");
const { Category, Department, Profile } = require("../models");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const e = require("express");
module.exports = class Controller {
  static async changePassword(req, res) {
    try {
      res.render("changepassword");
    } catch (error) {
      res.send(error);
    }
  }

  static async profiles(req, res) {
    try {
      res.render("profiles");
    } catch (error) {
      res.send(error);
    }
  }

  static async transaction(req, res) {
    try {
      res.render("transaction");
    } catch (error) {
      res.send(error);
    }
  }

  static async categories(req, res) {
    try {
      res.render("categories");
    } catch (error) {
      res.send(error);
    }
  }

  static async home(req, res) {
    res.render("home");
    try {
    } catch (error) {
      res.send(error);
    }
  }
  static async renderRegister(req, res) {
    try {
      let data = await Department.findAll();
      console.log(data);
      res.render("register", { data });
    } catch (error) {
      res.send(error);
    }
  }
  static async handlerRegister(req, res) {
    try {
      const { username, password, role, DepartmentId } = req.body;
      console.log(DepartmentId);

      await User.create({
        username,
        password,
        role,
        DepartmentId: Number(DepartmentId),
      });
      res.redirect("/login");
    } catch (error) {
      console.log(error);

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
          req.session.userId = user.id;
          req.session.role = user.role;
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
  static getLogout(req, res) {
    req.session.destroy((err) => {
      if (err) res.send(err);
      else {
        res.redirect("/login");
      }
    });
  }
  //Category START
  static async categories(req, res) {
    try {
      let data = await Category.findAll();
      res.render("categories", { data });
    } catch (error) {
      res.send(error);
    }
  }
  //Category END

  //Department START
  static async departments(req, res) {
    try {
      let data = await Department.findAll();
      res.render("department", { data });
    } catch (error) {
      res.send(error);
    }
  }
  //Department END

  //Profile START
  static async departments(req, res) {
    try {
      let data = await Profile.findAll();
      res.render("department", { data });
    } catch (error) {
      res.send(error);
    }
  }
  //Profile END
  //   static async home(req, res) {
  //     try {
  //     } catch (error) {
  //       res.send(error);
  //     }
  //   }
};
