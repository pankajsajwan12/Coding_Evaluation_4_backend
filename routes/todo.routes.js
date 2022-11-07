const {Router} = require("express")
const {TodoModel} = require("../models/Todo.model")
const cors = require("cors")

const todoRouter = Router();

todoRouter.use(cors());

todoRouter.get("/:userId", async(req,res) => {
   const { userId } = req.params;
   const todos = await TodoModel.find({userId});
   res.send(todos);
})

todoRouter.post("/:userId/addtodos", async(req,res) => {
   const {userId} = req.params;
   const {taskname, status, tag} = req.body;
   
   const user_todo = new TodoModel({
       taskname,
       status,
       tag,
       userId
   })
   await user_todo.save();
   res.send({"msg" : "todos successfully created", user_todo});
})

todoRouter.patch("/:userId/:todoId/update", async(req,res) => {
   const { userId , todoId} = req.params;
   const user_todos = await TodoModel.findOne({_id : todoId});
 
   if(user_todos.userId !== userId) {
       return res.send({"msg" : "You are not authorised to do it"})
   }
   const new_todos = await TodoModel.findByIdAndUpdate(todoId , req.body)
   return res.send({"msg" : "update todo", new_todos})
})

todoRouter.delete("/:userId/delete/:todoId", async(req,res) => {
   const { userId , todoId } = req.params;
   const todos = await TodoModel.findOne({_id  : todoId})
   if(todos.userId !== userId) {
       return res.send({"msg" : "Your are not authorised to dot it"})
   }
   const update_todos = await TodoModel.findByIdAndDelete(todoId)
   return res.send({"msg" : "deleted successfully"});
})

module.exports = {
   todoRouter
}