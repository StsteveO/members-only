// need all the models needed to be able to access and manipulate them

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user-model");
//currentUser is the current logged in user 
const Message= require("../models/message-model");

//url routes point to these "controllers"...what to do with page when routed

// exports.index = function (req, res, next) {
//   res.render("index", { title: "Express" });
// };

//ORIGINAL!
// exports.index = function (req, res, next) {
//   res.render("intro_page", {
//     title: "Introduction Page",
//   });
// };

//experiment with displaying the messages
exports.index= asyncHandler(async(req, res, next)=>{
  const allMessages= await Message.find()
    .sort({updated:-1})
    .populate("author")
    .exec();

  res.render("intro_page", {
    title: "Introduction Page",
    all_messages: allMessages, 
  });
});

//add comment into message list
exports.share_comment_POST= [

  //validate and sanitize fields, "share_comment", and "userId"
  body("share_comment")
  .isLength({min:1})
  .withMessage("Please enter a comment/message.")
  .trim()
  .escape(),

  body("userId")
  // .isLength({min:1})
  .trim()
  .escape(),

  //process req after validation and sanitation
  asyncHandler(async (req, res, next)=>{
    const errors= validationResult(req);
    // console.log(JSON.stringify(req.body, null, 2));

    //create a new message obj with validated and sanitized message obj
    const message = new Message({
      //model-values: "message", "author" (user _id), "updated" (may leave this blank)
      //field-values: "share_comment"
      message: req.body.share_comment,
      author: req.body.userId,
      updated: Date.now(),
    });

    //if err, render form with sanitized val and feedback
    if(!errors.isEmpty()){
      res.render("intro_page", {
        message: message,
        errors: errors.array(),
      });
      return;
    }else{
      //form is valid and save message data
      await message.save();
      //redirect to home page
      //info should be saved to db
      res.redirect("/");
    }
  }),
];