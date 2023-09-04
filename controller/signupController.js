// need all the models needed to be able to access and manipulate them
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User= require("../models/user-model")

//url routes point to these "controllers"...what to do with page when routed

// exports.index = function (req, res, next) {
//   res.render("index", { title: "Express" });
// };

exports.sign_up_form_GET = function (req, res, next) {
  res.render("sign_up_form", {
    title: "Sign-up Form",
  });
};

exports.sign_up_form_POST = [

    // validate and sanitize fields, names: first_name, username, password, confirm_password

    body("first_name")
    .isLength({min:1})
    .withMessage("Please enter first name.")
    .trim()
    .escape(),

    body("username")
    .isLength({min:1})
    .withMessage("Please enter username.")
    .trim()
    .escape(),

    body("password")
    .isLength({min:1})
    .withMessage("Please enter password.")
    .trim()
    .escape(),

    body("confirm_password")
    .isLength({min:1})
    .withMessage("Please enter password confirmation.")
    .trim()
    .escape(),

    body("confirm_password")
    .custom((value, {req})=>{
      if(value !== req.body.password){
        throw new Error("Passwords do not match.");
      }
      return true;
    }),

    //process req after validation and sanitation

    asyncHandler(async (req, res, next)=>{
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.render("sign_up_form", {
          title: "Sign-up Form",
          user: req.body,
          errors: errors.array(),
        });
        return;
      } else {
        try{
          //hash password using bcryptjs
          const hashedPassword = await bcrypt.hash(req.body.password, 10);

          const user= new User({
            first_name: req.body.first_name,
            username: req.body.username,
            password: hashedPassword,
          });

          await user.save();
          res.redirect("/");
        } catch(err){
          return next(err);
        }
      }
    }), 
];