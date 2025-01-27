const formatRupiah = require("../helper/helper");
const { Category, Department, Profile, Transaction } = require("../models");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const e = require("express");
module.exports = class Controller {
  static async renderEditDepartment(req, res) {
    try {
      let { id } = req.params;
      let data = await Department.findAll({
        where: {
          id: id,
        },
      });
      data = data[0];
      // res.send(data)
      res.render("formeditdepartment", { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async handlerEditDepartment(req, res) {
    try {
      // res.render("formeditcategory")
      let { name } = req.body;
      let { id } = req.params;
      let department = await Department.findOne({
        where: {
          id: id,
        },
      });
      department.name = name;
      await department.save();

      // res.send(department)
      res.redirect("/department");
    } catch (error) {
      res.send(error);
    }
  }

  static async renderAddDepartment(req, res) {
    try {
      res.render("formadddepartment");
    } catch (error) {
      res.send(error);
    }
  }

  static async handlerAddDepartment(req, res) {
    try {
      let { name } = req.body;
      await Department.create({
        name,
      });
      // res.render("formaddcategory")
      res.redirect("/department");
    } catch (error) {
      res.send(error);
    }
  }

  static async renderEditCategory(req, res) {
    try {
      let { id } = req.params;
      let data = await Category.findAll({
        where: {
          id: id,
        },
      });
      data = data[0];
      // res.send(data)
      res.render("formeditcategory", { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async handlerEditCategory(req, res) {
    try {
      // res.render("formeditcategory")
      let { name } = req.body;
      let { id } = req.params;
      let category = await Category.findOne({
        where: {
          id: id,
        },
      });
      category.name = name;
      await category.save();

      // res.send(category)
      res.redirect("/categories");
    } catch (error) {
      res.send(error);
    }
  }

  static async renderAddCategory(req, res) {
    try {
      res.render("formaddcategory");
    } catch (error) {
      res.send(error);
    }
  }

  static async handlerAddCategory(req, res) {
    try {
      let { name } = req.body;
      await Category.create({
        name,
      });
      // res.render("formaddcategory")
      res.redirect("/categories");
    } catch (error) {
      res.send(error);
    }
  }

  static async changePassword(req, res) {
    try {
      res.render("changepassword");
    } catch (error) {
      res.send(error);
    }
  }

  //Profile START
  static async profiles(req, res) {
    try {
      let { id } = req.params;
      //   console.log(id, "<<<<ID NIHHH");

      let data = await Profile.findAll({
        where: {
          UserId: id,
        },
        include: [
          {
            model: User,
            include: [
              {
                model: Department,
              },
            ],
          },
        ],
      });
      // res.send(data);
      res.render("profiles", { data });
    } catch (error) {
      res.send(error);
    }
  }
  //Profile END

  //Transaction START
  static async transaction(req, res) {
    try {
      let { id } = req.params;
      let data = await Transaction.findAll({
        include: [Category, User],
      });
      // res.send(data)
      res.render("transaction", { data, formatRupiah, id });
    } catch (error) {
      res.send(error);
    }
  }
  static async renderAddTransaction(req, res) {
    try {
      let { id } = req.params;
      let category = await Category.findAll();
      let user = await User.findAll({
        where: { id },
        include: { model: Department },
      });

      res.render("addTransaction", { category, user, formatRupiah, id });
      //   res.send(user);
      //   res.render("transaction", { data, formatRupiah });
    } catch (error) {
      res.send(error);
    }
  }
  static async renderEditTransaction(req, res) {
    try {
      let { id } = req.params;
      let data = await Transaction.findByPk(id);
      let category = await Category.findAll();
      let user = await User.findAll({
        where: { id },
        include: { model: Department },
      });

      res.render("editTrans", {
        data    ,
        category,
        user,
        formatRupiah,
        id,
      });
        // res.send(data);
      //   res.render("transaction", { data, formatRupiah });
    } catch (error) {
      res.send(error);
    }
  }
  static async handlerAddTransaction(req, res) {
    try {
      let { userId } = req.session;
      let { date, description, type, amount, CategoryId, UserId } = req.body;
      await Transaction.create({
        date,
        description,
        type,
        amount,
        CategoryId,
        UserId,
      });
      res.redirect(`/transaction/${userId}`);
      //   res.send(user);
      //   res.render("transaction", { data, formatRupiah });
    } catch (error) {
      res.send(error);
    }
  }
  static async deleteTransaction(req, res) {
    try {
      let { userId } = req.session;
      let { id } = req.params;
      await Transaction.destroy({
        where: { id },
      });
      res.redirect(`/transaction/${userId}`);
      //   res.send(user);
      //   res.render("transaction", { data, formatRupiah });
    } catch (error) {
      res.send(error);
    }
  }

  //Transaction END

  static async home(req, res) {
    let { id } = req.query;
    res.render("home", { id });
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
          return res.redirect(`/?id=${user.id}`);
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
  static async categoriesDelete(req, res) {
    try {
      let { id } = req.params;
      await Category.destroy({ where: { id } });
      res.redirect("/categories");
    } catch (error) {
      res.send(error);
    }
  }
  //Category END

  //Department START
  static async departments(req, res) {
    try {
      let data = await Department.findAll();
      //   res.send(data)
      res.render("department", { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async departmentsDelete(req, res) {
    try {
      let { id } = req.params;
      await Department.destroy({ where: { id } });
      res.redirect("/department");
    } catch (error) {
      res.send(error);
    }
  }
  //Department END

  //   static async home(req, res) {
  //     try {
  //     } catch (error) {
  //       res.send(error);
  //     }
  //   }
};
