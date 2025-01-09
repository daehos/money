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
app.get("/categories/:id/delete", Controller.categoriesDelete);

//categories END

//Department START
app.get("/department", Controller.departments);
app.get("/department/:id/delete", Controller.departmentsDelete);

//Department END

//transaction
app.get("/transaction", Controller.transaction);

//profiles
app.get("/profiles/:id", Controller.profiles);

//changePassword
app.get("/changepassword", Controller.changePassword);

app.listen(port, () => {
  console.log(`Anyeongaseo port: ${port} imnida`);
});
