// need all the models needed to be able to access and manipulate them

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

      //create new user obj with validated and sanitized data

      const user = new User({
        // model-values: first_name, username, password
        //field-names: first_name, username, password, confirm_password
        first_name: req.body.first_name,
        username: req.body.username,
        password: req.body.password,
      });

      //if err, render form with sanitized val and feedback
      if(!errors.isEmpty()){
        res.render("sign_up_form", {
            title: "Sign-up Form",
            user: user,
            errors: errors.array(),
        });
        return;
      }else{
        //form is valid and save data for user 
        await user.save();
        //redirect to home page for now
        //but info should be saved on db
        res.redirect("/");
      }
    }), 
];