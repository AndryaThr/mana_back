const express = require("express");
const user = require("./user/user.router");
const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/users";
// const dbUrl = "mongodb+srv://admin:vzUBd9fn2MZ97QZ@users.l7cbg.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

const app = express();

mongoose
  .connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("Erreur", err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/users/", user);

app.get("/", (req, res) => {
  res.json({ success: true, message: "App:running" });
});

module.exports = app;
