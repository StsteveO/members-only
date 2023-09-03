// need all the models needed to be able to access and manipulate them

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user-model");

//url routes point to these "controllers"...what to do with page when routed

// exports.index = function (req, res, next) {
//   res.render("index", { title: "Express" });
// };

exports.log_out_perform_GET = function (req, res, next) {
  req.logout(function(err){
    if(err){
        return next(err);
    }
    res.redirect("/");
  });
};
