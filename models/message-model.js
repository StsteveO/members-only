const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { format }= require("date-fns");

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updated:{
    type: Date,
    default: Date.now()
  }
});

MessageSchema.virtual("url").get(function(){
    return `chatroom/message/${this.id}`;
})

MessageSchema.virtual("id").get(function () {
  return this.id;
});

MessageSchema.virtual("date").get(function () {
  return format(this.updated, "Pp");
});

module.exports= mongoose.model("Message", MessageSchema);

//model values: message, author, updated