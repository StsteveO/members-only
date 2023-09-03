const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
});

UserSchema.virtual("url").get(function(){
    return `chatroom/user/${this.id}`;
})

module.exports= mongoose.model("User", UserSchema);

// model-values: first_name, username, password