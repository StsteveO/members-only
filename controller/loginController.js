// need all the models needed to be able to access and manipulate them

const asyncHandler= require("express-async-handler");
const {body, validationResult}= require("express-validator");
const passport = require("passport");

//url routes point to these "controllers"...what to do with page when routed

// exports.index = function (req, res, next) {
//   res.render("index", { title: "Express" });
// };

exports.login_form_GET= function (req, res, next){
  res.render("login_form", {
    title: "Login Form"
  })
};

exports.login_form_POST = passport.authenticate(
  "local",{
    successRedirect: "/", //place to go when succeeds
    failureRedirect: "/chatroom/no_account_found" //can redirect to other page if fails
  }
);