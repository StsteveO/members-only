// need all the models needed to be able to access and manipulate them

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user-model");
const Message = require("../models/message-model");

//url routes point to these "controllers"...what to do with page when routed

// exports.index = function (req, res, next) {
//   res.render("index", { title: "Express" });
// };

exports.no_account_found_GET= function (req, res, next){
  res.render("no_account_found", {
    title: "No Account Found",
  })
}

exports.delete_account_GET= 
    //this has an id of the user
    asyncHandler(async (req, res, next)=>{
        //I need the user model and message model
        //I need 1 user, and all the messages
        //they do NOT depend on one another
        const [user, allMessages]= await Promise.all([
            User.findById(req.params.id).exec(),
            Message.find({ author: req.params.id }).sort({updated:-1}).exec(),
        ])

        //there is no user
        if(user===null){
            res.redirect("/")
        }

        res.render("delete_account", {
            title: "Delete Account",
            user: user,
            all_messages: allMessages,
        })
    })

exports.delete_account_POST = asyncHandler(async (req, res, next)=>{
    
    await Message.deleteMany({ author: req.body.deleteUser });
    await User.findByIdAndRemove(req.body.deleteUser);

    //user account is deleted, and going to home page
    res.redirect("/");
})

exports.update_account_information_GET= asyncHandler(async (req, res, next)=>{

    //get all the users information
    const user= await User.findById(req.params.id).exec();

    //if there is no user pass error
    if(user===null){
        const err= new Error("No user found");
        err.status= 404;
        return next(err);
    }

    //render pug 
    res.render("update_account", {
        title: "Update Account",
        user: user,
    })
})

    

exports.update_account_information_POST = [

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
        _id: req.params.id, //very important to update information
      });

      //if err, render form with sanitized val and feedback
      if(!errors.isEmpty()){
        res.render("update_account", {
            title: "Update Account",
            user: user,
            errors: errors.array(),
        });
        return;
      }else{
        //form is valid and save data for user 
        await User.findByIdAndUpdate(req.params.id, user, {});
        //redirect to home page for now
        //but info should be saved on db
        res.redirect("/");
      }
    }), 
];