 const mongoose = require("mongoose");

 const userSchema = new mongoose.Schema({
    user_id : {type : Number},
    name : {type : String , require : true},
    email : { type : String , required : true},
    password : {type : String, require : true},
 })

 const UserModel = mongoose.model("signupUser", userSchema);

 module.exports = {
    UserModel
 }