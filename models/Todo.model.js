const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
   taskname : String,
   status : String,
   tag : String,
   userId : {type : String , required : true}
})

const TodoModel = mongoose.model("Evulationtodo", todoSchema)

module.exports = {
   TodoModel
}