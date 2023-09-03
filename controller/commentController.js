// need all the models needed to be able to access and manipulate them

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user-model");
const Message= require("../models/message-model");

//url routes point to these "controllers"...what to do with page when routed

// exports.index = function (req, res, next) {
//   res.render("index", { title: "Express" });
// };

//function to delete a specific comment
exports.delete_comment_GET = asyncHandler(async (req, res, next)=>{
  //get the specific comment needed
  const specificComment= await Message.findById(req.params.id).exec();

  //if specific comment does not exist
  if(specificComment===null){
    res.redirect("/");
  }

  //if the specific comment exists
  res.render("comment_delete", {
    title: "Delete Comment",
    message: specificComment,
  })
})

exports.delete_comment_POST = asyncHandler(async (req, res, next)=>{
  //get specific comment needed
  const specificComment = await Message.findByIdAndRemove(
    req.body.deleteComment
  );

  res.redirect("/");
})