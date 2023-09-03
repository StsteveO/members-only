// need all the models needed to be able to access and manipulate them

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user-model");
const Message = require("../models/message-model");

//url routes point to these "controllers"...what to do with page when routed

// exports.index = function (req, res, next) {
//   res.render("index", { title: "Express" });
// };

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

exports.update_account_information_GET= function(req, res, next){
    res.render("update_account", {})
    //NEED TO UPDATE
};

exports.update_account_information_POST = function (req, res, next) {
    //NEED TO UPDATE
};