const mongoose = require("mongoose");
const userSchema  =new  mongoose.Schema({
    googleId: { type: String, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password:{type:String, required:false},
    picture:{type:String,required:false}
},{timestamps:true});

const User = mongoose.model("User", userSchema);
module.exports = User;