const express = require("express");
const Controller = require("./controllers/controller");
const app = express();
const port = 3000;
const session = require("express-session");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "darumdarimda",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: true },
  })
);

//register
app.get("/register", Controller.renderRegister);
app.post("/register", Controller.handlerRegister);

//login
app.get("/login", Controller.renderLogin);
app.post("/login", Controller.handlerLogin);

app.use(function (req, res, next) {
  if (!req.session.userId) {
    let error = "Please Login First";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});

// const isAdmin = function (req, res, next) {
//   if (req.session.userId && res.session.role != "admin") {
//     let error = "You Have no Access";
//     res.redirect(`/login?error=${error}`);
//   } else {
//     next();
//   }
// };
app.get("/", Controller.home);
app.get("/logout", Controller.getLogout);

//categories START
app.get("/categories", Controller.categories);
app.get("/categories/add", Controller.renderAddCategory);
app.post("/categories/add", Controller.handlerAddCategory);
app.get("/categories/edit/:id", Controller.renderEditCategory);
app.post("/categories/edit/:id", Controller.handlerEditCategory);
app.get("/categories/:id/delete", Controller.categoriesDelete);
//categories END

//Department START
app.get("/department", Controller.departments);
app.get("/department/add", Controller.renderAddDepartment);
app.post("/department/add", Controller.handlerAddDepartment);
app.get("/department/edit/:id", Controller.renderEditDepartment);
app.post("/department/edit/:id", Controller.handlerEditDepartment);
app.get("/department/:id/delete", Controller.departmentsDelete);
//Department END

//transaction START
app.post("/transaction/add", Controller.handlerAddTransaction);
// app.post("/transaction/edit", Controller.deleteTransaction);
app.get("/transaction/:id", Controller.transaction);
app.get("/transaction/:id/add", Controller.renderAddTransaction);
app.get("/transaction/:id/delete", Controller.deleteTransaction);
app.get("/transaction/:id/edit/", Controller.renderEditTransaction);

//transaction END

//profiles
app.get("/profiles/:id", Controller.profiles);

//changePassword
app.get("/changepassword", Controller.changePassword);

app.listen(port, () => {
  console.log(`Anyeongaseo port: ${port} imnida`);
});
