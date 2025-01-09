const express = require("express");
const Controller = require("./controllers/controller");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", Controller.home);

//register
app.get("/register", Controller.renderRegister);
app.post("/register", Controller.handlerRegister);

//login
app.get("/login", Controller.renderLogin);
app.post("/login", Controller.handlerLogin);

app.listen(port, () => {
  console.log(`Anyeongaseo port: ${port} imnida`);
});
